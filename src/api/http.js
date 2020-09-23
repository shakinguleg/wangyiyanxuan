import axios from 'axios';
import { HOST } from './url';


class Http {
    constructor(base_url) {
        this.base_url = base_url;
    };

    request(url, method = "GET", data = {}) {
        let option = {
            url,
            method,
            baseURL: this.base_url,
            headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        };
        if (method == "GET") {
            option = {
                ...option,
                params: data
            }
        } else if (method == "POST") {
            option = {
                ...option,
                data
            }
        }

        return axios.create().request(option);
    }

    get(url, data = {}) {
        return this.request(url, "GET", data)
    }

    post(url, data = {}) {

        return this.request(url, "POST", data)
    }

}

export default new Http(HOST)