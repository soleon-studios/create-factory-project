import styles from './Modal.module.css';

interface Props {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
export const Modal = ({ onClose, children, title }: Props) => {
  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <a href='#' onClick={handleCloseClick}>
              x
            </a>
          </div>
          <div className={styles.modalTitle}>
            <h3>{title}</h3>
            <p>Foreign Exchange Rate</p>
          </div>
          <div className={styles.modalBody}>{children}</div>
        </div>
      </div>
    </div>
  );
};
