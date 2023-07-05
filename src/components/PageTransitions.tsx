import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PageTransition = ({ children }: any) => {
    const router = useRouter();
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
        const handleStart = () => {
            setIsPageLoaded(false);
        };

        const handleComplete = () => {
            setIsPageLoaded(true);
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);

        console.log('router.events', router.events);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
        };
    }, []);

    return (
        <div
            className={`fade ${
                isPageLoaded ? 'fade-enter-active' : 'fade-exit-active'
            }`}
        >
            {children}
        </div>
    );
};

export default PageTransition;
