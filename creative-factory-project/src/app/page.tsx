import { Header } from './components';
import { CurrencyProvider } from './context/CurrencyContext';
import { Convert } from './pages/Convert/Convert';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CurrencyProvider>
          <Header />
          <Convert />
        </CurrencyProvider>
      </main>
    </div>
  );
}
