import React, { useState } from "react";
import "../styles/form.scss";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "../../alert/Alert";
import authService from "../../services/AuthService";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alert, setAlert] = useState({});
  const navigate = useNavigate("");

  const location = useLocation;

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const { resetPassword } = authService();

  const handdleSuccess = (res) => {
    setAlert({
      message: "You have successfully changed your password.",
      details: [],
      type: "succcess",
    });
    setPassword("");
    setPasswordConfirmation("");
    navigate("/login");
  };

  const handleError = (error) => {
    setAlert(error);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setAlert({
        message: "Password and confirm password do not match",
        detail: [],
      });
      return;
    }

    await resetPassword(
      { password, passwordConfirmation, code },
      handdleSuccess,
      handleError
    );
  };

  return (
    <>
      <Alert data={alert} />
      <div className="form form--page">
        <form onSubmit={handleSubmit}>
          <div className="form__group form__group--page">
            <label className="form__label">Choose password</label>
            <input
              className="form__field"
              type="password"
              placeholder="Choose password"
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
