import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/form.scss";
import axios from "axios";
import Alert from "../../alert/Alert";
import { parseErrors } from "../../utilities/parseErrors";

export default function login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      identifier,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/local`,
        data
      );
      navigate("/");
      setIdentifier("");
      setPassword("");
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
            type="text"
            placeholder="Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Password</label>
          <input
            className="form__field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <input className="form__btn" type="submit" value="Login" />
        </div>

        <footer>
          Forgot password? <Link to="/forgot-password">Reset</Link>
        </footer>
        <footer>
          Dont have an account? <Link to="/register">Register</Link>
        </footer>
      </form>
    </>
  );
}
