import React from "react";
import App from "./App";
import { handleSubmission, fetchTweets, getUsernameToFetch } from "./client";
import { useEffect, useState } from "react";
import "./style.css";
import closeIcon from "./icons/close.svg";

type TweetFormProps = {
  setShowTweetForm : (showTweetForm: boolean) => void 
};

type IconProps = {
  imageUrl: string;
  class: string;
  onClick?: (showTweetForm: boolean) => void;
};
export function Icon(props: IconProps ) {
  return (
    <div>
      <img className={props.class} src = {props.imageUrl} width={32} height={32} />
    </div>
  );
}

export function MidBar() {
  const [tweets, setTweets] = useState([]);
  const [displayTweetForm, setDisplayTweetForm] = useState(true);

  useEffect(() => {
    fetchTweets(null);
  });

  return (
    <div className="midbar">
      <div id="tweets">{tweets}</div>
      { displayTweetForm ? <TweetForm setShowTweetForm={setDisplayTweetForm}/> :<div></div>}
    </div>
  );
}

export function TweetForm(props: TweetFormProps)  {
  function onCloseClick() {
    props.setShowTweetForm(false)
  }

  return (
    <form id="submit-tweet" onSubmit={handleSubmission}>
      <Icon class="close" imageUrl={closeIcon} onClick = {onCloseClick}/>
      <div className="Input-Username">
        <label htmlFor="username-input">Username</label>
        <input
          id="username-input"
          type="string"
          min="0"
          placeholder="Enter Your Username"
          required
        />
      </div>      
      <div className="Input-Tweet">
        <label htmlFor="tweet-input">Tweet</label>
        <textarea
          id="tweet-input"
          placeholder="Enter Your Tweet"
          required
        ></textarea>
      </div>
      <button className="submitButton" type="submit">Tweet!</button>
    </form>
  );
}