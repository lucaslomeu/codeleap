import { useState } from "react";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginModal() {
  const [error, setError] = useState("");

  async function handleGoogleLogin() {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError("Google login failed");
    }
  }

  return (
    <div className="modal-bg">
      <form className="modal" onSubmit={(e) => e.preventDefault()}>
        <h2 className="modal-title">Welcome to CodeLeap network!</h2>
        <p className="login-description">
          <strong>Share your thoughts, collaborate, and connect!</strong>
          <br />
          CodeLeap Network is a simple platform for posting messages, engaging
          with the community, and staying up to date.
        </p>
        <p className="login-subtext">
          Sign in with your Google account to get started:
        </p>
        <div type="button" className="google-btn" onClick={handleGoogleLogin}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="google-logo"
          />
          Continue with Google
        </div>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}
