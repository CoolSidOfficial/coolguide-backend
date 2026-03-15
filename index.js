import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const smtpTransport = nodemailer.createTransport({
  host: "mail.smtp2go.com",
  port: 2525,
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD
  }
});

app.post("/contact", async (req, res) => {

  const { name, email, message } = req.body;

  try {

    await smtpTransport.sendMail({
      from: "contact@coolguide.live",
      to: "jainmdcl@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
        <h3>New Contact Form Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });

    res.json({ success: true, message: "Email sent successfully" });
    console.log("Email sent successfully");

  } catch (error) {

    console.error(error);
    res.status(500).json({ success: false, message: "Email failed" });

  }

});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});