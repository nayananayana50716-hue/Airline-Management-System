import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text, attachment }) => {

  try {

    const transporter = nodemailer.createTransport({

      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {

      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      attachments: attachment
        ? [
            {
              filename: "ticket.pdf",
              content: attachment
            }
          ]
        : []
    };

    await transporter.sendMail(mailOptions);

    console.log("📧 Email sent successfully");

  } catch (err) {

    console.log("Email error:", err);
  }
};

export default sendEmail;