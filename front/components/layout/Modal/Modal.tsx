import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from '../../element/Button/Button';
import { FcHighPriority, FcInfo } from "react-icons/fc";
import styles from "./Modal.module.scss";
import { createPortal } from 'react-dom';

export interface IModalProps {
    type?: "alert" | "confirm",
    title?: string,
    children?: React.ReactNode,
    onCloseModal?: () => void,
    onConfirmModal?: () => void
}

const Modal:React.FC<IModalProps> = ({ type, title, children, onCloseModal, onConfirmModal }) => {
    const [mounted, setMounted] = useState(false);
    const modalRootRef = useRef<Element | null>(null);
    
    const unlockScroll = useCallback(() => {
        document.body.style.overflow = "auto";
    }, []);
        
    const lockScroll = useCallback(() => {
        document.body.style.overflow = "hidden";
    }, []);

    useEffect(() => {
        setMounted(true);    
        if(document) {
            const dom = document.getElementById('modal');
            modalRootRef.current = dom;
        }

        lockScroll();
        return () => unlockScroll();
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