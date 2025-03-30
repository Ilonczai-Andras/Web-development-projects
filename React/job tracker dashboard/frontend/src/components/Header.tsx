import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

export const Header = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            background: '#111827',
            color: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ fontSize: '1.3rem' }}>Job Tracker Dashboard</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {isAuthenticated && user && <span>👤 {user.name}</span>}
                <LoginButton />
                <LogoutButton />
            </div>
        </header>
    );
}
