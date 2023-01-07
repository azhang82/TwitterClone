import React from "react";

export default function TweetButtonComponent() {
  const btn = document.getElementById("tweet-button");
  const form = document.getElementById("submit-tweet");

  if (form != null && btn != null) {
    form.style.display = "none";
    btn.addEventListener("click", function handleClick() {
      form.style.display = "block";
    });
  }
  return <button id="tweet-button">Tweet</button>;
}
