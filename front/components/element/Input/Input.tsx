import React from 'react';
import styles from './Input.module.scss';

const Input = ({ type, ...rest }) => {
    return (
        <>
            {type == 'textarea' ?
                <textarea className={styles.textarea} {...rest}></textarea>
                : <input type={type} className={styles.input} {...rest} />
            }
        </>
    );
};

export default Input;