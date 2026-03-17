import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT || 587,
  secure: process.env.MAIL_SECURE === "true",
  auth: process.env.MAIL_USER
    ? {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    : undefined,
});

export async function sendVerificationEmail(toEmail, verificationUrl) {
  const mailOptions = {
    from: process.env.MAIL_FROM || process.env.MAIL_USER || "noreply@smartsheets.local",
    to: toEmail,
    subject: "Verify your email",
    text: `Please verify your email by clicking the link below:\n\n${verificationUrl}\n\nThis link expires in 24 hours.`,
    html: `<p>Please verify your email by clicking the link below:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p><p>This link expires in 24 hours.</p>`,
  };
  await transporter.sendMail(mailOptions);
}
