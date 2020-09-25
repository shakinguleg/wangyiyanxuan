export default {
    namespaced: true,
    state: {
        orderList: [],
        totalCounte: 0,
        totalRetail: 0
    },
    mutations: {
        setOrderList(state, payload) {
            state.orderList = payload
        },
        setTotalCounte(state, payload) {
            state.totalCounte = payload
        },
        setTotalRetail(state, payload) {
            state.totalRetail = payload
        }
    }
}