import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/form.scss";
import Alert from "../../alert/Alert";
import authService from "../../services/AuthService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState("");

  const { forgotPassword } = authService();

  const handleSuccess = () => {
    setAlert({
      message: "Check your email for password reset link.",
      detail: [],
      type: "success",
    });
    setEmail("");
  };

  const handleError = (error) => {
    setAlert(error);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await forgotPassword(email, handleSuccess, handleError);
  };

  return (
    <>
      <Alert data={alert} />
      <form className="form form--page" onSubmit={handleSubmit}>
        <div className="form__group form__group--page">
          <label className="form__label">Email</label>
          <input
            className="form__field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <input className="form__btn" type="submit" value="Reset Password" />
        </div>

        <footer>
          Remembered password? <Link to="/login">Login</Link>
        </footer>
      </form>
    </>
  );
}
