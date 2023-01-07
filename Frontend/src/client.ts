import { Tweet } from "../types";
import { FormEvent, FormEventHandler } from "react";


export async function fetchTweets(username: string | null) {
    
    const dom = document.querySelector("#tweets"); // Variable to store the HTML div element called tweets
    let response;
    if(!username) {
        response = await fetch("localhost12345/tweets", {
        headers: {"Access-Control-Allow-Origin":"*"}
    });
    } else {
        response =  await fetch(`http://localhost:12345/json/${username}`, {
        headers: {"Access-Control-Allow-Origin":"*"}
    });}
    let tweets :Tweet[] = await response.json();
    
    const tweetString = `
        <ul>
            ${tweets.map(tweet => `<li>${tweet.message}</li>`)};
        </ul>
        `
    if(dom) { //checking if dom exists
        dom.innerHTML = `<h3>Tweets from ${username ?? "everyone"}</h3>` + tweetString; // displaying the content into the div
    }
    
}

// get the username of the user we should be fetching tweets for based on the URL
export function getUsernameToFetch() {
    const pathname = window.location.pathname;
    const index = pathname.lastIndexOf("/");
    const username = pathname.substring(index + 1);

    // TODO: change the logic here if needed
    if(username.length > 0) {
        return username;
    } else {
        return null;
    }
}

export async function handleSubmission(event :FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const usernameInput = document.getElementById("username-input") as HTMLInputElement;
    const messageTextArea = document.getElementById("tweet-input") as HTMLTextAreaElement;
    const body = {
        username: usernameInput.value,
        tweet: messageTextArea.value
    };
    let response = await fetch("http://localhost:12345/tweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    console.log(response.body);
}

const btn = document.getElementById('tweet-button');
const form = document.getElementById('submit-tweet');

if (form != null && btn != null) {
    form.style.display = 'none';
  btn.addEventListener('click', function handleClick() {
   form.style.display = 'block';
  });
}

document.addEventListener('DOMContentLoaded', () => fetchTweets(getUsernameToFetch()));


export async function handleLoginSubmission(event :FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const usernameInput = document.getElementById("username-input") as HTMLInputElement;
    const passwordInput = document.getElementById("password-input") as HTMLInputElement;
    const body = {
        username: usernameInput.value,
        password: passwordInput.value
    };
    
    let response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    handleResponse(response, "Login Succeeded!", "Invalid Login!", "login-response");
}

export async function handleRegistrationSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const usernameInput = document.getElementById("username-input") as HTMLInputElement;
    const passwordInput = document.getElementById("password-input") as HTMLInputElement;
    const confirmPasswordInput = document.getElementById("confirm-password-input") as HTMLInputElement;

    const passwordInputValue = passwordInput.value;
    const confirmPasswordInputValue = confirmPasswordInput.value;
    if (!arePasswordsEqual(passwordInputValue, confirmPasswordInputValue)) {
        passwordInput.style.borderColor = "red";
        confirmPasswordInput.style.borderColor = "red";
        addErrorMessage("Passwords don't match!");
        return;
    } else if (!isStrongPassword(passwordInputValue)) {
        passwordInput.style.borderColor = "red";
        addErrorMessage("Password is not strong enough!");
        return;
    }

    const body = {
        username: usernameInput.value,
        password: passwordInput.value
    };
    let response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    handleResponse(response, "Registration Succeeded!", "Something went Wrong!", "registration-response");
}

function addErrorMessage(message: string) {
    const errorDiv = document.getElementById("error");
    if (errorDiv) {
        errorDiv.innerHTML = "";
        const errorParagraph = document.createElement("p");
        errorParagraph.innerHTML = message;
        errorDiv?.appendChild(errorParagraph);
    }
}

function handleResponse(response: Response, successMessage: string, failureMessage: string, elementId: string) {
    const p = document.createElement("p");
    if (response.ok) {
        p.innerHTML = successMessage;
    } else {
        p.innerHTML = failureMessage
    }
    const loginResponse = document.getElementById(elementId);
    if (loginResponse) {
        loginResponse.innerHTML = "";
        document.getElementById(elementId)?.appendChild(p);
    }
}

function arePasswordsEqual(password: string, confirmPassword: string) {
    return password === confirmPassword;
}

function isStrongPassword(password: string) {
    /*
        does the password meet the following requirements:
        > 5 characters long
        contains a number
        contains an uppercase letter
        contains a lowercase letter
    */
    return password.match("(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])");
}

