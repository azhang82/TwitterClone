import { MidBarProps } from "midbar";
import React from "react";

export default function TweetButtonComponent(props: MidBarProps) {
  return <button id="tweet-button" onClick={ () => {
    props.setDisplayTweetForm(true);
  } }>Tweet</button>;
}
