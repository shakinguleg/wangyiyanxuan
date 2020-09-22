import http from '../../../api/http';
import { HOME_URL } from '../../../api/url';

export default {
    namespaced: true,
    state: {
        policy: [],
        kingKong: [],
        bigPromotion: {},
        categoryHot: {}
    },
    mutations: {
        setPolicy(state, payload) {
            state.policy = payload
        },
        setKingKong(state, payload) {
            state.kingKong = payload
        },
        setBigPromotion(state, payload) {
            state.bigPromotion = payload
        },
        setCategoryHot(state, payload) {
            state.categoryHot = payload
        }
    },
    actions: {
        async getHomeData(context, payload) {
            var { data: { data: { data } } } = await http.get(HOME_URL, {
                csrf_token: '9448997599e1955231a74e02960370d9',
                __timestamp: 1600689798777
            })
            // console.log('homeData: ', data);
            const { policyDescList, kingKongModule, bigPromotionModule, categoryHotSellModule } = data;
            context.commit('setPolicy', policyDescList);
            context.commit('setKingKong', kingKongModule);
            context.commit('setBigPromotion', bigPromotionModule);
            context.commit('setCategoryHot', categoryHotSellModule);
        }
    },
}