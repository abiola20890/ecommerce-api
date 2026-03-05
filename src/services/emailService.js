import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify transporter config on startup
transporter.verify((error) => {
    if (error) {
        console.error(`Email transporter config error: ${error.message}`);
    } else {
        console.log("Email transporter is ready");
    }
});

export const sendEmail = async (to, subject, { text, html } = {}) => {
    try {
        await transporter.sendMail({
            from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });

        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error(`Error sending email to ${to}: ${error.message}`);
        // Rethrow so the caller knows the email failed
        throw error;
    }
};