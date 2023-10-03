import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/form.scss";
import axios from "axios";
import Alert from "../../alert/Alert";
import { parseErrors } from "../../utilities/parseErrors";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        data
      );

      setAlert({
        message: "Check your email for password reset link.",
        type: "success",
      });

      setEmail("");
    } catch (error) {
      setAlert(parseErrors(error));
    }
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
