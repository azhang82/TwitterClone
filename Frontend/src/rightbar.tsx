import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export function RightBar() {
  return (
    <div className="rightbar">
      <div className="bubb1">
        <h1>
          <Link to="/login" className="loginLink">
            Login
          </Link>
        </h1>
        <h1>
          <Link to="/register" className="registerLink">
            Register
          </Link>
        </h1>
      </div>
    </div>
  );
}
