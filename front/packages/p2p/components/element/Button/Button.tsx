import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

interface IButtonProps {
    children: React.ReactNode,
    variant?: "primary" | "primary-blue" | "outlined" | "secondary" | "ghost" | "danger",
    size?: "32" | "36" | "40" | "48" | "55",
    type?: 'submit',
    disabled?: boolean,
    onClick?: () => void,
}

const Button = ({ children, variant = 'primary', size = '32', type, disabled,  onClick } : IButtonProps) => {
    const classNames = clsx(styles.btn, styles['variant-' + variant], styles['size-' + size]);

    return (
        <button className={classNames} type={type} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;