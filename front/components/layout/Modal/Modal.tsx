import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import Button from '../../element/Button/Button';
import { BsXLg } from "react-icons/bs";
import { FcAbout, FcHighPriority } from "react-icons/fc";
import styles from "./Modal.module.scss";

interface IModalProps {
  title?: string;
  children: React.ReactNode;
  btnType?: string;
  setIsShowModal: (isShow: boolean) => void;
}

const Modal:React.FC<IModalProps> = ({ title, children, btnType, setIsShowModal }) => {
    const onCloseModal = () => {
        setIsShowModal(false);
    }

    return (
        <div
            className={styles.modalContainer}
        >
            <div className={styles.modalBg} onClick={onCloseModal}></div>
            <div className={styles.modal}>
                <span className={styles.ico}>
                    {/* <FcAbout /> */}
                    <FcHighPriority />
                </span>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.content}>
                    {children}
                </div>
                <div className={styles.buttons}>
                    <Button varient="primary-blue" onClick={onCloseModal}>close</Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;