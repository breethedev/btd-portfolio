"use client";

import s from "./now-playing.module.css";
import Image from "next/image";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Ellipsis,
  Heart,
  ChevronUp,
  Repeat,
  Shuffle,
  ChevronDown,
} from "lucide-react";
import { useMusicPlayer } from "@/app/contexts";
import { convertMillisecondsToTime } from "@/app/helpers";
import { useState } from "react";
import { Toast } from "@/app/components/Toast/Toast";
// import { LyricDrawer } from "@/app/components";

const CurrentTrack = () => {
  let trackInfo;
  const { currentTrack } = useMusicPlayer();

  if (!currentTrack) {
    trackInfo = {
      title: "No Song",
      artist: "No Artist",
      coverImage: null,
    };
  } else {
    trackInfo = currentTrack;
  }

  const { title, artist, coverImage } = trackInfo;

  return (
    <div className={s["track-content"]}>
      <div className={s["track-image"]}>
        {coverImage ? (
          <Image src={coverImage} alt={title ? `${title} cover image` : " "} />
        ) : (
          <div className={s.placeholder} />
        )}
      </div>
      <div className={s["track-details"]}>
        <p>{title || "No Song"}</p>
        <p className={s["track-artist"]}>{artist || "No Artist"}</p>
      </div>
    </div>
  );
};

const TrackControls = () => {
  const { isPlaying } = useMusicPlayer();
  return (
    <div className={s["track-controls"]}>
      {/* Add your track controls content here */}
      <button className={s["control-button"]}>
        <Shuffle size={16} />
      </button>
      <button className={s["control-button"]}>
        <SkipBack size={24} />
      </button>
      {!isPlaying ? (
        <button className={s["control-button"]}>
          <Play size={24} />
        </button>
      ) : (
        <button className={s["control-button"]}>
          <Pause size={24} />
        </button>
      )}
      <button className={s["control-button"]}>
        <SkipForward size={24} />
      </button>
      <button className={s["control-button"]}>
        <Repeat size={16} />
      </button>
    </div>
  );
};

const TrackProgress = () => {
  let trackProgress;
  const { duration, currentTime } = useMusicPlayer();

  if (!duration || !currentTime) {
    trackProgress = {
      currentTime: 0,
      duration: 0,
    };
  } else {
    trackProgress = {
      currentTime,
      duration,
    };
  }

  return (
    <div className={s["track-progress"]}>
      <p className={s["track-time"]}>{convertMillisecondsToTime(currentTime)}</p>
      <input type="range" min="0" max="100" className={s["track-progress-range"]} />
      <p className={s["track-time"]}>{convertMillisecondsToTime(trackProgress.duration)}</p>
    </div>
  );
};

const TrackOptions = () => {
  const [showToast, setShowToast] = useState(false);
  const handleShowToastToggle = () => {
    setShowToast((prev) => !prev);
  };
  return (
    <div className={s["track-options"]}>
      <button className={s["control-button"]}>
        <Heart size={24} />
      </button>
      <button className={s["control-button"]} onClick={handleShowToastToggle}>
        <Ellipsis size={24} />
      </button>
      <Toast
        toastOpen={showToast}
        setToastOpen={setShowToast}
        toastMessage="Working on it! Stay tuned for lyrics support."
        toastTitle="Coming Soon! 🎶"
      />

      {/* <button className={s["control-button"]} onClick={handleLyricDrawerToggle}>
        {lyricDrawerOpen ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
      </button> */}
    </div>
  );
};

export const NowPlaying = () => {
  // const [lyricDrawerOpen, setLyricDrawerOpen] = useState(false);

  // const handleLyricDrawerToggle = () => {
  //   setLyricDrawerOpen((prev) => !prev);
  // };

  return (
    <>
      <div className={s["now-playing"]}>
        {/* Add your component content here */}
        <CurrentTrack />
        <div className={s["track-controls-container"]}>
          <TrackControls />
          <TrackProgress />
        </div>
        <TrackOptions
        // lyricDrawerOpen={lyricDrawerOpen}
        // handleLyricDrawerToggle={handleLyricDrawerToggle}
        />
      </div>
      {/* <LyricDrawer open={lyricDrawerOpen} /> */}
    </>
  );
};
