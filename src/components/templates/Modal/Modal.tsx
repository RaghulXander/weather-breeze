import React from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	if (!isOpen) return null;
	return (
		<div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} onClick={handleOverlayClick}>
			<div className={styles.modal}>
				<button className={styles.closeButton} onClick={onClose}>
					X
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
