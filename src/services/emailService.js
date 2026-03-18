import fetch from "node-fetch";

export const sendEmail = async (to, subject, { text, html } = {}) => {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${process.env.EMAIL_FROM_NAME} <noreply@samson.name.ng>`,
        to,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    console.log(`Email sent to ${to}`);
    return await response.json();
  } catch (err) {
    console.error(`Error sending email to ${to}: ${err.message}`);
    throw err;
  }
};