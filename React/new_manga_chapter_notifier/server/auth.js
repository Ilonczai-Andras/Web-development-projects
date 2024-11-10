const fs = require('fs');
const axios = require('axios');
const crypto = require('crypto');

const CLIENT_ID = '85c20ef1c87483a0441225775c42c3ba';
const CLIENT_SECRET = 'c1418bab9644629653a5b8fe92a93ddcd1c83c67e9dfb0bc055dab58057caf6b';

// 1. Generate a new Code Verifier / Code Challenge.
function getNewCodeVerifier() {
  const token = crypto.randomBytes(75).toString('base64url');
  return token.slice(0, 128);
}

// 2. Print the URL needed to authorise your application.
function printNewAuthorisationUrl(codeChallenge) {
  const url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&code_challenge=${codeChallenge}`;
  console.log(`Authorise your application by clicking here: ${url}\n`);
}

// 3. Generate a new token using the Authorisation Code.
async function generateNewToken(authorisationCode, codeVerifier) {
  const url = 'https://myanimelist.net/v1/oauth2/token';
  const data = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: authorisationCode,
    code_verifier: codeVerifier,
    grant_type: 'authorization_code'
  });

  try {
    const response = await axios.post(url, data);
    const token = response.data;

    fs.writeFileSync('token.json', JSON.stringify(token, null, 4));
    console.log('Token saved in "token.json"');
    console.log('Token generated successfully!');

    return token;
  } catch (error) {
    console.error('Error generating token:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// 4. Test the API by requesting user profile information.
async function printUserInfo(accessToken) {
  const url = 'https://api.myanimelist.net/v2/users/@me';
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const user = response.data;
    console.log(`\n>>> Greetings ${user.name}! <<<`);
  } catch (error) {
    console.error('Error fetching user info:', error.response ? error.response.data : error.message);
  }
}

(async () => {
  try {
    const codeVerifier = getNewCodeVerifier();
    const codeChallenge = codeVerifier;
    printNewAuthorisationUrl(codeChallenge);

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Copy-paste the Authorisation Code: ', async (authorisationCode) => {
      rl.close();
      try {
        const token = await generateNewToken(authorisationCode.trim(), codeVerifier);
        await printUserInfo(token.access_token);
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
    });
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();
