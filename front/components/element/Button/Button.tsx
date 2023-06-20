import React from 'react';
import styles from './Button.module.scss';

interface IButtonProps {
    children: React.ReactNode,
    variant?: "primary" | "primary-blue" | "outlined" | "secondary" | "ghost",
    size?: "32" | "36" | "40" | "48" | "55",
    type?: 'submit',
    onClick?: () => void;
}

const Button = ({ children, variant = 'primary', size = '32', type, onClick } : IButtonProps) => {
    return (
        <button className={`${styles.btn} ${styles['variant-' + variant]} ${styles['size-' + size]}`} type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;