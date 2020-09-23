import http from '../../../api/http';
import { HOME_GLOBAL_URL } from '../../../api/url';
import { HOME_NAV_URL } from '../../../api/url';

export default {
    namespaced: true,
    state: {
        cateList: [],//所有标签页id
        itemList: [],//当前标签页商品数据
        bannerList: [] //当前标签页轮播图

    },
    mutations: {
        setCateList(state, payload) {
            state.cateList = payload
        },
        setItemList(state, payload) {
            state.itemList = payload
        },
        setBannerList(state, payload) {
            state.bannerList = payload
        }
    },
    actions: {
        async getCateList(context, payload) {
            var data = await http.get(HOME_GLOBAL_URL, {
                csrf_token: '9448997599e1955231a74e02960370d9'
            })

            // 获取所有标签页id
            const { data: { data: { cateList } } } = data;
            context.commit('setCateList', cateList)
        },
        async getCurrentCateList(context, payload) {
            var data = await http.get(HOME_NAV_URL, payload)
            // console.log('data: ', data);

            // 获取当前标签页数据
            const { data: { data: { categoryItemList, currentCategory: { bannerList } } } } = data;
            var itemList = categoryItemList.map(item => {
                return {
                    category: { title: item.category.name, frontName: item.category.frontName },
                    itemList: item.itemList.map(i => ({
                        id: i.id,
                        name: i.name,//商品名
                        listPicUrl: i.listPicUrl,
                        itemTagList: i.itemTagList,//优惠项[{name}]
                        simpleDesc: i.simpleDesc,//商品描述
                        retailPrice: i.retailPrice,//折扣
                        counterPrice: i.counterPrice, //全价
                        listPromBanner: i.listPromBanner
                    })),
                }
            })
            console.log('itemList: ', itemList);
            context.commit('setItemList', itemList)
            context.commit('setBannerList', bannerList)
        }
    }
}