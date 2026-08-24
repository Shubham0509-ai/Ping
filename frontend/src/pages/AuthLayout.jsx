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
    
    // FIXED SYNCHRONOUS RENDERING GUARDS:
    // If the route expects a user but they aren't authenticated (e.g., right at logout),
    // stop rendering private children immediately while the navigation hook shifts pages.
    if (authentication && !authUser) {
        return <PageLoader />; // or return null;
    }

    // Conversely, if it's a public route and the user is logged in, hide the login page content
    if (!authentication && authUser) {
        return null;
    }

    return <>{children}</>;
}
