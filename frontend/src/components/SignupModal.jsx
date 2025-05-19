import { useState } from "react";

const SignupModal = ({ onSubmit }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      onSubmit(username);
    }
  };

  return (
    <div className="modal-bg">
      <form className="modal" onSubmit={handleSubmit}>
        <h2 className="modal-title">Welcome to CodeLeap network!</h2>
        <label className="modal-label">
          Please enter your username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="John doe"
          />
        </label>
        <div className="button-actions">
          <button type="submit" disabled={!username}>
            ENTER
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupModal;
