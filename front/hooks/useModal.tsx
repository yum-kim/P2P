import { IModalProps } from '../components/layout/Modal/Modal';
import React, { useState, useCallback, useRef } from 'react';
import Modal from '../components/layout/Modal/Modal';

interface IModalHook {
    Modal: React.FC<IModalProps> | null,
    onShowModal: (content:string, onConfirm?:() => void) => void,
    onCloseModal: () => void,
    onConfirmModal: () => void
}

const useModal = (initialValue: boolean): IModalHook => {
    const [isShowModal, setIsShowModal] = useState(initialValue);
    const [modalContent, setModalContent] = useState(null);
    const callbackRef = useRef(null);

    const onShowModal = useCallback((content, onConfirm?) => {
        setIsShowModal(true);
        setModalContent(content);
        callbackRef.current = onConfirm;
    }, [modalContent, callbackRef.current])

    const onCloseModal = useCallback(() => {
        setIsShowModal(false);
        setModalContent(null);
        callbackRef.current = null;
    }, []);

    const onConfirmModal = useCallback(() => {
        callbackRef.current && callbackRef.current();        
        setIsShowModal(false);
        callbackRef.current = null;
    }, [callbackRef.current]);
    
    return {
        Modal:
            isShowModal ? ({ title }: IModalProps) => {
                const type = callbackRef.current ? 'confirm' : 'alert';
                return (
                    <Modal
                        type={type}
                        title={title}
                        onCloseModal={onCloseModal}
                        onConfirmModal={onConfirmModal}
                    >
                        {modalContent}
                    </Modal>
                )
            }
            : () => null,
        onShowModal,
        onCloseModal,
        onConfirmModal,
    }
};

export default useModal;