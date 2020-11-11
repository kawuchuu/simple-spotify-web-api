const RequestHandler = require('./RequestHandler')

/**
 * Represents the Spotify client
 * @prop {String} token The application access token
 * @prop {RequestHandler} requestHandler The request handler the client will use
 */
class Client {
    /**
     * Create a Client
     * @param {String} token 
     */
    constructor(token) {
        this.token = token
        this.requestHandler = new RequestHandler(this)
    }

    /*
        Search API
    */

    /**
     * Create a search query
     * @param {String} query The search query
     * @param {String} type The search type
     * @param {Number} limit The amount of results to receive
     * @returns {Promise}
     */
    search(q, type, limit) {
        const params = {
            q: q,
            type: type,
            limit: limit
        }
        return new Promise((resolve, reject) => {
            this.requestHandler.request('GET', 'search', params).then(resp => {
                resolve(resp)
            })
        })
    }

    /*
        Player API
    */

    /**
     * Returns the user's current playback. Requires the 'user-read-playback-state' scope.
     */
    getCurrentUserPlayback() {
        return new Promise((resolve, reject) => {
            this.requestHandler.request('GET', 'me/player').then(result => {
                resolve(result)
            })
        })
    }

    /*
        Users Profile API
    */

    /**
     * Returns the current user's profile. May require the 'user-read-email' and/or 'user-read-private' scopes to access more data.
     */
    getCurrentUser() {
        return new Promise((resolve, reject) => {
            this.requestHandler.request('GET', 'me').then(result => {
                resolve(result)
            })
        })
    }

    /**
     * Returns a public user profile
     * @param {String} id The user's profile ID
     */
    getUser(id) {
        return new Promise((resolve, reject) => {
            this.requestHandler.request('GET', `users/${id}`).then(result => {
                resolve(result)
            })
        })
    }

    /*
        Tracks API
    */

    /**
     * Returns a list of tracks
     * @param {String} ids A comma-separated list of track IDs
     * @param {String} market The market-relevant data for these tracks
     */
    getMultipleTracks(ids, market) {
        let params = {
            ids: ids
        }
        if (market) params['market'] = market
        return new Promise((resolve, reject) => {
            this.requestHandler.request('GET', 'tracks', params).then(resp => {
                resolve(resp)
            })
        })
    }

    /**
     * Returns a track
     * @param {String} id The track ID
     * @param {String} market The market-relevant data for this track
     */
    getTrack(id, market) {
        let params = {}
        if (market) params['market'] = market
        return new Promise((resolve, reject) => {
            this.requestHandler.request('GET', `tracks/${id}`, params).then(resp => {
                resolve(resp)
            })
        })
    }

    /*
        Artists API
    */

    /**
     * Return an artist
     * @param {String} id The artist ID
     * @returns {Promise}
     */
    getArtist(id) {
        return new Promise((resolve, reject) => {
            this.requestHandler.request('GET', `artists/${id}`).then(resp => {
                resolve(resp)
            })
        })
    }

    /**
     * Returns a list of artists
     * @param {String} ids A comma-separated list of artist IDs
     */
    getMultipleArtists(ids) {
        return new Promise((resolve, reject) => {
            this.requestHandler.request('GET', 'artists', {ids: ids}).then(resp => {
                resolve(resp)
            })
        })
    }
}

module.exports = Client