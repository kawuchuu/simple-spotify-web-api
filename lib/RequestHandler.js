const HTTPS = require('https')
const qs = require('qs')

/**
 * Handles API requests
 */
class RequestHandler {
    constructor(client) {
        this._client = client
        this.token = client.token
    }
    /**
     * Make an API request
     * @param {String} method The HTTP method to use
     * @param {String} endpoint The API endpoint to use
     * @param {Object} params The params to use
     * @param {Object} headers The request headers
     * @param {*} body The request body
     */
    request(method, endpoint, params, headers, body) {
        return new Promise((resolve, reject) => {
            console.log(this._client.token)
            let host = 'api.spotify.com'
            let base = '/v1/'
            if (headers && headers['Content-Type'] == 'application/x-www-form-urlencoded') {
                body = qs.stringify(body)
            }
            let authHeaders = 'Bearer ' + this.token
            let prepReq = {
                method: method,
                host: host,
                path: base + endpoint,
                headers: {
                    'Authorization': authHeaders
                }
            }
            if (body) prepReq['body'] = body
            if (params) prepReq.path += '?' + qs.stringify(params)
            const req = HTTPS.request(prepReq)
            console.log(prepReq)
            req.once('response', resp => {
                let _respStream = resp
                let response = ''
                _respStream.on('data', data => {
                    response += data
                }).once('end', () => {
                    resolve(JSON.parse(Buffer.from(response).toString()))
                })
            })
            req.setTimeout(5000, () => {
                console.log('timeout')
                req.abort()
            })
            req.on('error', err => {
                reject(err)
            })
            req.end()
        })
    }
}

module.exports = RequestHandler