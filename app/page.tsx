import s from "./page.module.css";
import { Card, Table } from "./components";
import { SUMMARY, TOP_FIVE_MEMOS } from "./constants";

export default function Home() {
  return (
    <div className={`main ${s.page}`}>
      <main className={s.main}>
        <div className={s["featured-row"]}>
          <div>
            <Card
              title={SUMMARY.first_name}
              description={"Click Play for a message"}
              size="300px"
            />
          </div>
          <Table items={TOP_FIVE_MEMOS} />
        </div>
      </main>
    </div>
  );
}
