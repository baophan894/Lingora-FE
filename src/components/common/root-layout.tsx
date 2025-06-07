import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

const RootLayout = () => {
    const { pathname } = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    return (
        <>
            <Toaster position="top-right" richColors />
            <Outlet />
        </>
    );
};

export default RootLayout;
