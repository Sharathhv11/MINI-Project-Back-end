import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const LOGO_URL = "https://img.icons8.com/wired/128/000000/mind-map.png";

// ✅ Verification Email
const mail = async (name, link, toEmail) => {
  try {
    console.log("Sending email to:", toEmail);

    const info = await transporter.sendMail({
      from: `"GraphGen" <test@mailtrap.io>`,
      to: toEmail,
      subject: "Verify Your Email",
      html: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial; background:#f8fafc; padding:20px;">
  <div style="max-width:600px;margin:auto;background:white;border-radius:10px;padding:20px;">
    
    <div style="text-align:center;">
      <img src="${LOGO_URL}" width="100"/>
      <h2>Welcome to GraphGen, ${name}!</h2>
    </div>

    <p>Click below to verify your email:</p>

    <div style="text-align:center;margin:20px;">
      <a href="${link}" 
         style="background:black;color:white;padding:12px 20px;border-radius:6px;text-decoration:none;">
         Verify Email
      </a>
    </div>

    <p>If you didn’t sign up, ignore this email.</p>

  </div>
</body>
</html>
      `,
    });

    console.log("Verification email sent:", info.messageId);
  } catch (error) {
    console.error("Mailtrap error:", error);
  }
};

// ✅ Forgot Password Email
const mailForgotPassword = async (name, link, toEmail) => {
  try {
    const info = await transporter.sendMail({
      from: `"GraphGen" <test@mailtrap.io>`,
      to: toEmail,
      subject: "Reset Password",
      html: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial; background:#f8fafc; padding:20px;">
  <div style="max-width:600px;margin:auto;background:white;border-radius:10px;padding:20px;">
    
    <div style="text-align:center;">
      <img src="${LOGO_URL}" width="100"/>
      <h2>Password Reset</h2>
    </div>

    <p>Hello ${name},</p>
    <p>Click below to reset your password:</p>

    <div style="text-align:center;margin:20px;">
      <a href="${link}" 
         style="background:#007bff;color:white;padding:12px 20px;border-radius:6px;text-decoration:none;">
         Reset Password
      </a>
    </div>

    <p>This link expires in 10 minutes.</p>

  </div>
</body>
</html>
      `,
    });

    console.log("Reset email sent:", info.messageId);
  } catch (error) {
    console.error("Mailtrap error:", error);
  }
};

export default mail;
export { mailForgotPassword };