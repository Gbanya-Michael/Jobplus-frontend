import React, { useState } from "react";
import "../styles/form.scss";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "../../alert/Alert";
import { useApi } from "../../hooks/useApi";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alert, setAlert] = useState({});
  const navigate = useNavigate("");

  const location = useLocation;

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const { post } = useApi();

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setAlert({
        message: "Password and confirm password do not match",
        detail: [],
      });
      return;
    }

    await post("auth/reset-password", {
      data: { password, passwordConfirmation, code },
      onSuccess: (res) => handdleSuccess(),
      onFailure: (error) => setAlert(error),
    });
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
