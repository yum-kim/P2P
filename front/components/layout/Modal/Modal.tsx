import React, { useState, useEffect, useRef } from 'react';
import Button from '../../element/Button/Button';
import { BsXLg } from "react-icons/bs";
import { FcAbout, FcHighPriority, FcInfo } from "react-icons/fc";
import styles from "./Modal.module.scss";
import { createPortal } from 'react-dom';

export interface IModalProps {
    title?: string;
    children: React.ReactNode;
    onCloseModal: () => void;
}

const Modal:React.FC<IModalProps> = ({ title, children, onCloseModal }) => {
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
                    {/* <FcAbout /> */}
                    <FcInfo />
                </span>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.content}>
                    {children}
                </div>
                <div className={styles.buttons}>
                    <Button variant="primary-blue" onClick={onCloseModal}>확인</Button>
                </div>
            </div>
        </div>
    );
    
    if (modalRootRef.current && mounted) {
        return createPortal(modal, modalRootRef.current);
    }
};

export default Modal;