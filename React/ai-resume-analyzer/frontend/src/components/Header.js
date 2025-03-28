import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Header = ({ user, onLogin, onLogout }) => {

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    onLogin(decoded);
  };

  const handleLogout = () => {
    googleLogout();
    onLogout();
  };

  return (
    <header className="h-16 bg-indigo-600 flex items-center justify-between px-4 shrink-0 shadow">
      <h1 className="text-xl font-bold text-white">AI-Powered Resume Analyzer</h1>

      <div>
        {user ? (
          <div className="flex items-center space-x-2">
            <img src={user.picture} alt="profile" className="w-8 h-8 rounded-full" />
            <span className="text-white">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log('Login Failed')}
            useOneTap
            scope="openid profile email"
          />

        )}
      </div>
    </header>
  );
};

export default Header;
