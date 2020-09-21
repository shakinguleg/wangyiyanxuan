import http from '../api/http';
import { HOME_NAV_URL } from '../api/url';

export default {
    namespaced: true,
    state: {
        data: []
    },
    mutations: {
        setData(state, payload) {
            state.data = payload
        }
    },
    actions: {
        async getData(context, payload) {
            var data = await http.get(HOME_NAV_URL, {
                csrf_token: '9448997599e1955231a74e02960370d9'
            })
            console.log('homeNavData: ', data);
            const { data: { data: { cateList } } } = data;
            context.commit('setData', cateList)
        }
    }
}