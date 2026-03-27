const express = require("express");
const router = express.Router({ mergeParams: true });
const Booking = require("../models/booking");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { sendBookingEmail } = require("../utils/emailHelper");
const PDFDocument = require("pdfkit");

// --- STRIPE INITIALIZATION (Optimized for Render Deployment) ---
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    timeout: 30000,          // 30-second timeout for slower cloud connections
    maxNetworkRetries: 3,    // Automatically retry 3 times on network hiccups
});

// --- STEP 1: INITIATE STRIPE CHECKOUT ---
router.post("/checkout", isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { checkIn, checkOut } = req.body;
    
    const listing = await Listing.findById(id);
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);

    // Validation
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
        req.flash("error", "Please select valid check-in and check-out dates.");
        return res.redirect(`/listings/${id}`);
    }

    const days = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
    if (days <= 0) {
        req.flash("error", "Check-out date must be after check-in date.");
        return res.redirect(`/listings/${id}`);
    }

    // Check Availability
    const existingOverlap = await Booking.findOne({
        listing: id,
        $and: [{ checkIn: { $lt: date2 } }, { checkOut: { $gt: date1 } }]
    });

    if (existingOverlap) {
        req.flash("error", "These dates are already booked!");
        return res.redirect(`/listings/${id}`);
    }

    const totalPrice = days * listing.price;

    // Create Stripe Session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
            price_data: {
                currency: "inr",
                product_data: { 
                    name: listing.title,
                    description: `Stay: ${date1.toDateString()} to ${date2.toDateString()}`,
                },
                unit_amount: totalPrice * 100, 
            },
            quantity: 1,
        }],
        mode: "payment",
        metadata: {
            listingId: id,
            userId: req.user._id.toString(),
            checkIn: checkIn, 
            checkOut: checkOut,
            totalPrice: totalPrice.toString()
        },
        success_url: `${req.protocol}://${req.get("host")}/listings/${id}/bookings/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.protocol}://${req.get("host")}/listings/${id}`,
    });

    res.redirect(303, session.url);
}));

// --- STEP 2: CONFIRMATION & DB SAVE ---
router.get("/success", isLoggedIn, wrapAsync(async (req, res) => {
    const { session_id } = req.query;
    if (!session_id) return res.redirect("/listings");

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === "paid") {
            const { listingId, checkIn, checkOut, totalPrice } = session.metadata;

            // Check if this booking was already processed (Prevents refresh duplicates)
            const duplicateCheck = await Booking.findOne({ paymentId: session.payment_intent });
            if (duplicateCheck) {
                req.flash("success", "Your booking is already confirmed!");
                return res.redirect("/profile");
            }

            const newBooking = new Booking({
                listing: listingId,
                user: req.user._id,
                checkIn: new Date(checkIn),
                checkOut: new Date(checkOut),
                totalPrice: Number(totalPrice),
                paymentId: session.payment_intent 
            });

            await newBooking.save();
            const listing = await Listing.findById(listingId);

            // Background Email (Don't 'await' so user doesn't wait)
            sendBookingEmail(req.user.email, newBooking, listing)
                .catch(err => console.error("Email Error:", err));

            req.flash("success", "Payment Successful! Pack your bags!");
            res.redirect("/profile");
        } else {
            req.flash("error", "Payment verification failed.");
            res.redirect("/listings");
        }
    } catch (err) {
        console.error("Stripe Retrieval Error:", err.message);
        req.flash("error", "There was an error verifying your payment. Please check your profile.");
        res.redirect("/profile");
    }
}));

// --- STEP 3: DOWNLOAD INVOICE ---
router.get("/:bookingId/invoice", isLoggedIn, wrapAsync(async (req, res) => {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate("listing");

    if (!booking || !booking.listing) {
        req.flash("error", "Booking information not found.");
        return res.redirect("/profile");
    }

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice_${booking._id}.pdf`);
    doc.pipe(res);

    // Styling the PDF
    doc.fillColor("#FF385C").fontSize(25).text("Wanderlust", { align: "right" });
    doc.fillColor("#333").fontSize(20).text("Official Receipt", 50, 50);
    doc.moveDown();

    doc.fontSize(12).fillColor("#000")
       .text(`Invoice ID: INV-${booking._id.toString().slice(-6).toUpperCase()}`)
       .text(`Guest: ${req.user.username}`)
       .text(`Property: ${booking.listing.title}`)
       .text(`Dates: ${booking.checkIn.toDateString()} - ${booking.checkOut.toDateString()}`)
       .moveDown();

    doc.rect(50, 200, 500, 25).fill("#f9f9f9");
    doc.fillColor("#000").text("Description", 60, 207);
    doc.text("Total Paid", 450, 207);
    
    doc.text(`Booking for ${booking.listing.title}`, 60, 240);
    doc.fontSize(14).text(`INR ${booking.totalPrice.toLocaleString("en-IN")}`, 450, 240);

    doc.end();
}));

// --- STEP 4: CANCEL BOOKING ---
router.delete("/:bookingId", isLoggedIn, wrapAsync(async (req, res) => {
    await Booking.findByIdAndDelete(req.params.bookingId);
    req.flash("success", "Booking cancelled.");
    res.redirect("/profile");
}));

module.exports = router;