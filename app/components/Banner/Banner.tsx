import s from "./banner.module.css";
import Image from "next/image";
import { SUMMARY } from "@/app/constants";

type BannerProps = {
  image?: string;
};

export const Banner = ({ image }: BannerProps) => {
  return (
    <div className={`${s["banner"]} banner`}>
      <div className={s["banner-content"]}>
        <h1 className={s["banner-title"]}>{SUMMARY.title}</h1>
        {image && <Image src={image} alt="Banner Image" className={s["banner-image"]} />}
      </div>
    </div>
  );
};
