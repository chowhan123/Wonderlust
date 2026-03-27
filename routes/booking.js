const express = require("express");
const router = express.Router({ mergeParams: true });
const Booking = require("../models/booking");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { sendBookingEmail } = require("../utils/emailHelper");
const PDFDocument = require("pdfkit");

// --- STEP 1: INITIATE STRIPE CHECKOUT ---
router.post("/checkout", isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { checkIn, checkOut } = req.body;
    
    const listing = await Listing.findById(id);
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);

    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
        req.flash("error", "Please select valid check-in and check-out dates.");
        return res.redirect(`/listings/${id}`);
    }

    const days = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
    if (days <= 0) {
        req.flash("error", "Check-out date must be after check-in date.");
        return res.redirect(`/listings/${id}`);
    }

    const existingOverlap = await Booking.findOne({
        listing: id,
        $and: [{ checkIn: { $lt: date2 } }, { checkOut: { $gt: date1 } }]
    });

    if (existingOverlap) {
        req.flash("error", "These dates are already booked!");
        return res.redirect(`/listings/${id}`);
    }

    const totalPrice = days * listing.price;

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

// --- STEP 2: CONFIRMATION (Optimized for Speed) ---
router.get("/success", isLoggedIn, wrapAsync(async (req, res) => {
    const { session_id } = req.query;
    if (!session_id) return res.redirect("/listings");

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
        const { listingId, checkIn, checkOut, totalPrice } = session.metadata;

        const finalCheckIn = new Date(checkIn);
        const finalCheckOut = new Date(checkOut);

        // Date validation check
        if (isNaN(finalCheckIn.getTime()) || isNaN(finalCheckOut.getTime())) {
            req.flash("error", "Error processing booking dates.");
            return res.redirect("/profile");
        }

        // Prevent duplicate bookings on page refresh
        const duplicateCheck = await Booking.findOne({ paymentId: session.payment_intent });
        if (duplicateCheck) return res.redirect("/profile");

        // Save to DB
        const newBooking = new Booking({
            listing: listingId,
            user: req.user._id,
            checkIn: finalCheckIn,
            checkOut: finalCheckOut,
            totalPrice: Number(totalPrice),
            paymentId: session.payment_intent 
        });

        await newBooking.save();

        const listing = await Listing.findById(listingId);

        // PERFORMANCE FIX: Send email in the background. 
        // We remove 'await' so the user is redirected immediately.
        sendBookingEmail(req.user.email, newBooking, listing)
            .catch(err => console.error("Background Email Error:", err));

        req.flash("success", "Payment Successful! Your trip is confirmed.");
        res.redirect("/profile");
    } else {
        req.flash("error", "Payment was not completed.");
        res.redirect("/listings");
    }
}));

// --- STEP 3: DOWNLOAD INVOICE ---
router.get("/:bookingId/invoice", isLoggedIn, wrapAsync(async (req, res) => {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate("listing");

    if (!booking || !booking.listing) {
        req.flash("error", "Booking or property information not found.");
        return res.redirect("/profile");
    }

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Wanderlust_Receipt_${booking._id}.pdf`);
    doc.pipe(res);

    // Header & Branding
    doc.fillColor("#FF385C").fontSize(25).text("Wanderlust", { align: "right" });
    doc.fillColor("#444444").fontSize(20).text("Official Receipt", 50, 50);
    doc.moveDown();

    doc.fontSize(12).fillColor("#000")
       .text(`Invoice: INV-${booking._id.toString().slice(-6).toUpperCase()}`)
       .text(`Date: ${new Date().toLocaleDateString()}`)
       .moveDown()
       .text(`Guest: ${req.user.username}`)
       .text(`Property: ${booking.listing.title}`)
       .moveDown();

    doc.rect(50, 195, 500, 20).fill("#f0f0f0");
    doc.fillColor("#000").text("Description", 60, 200);
    doc.text("Amount", 450, 200);
    
    doc.text(`Stay at ${booking.listing.title}`, 60, 225);
    doc.fontSize(10).text(`${booking.checkIn.toDateString()} to ${booking.checkOut.toDateString()}`, 60, 240);
    doc.fontSize(12).text(`INR ${booking.totalPrice.toLocaleString("en-IN")}`, 450, 225);

    doc.moveDown(5);
    doc.fontSize(15).text(`Paid in Full: INR ${booking.totalPrice.toLocaleString("en-IN")}`, { align: "right" });
    doc.end();
}));

// --- STEP 4: DELETE/CANCEL BOOKING ---
router.delete("/:bookingId", isLoggedIn, wrapAsync(async (req, res) => {
    const { bookingId } = req.params;
    await Booking.findByIdAndDelete(bookingId);
    req.flash("success", "Booking cancelled successfully.");
    res.redirect("/profile");
}));

module.exports = router;