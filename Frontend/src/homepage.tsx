import { useState }from 'react';
import { LeftBar } from "./leftbar";
import { MidBar, TweetComponent } from "./midbar";
import { RightBar } from "./rightbar";

export function HomePage() {
  const [displayTweetForm, setDisplayTweetForm] = useState(false);

    return (
      <div>
        <LeftBar displayTweetForm={displayTweetForm} setDisplayTweetForm={setDisplayTweetForm}></LeftBar>
        <MidBar displayTweetForm={displayTweetForm} setDisplayTweetForm= {setDisplayTweetForm}></MidBar>
        
        <RightBar></RightBar>
      </div>
    );
}
