import React, { useState, useEffect, useRef } from 'react';
import Button from '../../element/Button/Button';
import { FcHighPriority, FcInfo } from "react-icons/fc";
import styles from "./Modal.module.scss";
import { createPortal } from 'react-dom';

export interface IModalProps {
    type: "alert" | "confirm",
    title?: string,
    children: React.ReactNode,
    onCloseModal: () => void,
    onConfirmModal?: () => void
}

const Modal:React.FC<IModalProps> = ({ type, title, children, onCloseModal, onConfirmModal }) => {
    const [mounted, setMounted] = useState(false);
    const modalRootRef = useRef<Element | null>(null);
    
    useEffect(() => {
        setMounted(true);    
        if(document) {
            const dom = document.getElementById('modal');
            modalRootRef.current = dom;
        }
    }, [])
 
    const modal = (
        <div className={styles.modalContainer}>
            <div className={styles.modalBg} onClick={onCloseModal}></div>
            <div className={styles.modal}>
                <span className={styles.ico}>
                    {type == "alert" && <FcInfo />}
                    {type == "confirm" && <FcHighPriority />}
                </span>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.content}>
                    {children}
                </div>
                <div className={styles.buttons}>
                    {type == "alert" && <Button variant="primary-blue" onClick={onCloseModal}>확인</Button>}
                    {type == "confirm" && (
                        <>
                            <Button variant="danger" onClick={onConfirmModal}>예</Button>
                            <Button variant="primary-blue" onClick={onCloseModal}>아니오</Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
    
    if (modalRootRef.current && mounted) {
        return createPortal(modal, modalRootRef.current);
    }
};

export default Modal;