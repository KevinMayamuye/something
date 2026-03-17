import crypto from "crypto";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/email.js";

const VERIFICATION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export const register = async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpires = new Date(Date.now() + VERIFICATION_EXPIRY_MS);

    const user = await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}`;

    try {
      await sendVerificationEmail(user.email, verificationUrl);
    } catch (mailError) {
      console.error("Failed to send verification email:", mailError);
      return res.status(500).json({ message: "Registration succeeded but we could not send the verification email. Please try resend later." });
    }

    res.status(201).json({
      message: "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.emailVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
        code: "EMAIL_NOT_VERIFIED",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const userObj = user.toObject();
    delete userObj.password;

    res.json({ token, user: userObj });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const token = req.body?.token || req.query?.token;

  try {
    if (!token) {
      return res.status(400).json({ message: "Verification token is required" });
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: "Link invalid or expired. Please request a new verification email." });
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const resendCooldown = new Map();
const RESEND_COOLDOWN_MS = 60 * 1000; // 1 minute

export const resendVerification = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const now = Date.now();
    const lastSent = resendCooldown.get(email);
    if (lastSent && now - lastSent < RESEND_COOLDOWN_MS) {
      return res.status(429).json({ message: "Please wait a minute before requesting another email." });
    }

    const user = await User.findOne({ email });
    if (!user || user.emailVerified) {
      res.json({ message: "If an unverified account exists for this email, a new verification email was sent." });
      return;
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpires = new Date(Date.now() + VERIFICATION_EXPIRY_MS);
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpires;
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}`;

    try {
      await sendVerificationEmail(user.email, verificationUrl);
    } catch (mailError) {
      console.error("Failed to send verification email:", mailError);
      return res.status(500).json({ message: "Failed to send verification email. Please try again later." });
    }

    resendCooldown.set(email, now);
    res.json({ message: "Verification email sent. Please check your inbox." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
