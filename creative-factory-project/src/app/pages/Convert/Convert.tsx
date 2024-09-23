import { Currencies, TargetCurrency } from '../../components';
import styles from './convert.module.css';

export const Convert = () => {
  console.log('hello');
  return (
    <div className={styles.convertPageContainer}>
      <TargetCurrency />
      <Currencies />
    </div>
  );
};
