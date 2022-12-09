import React from "react";
import App from "./App";
import "./style.css";
type IconProps = {
  imageUrl: string
};

export function Icon(props: IconProps ) {
  return (
    <div>
    <img src={props.imageUrl} />
    </div>
  );
}

export function LeftBar() {

  return (
    <div className="leftbar">
      <div className="sidebar-menu-item">
        <Icon imageUrl="C:\Users\azzha\OneDrive\Documents\Programming\twitter-clone\src\icons\home.svg"/>
        <a href="#" className="home">
          Home
        </a>
      </div>

      <div className="sidebar-menu__item">
      <Icon imageUrl="C:\Users\azzha\OneDrive\Documents\Programming\twitter-clone\src\icons\explore.svg"/>
        <a href="#" className="explore">
          Explore
        </a>
      </div>

      <div className="sidebar-menu__item">
      <Icon imageUrl="C:\Users\azzha\OneDrive\Documents\Programming\twitter-clone\src\icons\notifications.svg"/>
        <a href="#" className="notifications">
          Notifications
        </a>
      </div>

      <div className="sidebar-menu__item">
      <Icon imageUrl="C:\Users\azzha\OneDrive\Documents\Programming\twitter-clone\src\icons\messages.svg"/>
      <a href="#" className="messages">
          Messages
        </a>
      </div>

      <div className="sidebar-menu__item">
      <Icon imageUrl="C:\Users\azzha\OneDrive\Documents\Programming\twitter-clone\src\icons\bookmarks.svg"/>
        <a href="#" className="bookmarks">
          Bookmarks
        </a>
      </div>

      <div className="sidebar-menu__item">
      <Icon imageUrl="C:\Users\azzha\OneDrive\Documents\Programming\twitter-clone\src\icons\lists.svg"/>
        <a href="#" className="lists">
          Lists
        </a>
      </div>

      <div className="sidebar-menu__item">
      <Icon imageUrl="C:\Users\azzha\OneDrive\Documents\Programming\twitter-clone\src\icons\profile.svg"/>
        <a href="#" className="profile">
          Profile
        </a>
      </div>

      <div className="sidebar-menu__item">
      <Icon imageUrl="C:\Users\azzha\OneDrive\Documents\Programming\twitter-clone\src\icons\more.svg"/>
        <a href="#" className="more">
          More
        </a>
      </div>
    </div>
  );
}

