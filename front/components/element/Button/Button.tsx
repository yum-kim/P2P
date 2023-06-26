import React from 'react';
import styles from './Button.module.scss';

interface IButtonProps {
    children: React.ReactNode,
    variant?: "primary" | "primary-blue" | "outlined" | "secondary" | "ghost" | "danger",
    size?: "32" | "36" | "40" | "48" | "55",
    type?: 'submit',
    disabled?: boolean,
    onClick?: () => void;
}

const Button = ({ children, variant = 'primary', size = '32', type, disabled,  onClick } : IButtonProps) => {
    return (
        <button className={`${styles.btn} ${styles['variant-' + variant]} ${styles['size-' + size]}`} type={type} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;