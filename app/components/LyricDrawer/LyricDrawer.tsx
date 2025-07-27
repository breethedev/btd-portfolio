"use client";

import s from "./lyric-drawer.module.css";
import { Card } from "@/app/components";
import { SUMMARY } from "@/app/constants";
import { useEffect } from "react";
import { animateText } from "@/app/helpers";

type LyricDrawerProps = {
  open?: boolean;
};

export const LyricDrawer = ({ open }: LyricDrawerProps) => {
  useEffect(() => {
    if (!open) return;
    animateText("animated-text");
  }, [open]);

  return (
    <div className={s["lyric-drawer"]} style={{ bottom: open ? "0" : "-100%" }}>
      <Card
        title="Demo Song"
        description={`${SUMMARY.first_name} ${SUMMARY.last_name}`}
        size={["300px"]}
      />
      <div className={s["lyric-drawer-text-container"]}>
        <p id="animated-text" className={s["lyric-drawer-text"]}>
          Here would be the lyrics of the song. This is a placeholder text to demonstrate the lyric
          drawer functionality. You can replace this with actual lyrics or any other content you
          want to display in the drawer.
        </p>
      </div>
    </div>
  );
};
