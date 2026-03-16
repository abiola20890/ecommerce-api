import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 587,         // Use 587 for STARTTLS
  secure: false,     // false because STARTTLS upgrades the connection
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
  tls: {
    rejectUnauthorized: false, // optional: avoid certificate errors in some cloud environments
  },
});

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
      from: `"${process.env.EMAIL_FROM_NAME}" <onboarding@resend.dev>`,
      to,
      subject,
      text,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}: ${error.message}`);
    throw error;
  }
};