import React from 'react';
import styles from './Button.module.scss';

const Button = ({ children, varient = 'primary', size = '32', ...rest }) => {
    return (
        <button className={styles.btn} varient={varient} size={size} {...rest}>
            {children}
        </button>
    );
};

export default Button;