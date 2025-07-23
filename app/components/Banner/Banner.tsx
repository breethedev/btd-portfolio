"use client";

import s from "./banner.module.css";
import Image from "next/image";
import { SUMMARY } from "@/app/constants";
import { usePathname } from "next/navigation";

type BannerProps = {
  image?: string;
};

export const Banner = ({ image }: BannerProps) => {
  const route = usePathname();

  const getBannerMessage = (route: string) => {
    switch (route) {
      case "/":
        return SUMMARY.title;
      case "/blog":
        return "The Melodi Note";
      default:
        return SUMMARY.title;
    }
  };

  return (
    <div className={`${s["banner"]} banner`}>
      <div className={s["banner-content"]}>
        <h1 className={s["banner-title"]}>{getBannerMessage(route) || SUMMARY.title}</h1>
        {image && <Image src={image} alt="Banner Image" className={s["banner-image"]} />}
      </div>
    </div>
  );
};
