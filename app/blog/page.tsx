import s from "./blog.module.css";
import { Carousel } from "@/app/components";
import { BLOG_DEV_CARDS, BLOG_LIFESTYLE_CARDS, BLOG_MUSIC_CARDS } from "./constants";

export default function Blog() {
  return (
    <div className={s.blog}>
      <Carousel header="Development" cards={BLOG_DEV_CARDS} cardSize={["400px", "200px"]} />
      <Carousel header="Lifestyle" cards={BLOG_LIFESTYLE_CARDS} cardSize={["400px", "200px"]} />
      <Carousel header="Music" cards={BLOG_MUSIC_CARDS} cardSize={["400px", "200px"]} />
    </div>
  );
}
