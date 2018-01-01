import axios from 'axios';

export default class ApiClient {

    /**
     * @param {String} baseURL
     * @param {Object=} headers
     */
    constructor(baseURL, headers = {}) {
        this._httpClient = axios.create({ baseURL, headers });
    }

    /**
     * @param {String} path
     *
     * @returns {Promise}
     */
    get(path) {
        return this._httpClient.get(path);
    }

    /**
     * @param {String} baseURL
     * @param {Object} request
     *
     * @returns {ApiClient}
     */
    static createWithForwardedCookie(baseURL, request) {
        return new ApiClient(
            baseURL,
            {
                cookie: request.get('cookie') || ''
            }
        )
    }
}
