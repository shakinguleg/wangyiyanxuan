import http from '../../../api/http';
import { HOME_URL } from '../../../api/url';

export default {
    namespaced: true,
    state: {

    },
    mutations: {

    },
    actions: {
        async getHomeData(context, payload) {
            var { data: { data: { data } } } = await http.get(HOME_URL, {
                csrf_token: '9448997599e1955231a74e02960370d9',
                __timestamp: 1600689798777
            })
            console.log('homeData: ', data);
            var homeData={
                
            }
        }
    },
}