import React from "react";
import { handleRegistrationSubmission } from "./client";

export function RegisterForm() {
  return (
    <div>
      <form onSubmit={handleRegistrationSubmission}>
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
        <div>
          <label htmlFor="confirm-password-input">Confirm Password</label>
          <input
            id="confirm-password-input"
            type="password"
            required
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div id="error"></div>
      <div id="registration-response"></div>
    </div>
  );
}
