import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token provided.");
      return;
    }

    axios
      .post(`${API_BASE}/api/auth/verify-email`, { token })
      .then((res) => {
        setStatus("success");
        setMessage(res.data.message || "Email verified successfully. You can now log in.");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.response?.data?.message || "Link invalid or expired. Please request a new verification email.");
      });
  }, [token, navigate]);

  if (status === "loading") {
    return (
      <div className="auth-page">
        <h1>Verifying your email</h1>
        <p>Please wait...</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="auth-page">
        <h1>Email verified</h1>
        <p className="success-msg">{message}</p>
        <p>Redirecting you to log in...</p>
        <p>
          <Link to="/login">Log in now</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <h1>Verification failed</h1>
      <p className="error">{message}</p>
      <p>
        <Link to="/register">Register again</Link> or <Link to="/login">Log in</Link> and use &quot;Resend verification email&quot;.
      </p>
    </div>
  );
}
