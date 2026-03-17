import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const { login, resendVerification } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowResend(false);
    setResendMessage("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      const data = err.response?.data;
      if (err.response?.status === 403 && data?.code === "EMAIL_NOT_VERIFIED") {
        setError(data.message || "Please verify your email before logging in.");
        setShowResend(true);
      } else {
        setError(data?.message || err.message || "Login failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setResendMessage("");
    try {
      const data = await resendVerification(email);
      setResendMessage(data.message || "Verification email sent.");
    } catch (err) {
      setResendMessage(err.response?.data?.message || err.message || "Failed to resend.");
    }
  };

  return (
    <div className="auth-page">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {showResend && (
          <div className="resend-block">
            <button type="button" onClick={handleResend} className="resend-btn">
              Resend verification email
            </button>
            {resendMessage && <p className={resendMessage.startsWith("Verification") || resendMessage.startsWith("If an") ? "success-msg" : "error"}>{resendMessage}</p>}
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Log in"}
        </button>
      </form>
      <p>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
