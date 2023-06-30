import React, { useEffect, useState } from 'react';

interface ISliderProps {
    visible: boolean,
    children: React.ReactNode,
    options: {
        direction: "left" | "right",
        top: string,
        width?: string,
        speed?: number
    } 
}

const Slider = ({ visible, children, options }: ISliderProps) => {
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
        transform: `translateX(${visible ? 0 : options.direction == 'left' ? '-110%' : '200%'})`,
        transition: `transform ${options.speed || 0.6}s ease-in-out`,
        position: 'absolute',
        width: options.width || '100%',
        top: options.top,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 900
    };

    return isRendered ? (
        <section style={sliderStyle}>
            {children}
        </section>
    ) : null;
};

export default Slider;