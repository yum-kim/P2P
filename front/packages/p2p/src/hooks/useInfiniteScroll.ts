import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';

interface IIntersectionOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number;  
}

interface IUseInfiniteScrollReturnType {
    isIntersecting: boolean;
}

const useInfiniteScroll = (
  intersectRef: RefObject<Element>,
  options: IIntersectionOptions = {}
): IUseInfiniteScrollReturnType => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        setIsIntersecting(target.isIntersecting);
    }, []);

    const observerOptions = useMemo(() => ({
        root: options.root || null,
        rootMargin: options.rootMargin || '0px',
        threshold: options.threshold || 0
        }), [options.root, options.rootMargin, options.threshold]
    );

    useEffect(() => {
        let observer: IntersectionObserver;
        
        if (intersectRef.current) {
            observer = new IntersectionObserver(observerCallback, observerOptions);
            observer.observe(intersectRef.current);
        }

        return () => observer?.disconnect();
    }, [intersectRef.current, observerCallback, observerOptions]);

    return { isIntersecting };
};

export default useInfiniteScroll;