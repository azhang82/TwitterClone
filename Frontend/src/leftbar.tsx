import React from "react";
import App from "./App";
import "./style.css";
import TweetButtonComponent from "./Components/TweetButtonComponent";
import twitterIcon from './icons/twitter.svg';
import homeIcon from './icons/home.svg';
import bookmarksIcon from './icons/bookmark.svg';
import listsIcon from './icons/lists.svg';
import messagesIcon from './icons/messages.svg';
import notificationsIcon from './icons/notifications.svg';
import profileIcon from './icons/profile.svg';
import moreIcon from './icons/more.svg';
import exploreIcon from './icons/explore.svg';
import { MidBarProps } from './midbar';

type IconProps = {
  imageUrl: string;
  width?: number;
  height?: number;
};

export function Icon(props: IconProps) {
  return (
    <div>
      <img src = {props.imageUrl} width={props.width ? props.width : 32}  height={props.height ? props.height : 32}/>
    </div>
  );
}
//Add class to each icon
export function LeftBar(props: MidBarProps) {
  return (
    <div className="leftbar">
      <div className = "sidebar-menu-item">
      </div>

      <div className="sidebar-menu-item">
        <a href ="#" className="twitterIcon">
          <Icon imageUrl={twitterIcon} width={50} height={50}/>
        </a>

        <a href="#" className="home">
          <Icon imageUrl={homeIcon} />
          Home
        </a>
      </div>

      <div className="sidebar-menu__item">
        <a href="#" className="explore">
          <Icon imageUrl={exploreIcon} />
          Explore
        </a>
      </div>

      <div className="sidebar-menu__item">

       <a href="#" className="notifications">
        <Icon imageUrl={notificationsIcon} />
          Notifications
        </a>
      </div>

      <div className="sidebar-menu__item">

       <a href="#" className="messages">
        <Icon imageUrl={messagesIcon} />
          Messages
        </a>
      </div>

      <div className="sidebar-menu__item">

        <a href="#" className="bookmarks">
          <Icon imageUrl={bookmarksIcon}/>
          Bookmarks
        </a>
      </div>

      <div className="sidebar-menu__item">
        
        <a href="#" className="lists">
          <Icon imageUrl={listsIcon} />
          Lists
        </a>
      </div>

      <div className="sidebar-menu__item">
        
        <a href="#" className="profile">
          <Icon imageUrl={profileIcon} />
          Profile
        </a>
      </div>

      <div className="sidebar-menu__item">
        <a href="#" className="more">
          <Icon imageUrl={moreIcon} />
          More
        </a>
      </div>

      <div className="Tweet">
      <TweetButtonComponent displayTweetForm={props.displayTweetForm} setDisplayTweetForm={props.setDisplayTweetForm}/>
      </div>
    </div>
  );
}
