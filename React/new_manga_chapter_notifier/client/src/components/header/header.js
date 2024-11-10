function AuthorisationComponent() {

    function getNewCodeVerifier() {
        // Generate a random code verifier
        const array = new Uint8Array(32);
        window.crypto.getRandomValues(array);
        return btoa(String.fromCharCode.apply(null, array)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    

    const handleAuthorisation = () => {
    const codeVerifier = getNewCodeVerifier();
    const codeChallenge = encodeURIComponent(codeVerifier);
    printNewAuthorisationUrl(codeChallenge);
    };

    function printNewAuthorisationUrl(codeChallenge) {
        const url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&code_challenge=${codeChallenge}`;
        window.open(url, '_blank');
    }    

    return (
        <header className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-800 text-white z-10">
            <div className="flex space-x-4">
                <div className="text-lg font-semibold cursor-pointer hover:text-gray-300">Anime</div>
                <div className="text-lg font-semibold cursor-pointer hover:text-gray-300">Manga</div>
            </div>
            <div className="flex items-center space-x-2">
                <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
                <div className="text-lg font-semibold">name</div>
            </div>
            <div className="text-lg font-semibold cursor-pointer hover:text-gray-300" onClick={handleAuthorisation}>
                login
            </div>
        </header>
    );
}

export default AuthorisationComponent;
