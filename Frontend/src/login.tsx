import React from "react";
import { handleLoginSubmission } from "./client";
import "./style.css";


export function LoginPage() {
  return (
    <div className="loginPage">
      <form onSubmit={handleLoginSubmission}>
        <div>
          <label htmlFor="username-input">Username</label>
          <input
            id="username-input"
            type="text"
            required
            placeholder="Username"
          />
        </div>
        <div>
          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            type="password"
            required
            placeholder="Password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div id="login-response"></div>
    </div>
  );
}
