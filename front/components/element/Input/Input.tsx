import React, { forwardRef } from 'react';
import styles from './Input.module.scss';

interface IInputProps {
    id?: string,
    type: 'text' | 'textarea' | 'password',
    placeholder?: string,
    variant?: 'primary' | 'secondary' | 'background',
    value?: string,
    height?: string,
    onChange?: (e:React.ChangeEvent) => void,
    disabled?: boolean,
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, IInputProps>((
    { id, type, placeholder, variant, value, height, onChange, disabled }, ref) => {
    return (
        <>
            {type == 'textarea' ?
                <textarea
                    id={id}
                    ref={ref as React.RefObject<HTMLTextAreaElement>}
                    placeholder={placeholder}
                    className={`${styles.textarea} ${styles['variant-' + variant]} ${styles['height-' + height]}`}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                >
                </textarea>
                : <input
                    id={id}
                    ref={ref as React.RefObject<HTMLInputElement>}
                    placeholder={placeholder}
                    type={type}
                    className={`${styles.input} ${styles['variant-' + variant]}`}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            }
        </>
    );
});

export default Input;