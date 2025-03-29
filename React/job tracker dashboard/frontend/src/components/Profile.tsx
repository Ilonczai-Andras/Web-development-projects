import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    if (!isAuthenticated) return null;

    return (
        <article className="column">
            {user?.picture && <img src={user.picture} alt={user?.name || "User"} />}
            <h2>{user?.name}</h2>
            <ul>
                {Object.keys(user || {}).map((objKey, i) => (
                    <li key={i}>
                        {objKey}: {String(user?.[objKey])}
                    </li>
                ))}
            </ul>
        </article>
    );
}

export default Profile;
