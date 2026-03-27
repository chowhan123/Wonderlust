const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io", // Replace with your SMTP settings
    port: 2525,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

module.exports.sendBookingEmail = async (userEmail, booking, listing) => {
    // 1. Create the PDF Document
    const doc = new PDFDocument({ margin: 50 });
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    
    // Header
    doc.fillColor("#FF385C").fontSize(25).text("Wanderlust", { align: "right" });
    doc.fillColor("#444444").fontSize(20).text("Invoice / Receipt", 50, 50);
    doc.moveDown();

    // Body
    doc.fontSize(12).fillColor("#000")
       .text(`Invoice Number: INV-${booking._id.toString().slice(-6).toUpperCase()}`)
       .text(`Date: ${new Date().toLocaleDateString()}`)
       .moveDown()
       .text(`Customer Email: ${userEmail}`)
       .moveDown();

    // Table Header
    doc.rect(50, 180, 500, 20).fill("#f0f0f0");
    doc.fillColor("#000").text("Description", 60, 185);
    doc.text("Amount", 450, 185);
    
    // Table Content
    doc.text(`${listing.title} (${booking.checkIn.toDateString()} to ${booking.checkOut.toDateString()})`, 60, 210);
    doc.text(`INR ${booking.totalPrice.toLocaleString("en-IN")}`, 450, 210);

    doc.moveDown(4);
    doc.fontSize(15).text(`Total Paid: INR ${booking.totalPrice.toLocaleString("en-IN")}`, { align: "right" });
    
    doc.moveDown();
    doc.fontSize(10).fillColor("#777").text("Thank you for booking with Wanderlust! This is a computer-generated receipt.", { align: "center" });

    doc.end();

    // 2. Wait for PDF to finish
    const pdfBuffer = await new Promise((resolve) => {
        doc.on('end', () => {
            resolve(Buffer.concat(buffers));
        });
    });

    // 3. Send Email with Attachment
    const mailOptions = {
        from: '"Wanderlust Support" <support@wanderlust.com>',
        to: userEmail,
        subject: `Your Receipt for ${listing.title}`,
        html: `<h3>Reservation Confirmed!</h3><p>Please find your attached invoice for your upcoming stay at <b>${listing.title}</b>.</p>`,
        attachments: [
            {
                filename: `Invoice_${booking._id}.pdf`,
                content: pdfBuffer,
                contentType: 'application/pdf'
            }
        ]
    };

    await transporter.sendMail(mailOptions);
};