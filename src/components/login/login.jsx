import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/form.scss";
import Alert from "../../alert/Alert";
import { useAuth } from "../../context/AuthContext";
import { useCookie } from "../../hooks/useCookie";
import authService from "../../services/AuthService";

export default function login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const { setIsAuthenticated } = useAuth();

  const navigate = useNavigate();
  const { loginUser } = authService();

  const { saveAuthCookie } = useCookie();

  const handleSuccess = (res) => {
    saveAuthCookie(res.data.jwt);
    setIdentifier("");
    setPassword("");
    setIsAuthenticated(true);
    navigate("/");
  };
  const handleError = (error) => {
    setAlert(error);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginUser({ identifier, password }, handleSuccess, handleError);
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
