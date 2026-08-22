import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/useAuthStore.js';
import PageLoader from '../components/PageLoader.jsx';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const { isCheckingAuth, authUser } = useAuthStore();

    useEffect(() => {
        if (isCheckingAuth) return;

        // 1. Route requires auth, but user is NOT logged in
        if (authentication && !authUser) {
            navigate("/login");
        } 
        // 2. Route is public (like login), but user IS logged in
        else if (!authentication && authUser) {
            navigate("/");
        }
    }, [authUser, navigate, authentication, isCheckingAuth]);

    if (isCheckingAuth) {
        return <PageLoader />;
    }

    return <>{children}</>;
}
