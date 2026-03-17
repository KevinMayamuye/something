import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const { register, resendVerification } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResendMessage("");
    setSubmitting(true);
    try {
      await register(name, surname, email, password);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setResendMessage("");
    setError("");
    try {
      const data = await resendVerification(email);
      setResendMessage(data.message || "Verification email sent.");
    } catch (err) {
      setResendMessage(err.response?.data?.message || err.message || "Failed to resend.");
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <h1>Check your email</h1>
        <p>Registration successful. Please check your email to verify your account.</p>
        <p className="auth-page-note">Didn&apos;t receive the email?</p>
        <button type="button" onClick={handleResend} className="resend-btn">
          Resend verification email
        </button>
        {resendMessage && <p className={resendMessage.startsWith("Verification") ? "success-msg" : "error"}>{resendMessage}</p>}
        <p>
          <Link to="/login">Back to log in</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <h1>Create account</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="given-name"
          />
        </div>
        <div>
          <label htmlFor="surname">Surname</label>
          <input
            id="surname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            autoComplete="family-name"
          />
        </div>
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
            minLength={6}
            autoComplete="new-password"
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Creating account..." : "Register"}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
