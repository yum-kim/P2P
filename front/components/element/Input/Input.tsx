import React, { forwardRef, ReactNode } from 'react';
import styles from './Input.module.scss';

interface IInputProps {
    type: 'text' | 'textarea' | 'password',
    variant: 'primary' | 'secondary' | 'background',
    value: string,
    height?: string,
    onChange: (e:React.ChangeEvent) => void,
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, IInputProps>(({ type, variant, value, height, onChange }, ref) => {
    return (
        <>
            {type == 'textarea' ?
                <textarea
                    ref={ref as React.RefObject<HTMLTextAreaElement>}
                    className={`${styles.textarea} ${styles['variant-' + variant]} ${styles['height-' + height]}`}
                    value={value}
                    height={height}
                    onChange={onChange}
                >
                </textarea>
                : <input
                    ref={ref as React.RefObject<HTMLInputElement>}
                    type={type}
                    className={`${styles.input} ${styles['variant-' + variant]}`}
                    value={value}
                    onChange={onChange}
                />
            }
        </>
    );
});

export default Input;