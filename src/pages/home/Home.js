import TransactionForm from "./TransactionForm/TransactionForm";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>transaction list</div>
      <div className={styles.sidebar}>
        <TransactionForm></TransactionForm>
      </div>
    </div>
  );
}
