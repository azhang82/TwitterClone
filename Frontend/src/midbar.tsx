import React, { MouseEventHandler } from "react";
import App from "./App";
import { handleSubmission, fetchTweets, getUsernameToFetch } from "./client";
import { useEffect, useState } from "react";
import "./style.css";
import closeIcon from "./icons/close.svg";
import { format } from "path";
import { Tweet } from "../types";
import { useParams } from "react-router-dom";

type TweetFormProps = {
  setShowTweetForm : (showTweetForm: boolean) => void;
  getShowTweetForm: boolean;
  setDisplayTweetForm: React.Dispatch<React.SetStateAction<boolean>>; 
};

type IconProps = {
  imageUrl: string;
  class: string;
  onClick?: (MouseEventHandler<HTMLImageElement> | undefined);
};

export type MidBarProps = {
  displayTweetForm: boolean;
  setDisplayTweetForm: React.Dispatch<React.SetStateAction<boolean>>; 
}

export function Icon(props: IconProps ) {
  return (
    <div>
      <img onClick={props.onClick? props.onClick: ()=>{}} className={props.class} src = {props.imageUrl} width={32} height={32} />
    </div>
  );
}

export function TweetComponent() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { username } = useParams();

  useEffect(() => {
    fetchTweets(username as string).then((tweets) => setTweets(tweets));
  }, []);

  return (
    <div id="tweets">
      <h3>Tweets From {username ?? "everyone"}</h3>
      <ul>
        {tweets.map((tweet) => (
          <li>{tweet.message}</li>
        ))}
      </ul>
    </div>
  );
}

function getUsername() {
  const pathname = window.location.pathname;
  const index = pathname.lastIndexOf("/");
  const username = pathname.substring(index + 1);

  if(username.length > 0) {
      return username;
  } else {
      return null;
  }
}


export function MidBar(props: MidBarProps) {
  return (
    <div className="midbar">
      { props.displayTweetForm ? <TweetForm setShowTweetForm={props.setDisplayTweetForm} getShowTweetForm={props.displayTweetForm} setDisplayTweetForm={props.setDisplayTweetForm} /> :<div></div>}
      {<TweetComponent></TweetComponent>}
    </div>
  );
}

export function TweetForm(props: TweetFormProps)  {
  let submitTweetForm = React.createRef<HTMLFormElement>();

  return (
    <>
      <form id="submit-tweet" onSubmit={handleSubmission} ref={submitTweetForm}>
        <Icon class="close" imageUrl={closeIcon} onClick = { () => {
        props.setDisplayTweetForm(false);
        }} />
        {/* <div className="Input-Username">
          <label htmlFor="username-input">Username</label>
          <input
            id="username-input"
            type="string"
            min="0"
            placeholder="Enter Your Username"
            required
          />
        </div>       */}
        <div className="Input-Tweet">
          <label htmlFor="tweet-input" className = "tweetInput">Tweet</label>
          <textarea
            id="tweet-input"
            placeholder="Enter Your Tweet"
            required
          ></textarea>
        </div>
        <button className="submitButton" type="submit">Tweet!</button>
      </form>
    </>
  );
}