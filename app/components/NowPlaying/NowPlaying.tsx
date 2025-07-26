"use client";

import s from "./now-playing.module.css";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react";
import { useMusicPlayer } from "@/app/contexts";

const CurrentTrack = () => {
  return (
    <div className={s["current-track"]}>
      {/* Add your current track content here */}
      <h2>Current Track</h2>
    </div>
  );
};

const TrackControls = () => {
  return (
    <div className={s["track-controls"]}>
      {/* Add your track controls content here */}
      <button className={s["control-button"]}>
        <SkipBack size={24} />
      </button>
      <button className={s["control-button"]}>
        <Play size={24} />
      </button>
      <button className={s["control-button"]}>
        <Pause size={24} />
      </button>
      <button className={s["control-button"]}>
        <SkipForward size={24} />
      </button>
      <button className={s["control-button"]}>
        <Repeat size={24} />
      </button>
      <button className={s["control-button"]}>
        <Shuffle size={24} />
      </button>
    </div>
  );
};

const TrackProgress = () => {
  return (
    <div className={s["track-progress"]}>
      {/* Add your track progress content here */}
      <h3>Track Progress</h3>
      <input type="range" min="0" max="100" />
    </div>
  );
};

const TrackOptions = () => {
  return <div className={s["track-options"]}>{/* Add your track options content here */}</div>;
};

export const NowPlaying = () => {
  return (
    <div className={s["now-playing"]}>
      {/* Add your component content here */}
      <h1>NowPlaying Component</h1>
    </div>
  );
};
