import React, { useState, useEffect } from 'react';
import Button from '../../element/Button/Button';
import { BsXLg } from "react-icons/bs";
import { FcAbout, FcHighPriority, FcInfo } from "react-icons/fc";
import styles from "./Modal.module.scss";

export interface IModalProps {
    title?: string;
    children: React.ReactNode;
    onCloseModal: () => void;
}

const Modal:React.FC<IModalProps> = ({ title, children, onCloseModal }) => {
    return (
        <div
            className={styles.modalContainer}
        >
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
};

export default Modal;