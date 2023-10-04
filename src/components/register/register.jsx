import React, { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router-dom";
import Alert from "../../alert/Alert";
import { useApi } from "../../hooks/useApi";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({});

  const { post } = useApi();

  const handleSuccess = () => {
    setAlert({
      message: "You have successfully created an account.",
      details: [],
      type: "success",
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({
        message: "Password and confirm password do not match",
        detail: [],
      });
      return;
    }
    const data = {
      firstName,
      lastName,
      email,
      password,
      username: email,
    };

    await post("auth/local/register", {
      data: data,
      onSuccess: (res) => handleSuccess(),
      onFailure: (error) => setAlert(error),
    });
  };

  return (
    <>
      <Alert data={alert} />
      <div className="form form--page">
        <form onSubmit={handleRegister}>
          <div className="form__group form__group--page">
            <label className="form__label">First name</label>
            <input
              className="form__field"
              type="text"
              placeholder="First name"
              required
              autoComplete="true"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form__group form__group--page">
            <label className="form__label">Last name</label>
            <input
              className="form__field"
              type="text"
              placeholder="Last name"
              required
              autoComplete="true"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form__group form__group--page">
            <label className="form__label">Email</label>
            <input
              className="form__field"
              type="text"
              placeholder="Email"
              required
              autoComplete="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form__group form__group--page">
            <label className="form__label">Choose password</label>
            <input
              className="form__field"
              type="password"
              placeholder="Choose password"
              required
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
              required
              autoComplete="false"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="form__group form__group--page">
            <input className="form__btn" type="submit" value="Register" />
          </div>
        </form>

        <footer>
          Already have an account? <Link to="/login">Login</Link>
        </footer>
      </div>
    </>
  );
}
