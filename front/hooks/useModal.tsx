import { IModalProps } from '../components/layout/Modal/Modal';
import React, { useState, useCallback } from 'react';
import Modal from '../components/layout/Modal/Modal';

interface IModalHook {
    Modal: React.FC<IModalProps> | null;
    onShowModal: () => void;
    onCloseModal: () => void;
    modalContent: string | null;
    setModalContent: (content:string) => void
}

const useModal = (initialValue: boolean): IModalHook => {
    const [isShowModal, setIsShowModal] = useState(initialValue);
    const [modalContent, setModalContent] = useState(null);

    const onShowModal = useCallback(() => {
        setIsShowModal(true);
    }, [])

    const onCloseModal = useCallback(() => {
        setIsShowModal(false);
    }, []);

    return {
        Modal: 
            isShowModal ? ({ title, children }: IModalProps) => (
                <Modal
                    title={title}
                    onCloseModal={onCloseModal}
                >
                    {children}
                </Modal>
                ) 
                : () => null,
        onShowModal,
        onCloseModal,
        modalContent,
        setModalContent
    }
};

export default useModal;