"use client";

import s from "./page.module.css";
import { Card, Table, Carousel, Banner } from "./components";
import { SUMMARY, TOP_FIVE_MEMOS, PROJECTS, EXPERIENCE } from "./constants";

export default function Home() {
  return (
    <main className={s.page}>
      <Banner />
      <div className={s["featured-row"]}>
        <div>
          <Card
            title={`${SUMMARY.first_name} ${SUMMARY.last_name}`}
            description="Click play for a quick intro"
            size={["300px"]}
          />
        </div>
        <Table items={TOP_FIVE_MEMOS} />
      </div>
      <Carousel
        header="Projects"
        action="View All"
        cards={PROJECTS}
        onActionClick={() => console.log("View All Projects clicked")}
      />
      <Carousel
        header="Experience"
        action="Get Resume"
        cards={EXPERIENCE}
        cardSize={["400px", "200px"]}
        onActionClick={() => console.log("Get Resume clicked")}
      />
    </main>
  );
}
