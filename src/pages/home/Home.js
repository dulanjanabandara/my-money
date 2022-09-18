import { useAuthContext } from "./../../hooks/useAuthContext";
import TransactionForm from "./TransactionForm/TransactionForm";
import styles from "./Home.module.css";

export default function Home() {
  const { user } = useAuthContext();
  return (
    <div className={styles.container}>
      <div className={styles.content}>transaction list</div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid}></TransactionForm>
      </div>
    </div>
  );
}
