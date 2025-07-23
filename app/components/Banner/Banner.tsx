"use client";

import s from "./banner.module.css";

import Image from "next/image";
import { SUMMARY } from "@/app/constants";
import { usePathname, useParams } from "next/navigation";

type BannerProps = {
  image?: string;
};

export const Banner = ({ image }: BannerProps) => {
  const route = usePathname();
  const params = useParams();
  const slug = params.slug;

  console.log("Current params:", params);

  console.log("Current route:", route);

  const getBannerMessage = (route: string) => {
    if (!route) return SUMMARY.title;
    if (slug) return slug.toString().replace(/-/g, " ");

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
