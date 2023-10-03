import React, { useState } from "react";
import "../styles/form.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { parseErrors } from "../../utilities/parseErrors";
import Alert from "../../alert/Alert";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setAlert({
        message: "Password and confirm password do not match",
        detail: [],
      });
      return;
    }
    const data = {
      password,
      passwordConfirmation,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        data
      );
      navigate("/login");
      setAlert({});
      setPassword("");
      setPasswordConfirmation("");
    } catch (error) {
      setAlert(parseErrors(error));
    }
  };

  return (
    <>
      <Alert data={alert} />
      <div className="form form--page">
        <form onSubmit={handleRegister}>
          <div className="form__group form__group--page">
            <label className="form__label">Choose password</label>
            <input
              className="form__field"
              type="password"
              placeholder="Choose password"
              // required
              autoComplete="false"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form__group form__group--page">
            <label className="form__label">Confirm Password</label>
            <input
              className="form__field"
              type="password"
              // required
              autoComplete="false"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>

          <div className="form__group form__group--page">
            <input className="form__btn" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </>
  );
}
