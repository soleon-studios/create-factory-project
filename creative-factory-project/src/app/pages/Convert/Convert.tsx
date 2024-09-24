import { Currencies, TargetCurrency } from '../../components';
import styles from './convert.module.css';

export const Convert = () => {
  return (
    <div className={styles.convertPageContainer}>
      <TargetCurrency />
      <Currencies />
    </div>
  );
};
