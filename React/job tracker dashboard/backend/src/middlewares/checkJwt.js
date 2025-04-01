const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa'); // Ezt tetted még nem be

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});

module.exports = checkJwt;
