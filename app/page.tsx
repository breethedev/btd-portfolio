import s from "./page.module.css";
import { Card } from "./components";
import { SUMMARY } from "./constants";

export default function Home() {
  return (
    <div className={`main ${s.page}`}>
      <main className={s.main}>
        <Card title={SUMMARY.first_name} description={"Click Play for a message"} size="large" />
      </main>
    </div>
  );
}
