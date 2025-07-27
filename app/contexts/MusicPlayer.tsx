"use client";

import React, { useContext } from "react";

export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverImage: string; // URL to the cover image
  duration: number; // Duration in seconds
  audioFile: HTMLAudioElement; // The audio file element
};

type MusicPlayerContextType = {
  skipTrack: (trackToPlay: Track) => void;
  stop: (audioFile: Track) => void;
  play: (audioFile: Track) => void;
  pause: (audioFile: Track) => void;
  currentTrack: Track | null;
  setCurrentTrack: (track: Track | null) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
  isPlaying: boolean;
  togglePlay: (audioFile: Track) => void;
};

export const MusicPlayerContext = React.createContext<MusicPlayerContextType>({
  isPlaying: false,
  currentTrack: null,
  skipTrack: () => {},
  play: () => {},
  pause: () => {},
  setCurrentTrack: () => {},
  stop: () => {},
  currentTime: 0,
  setCurrentTime: () => {},
  duration: 0,
  setDuration: () => {},
  volume: 1,
  setVolume: () => {},
  togglePlay: () => {},
});

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
};

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = React.useState<Track | null>(null);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(0);
  const [volume, setVolume] = React.useState<number>(1);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

  const play = (track: Track) => {
    if (track && track.audioFile) {
      const audioFile = track.audioFile;
      audioFile.play();
      setIsPlaying(true);
      setCurrentTrack(track); // Assuming audioFile has an id attribute for the track ID
      audioFile.volume = volume; // Set the volume for the audio file
      audioFile.ontimeupdate = () => {
        setCurrentTime(audioFile.currentTime);
      };
      audioFile.onloadedmetadata = () => {
        setDuration(audioFile.duration);
      };
      audioFile.onended = () => {
        setIsPlaying(false);
        setCurrentTrack(null); // Reset current track when the track ends
      };
      audioFile.onerror = (error) => {
        console.error("Error playing audio file:", error);
        setIsPlaying(false);
      };
    }
  };

  const stop = (track: Track) => {
    const audioFile = track.audioFile;
    if (isPlaying) {
      audioFile.pause();
      audioFile.currentTime = 0; // Reset the current time to the start
      setIsPlaying(false);
      setCurrentTrack(null); // Reset current track ID when stopped
    }
  };

  const pause = (track: Track) => {
    const audioFile = track.audioFile;
    if (isPlaying) {
      audioFile.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = (track: Track) => {
    if (isPlaying && track) {
      pause(track);
    } else {
      play(track);
    }
    setIsPlaying(!isPlaying);
  };

  const skipTrack = (trackToPlay: Track) => {
    const currentAudio = currentTrack;

    if (currentAudio) {
      stop(currentAudio);
    }
    if (trackToPlay) {
      play(trackToPlay);
    }
  }; // Logic to skip to the next track

  return (
    <MusicPlayerContext.Provider
      value={{
        stop,
        currentTrack,
        setCurrentTrack,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        volume,
        setVolume,
        isPlaying,
        play,
        pause,
        togglePlay,
        skipTrack,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};
