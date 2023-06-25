import React, { useEffect, useState } from 'react';
import styles from './Slider.module.scss';

interface ISliderProps {
    visible: boolean,
    children: React.ReactNode,
}

const Slider = ({ visible, children }: ISliderProps) => {
    const [isRendered, setIsRendered] = useState(visible);

    useEffect(() => {
        if (visible) {
            setIsRendered(true);
        } else {
            const timer = setTimeout(() => {
                setIsRendered(true);
            }, 0);
         
            return () => clearTimeout(timer);
        }
    }, [visible]);


    const sliderStyle: React.CSSProperties = {
        transform: `translateX(${visible ? 0 : '200%'})`,
        transition: 'transform 0.6s ease-in-out',
        position: 'absolute',
        top: '20px',
        left: 0,
        bottom: 0,
        right: 0,
    };

    return isRendered ? (
        <section className={styles.slider} style={sliderStyle}>
            {children}
        </section>
    ) : null;
};

export default Slider;