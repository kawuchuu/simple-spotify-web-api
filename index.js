const Client = require('./lib/Client')

function Spotify(token, refreshToken, auth) {
    return new Client(token, refreshToken, auth)
}

Spotify.Client = Client
Spotify.RequestHandler = require('./lib/RequestHandler')

module.exports = Spotify