import http from '../../../api/http';
import { GOODS_DETAIL_URL } from '../../../api/url';


export default {
    namespaced: true,
    state: {
        goodsDetail: {},
        id: "",
        goodsInfo: {},
        num: 1,
    },
    mutations: {
        setGoodsDetail(state, payload) {
            state.goodsDetail = payload
        },
        setGoodsId(state, payload) {
            state.id = payload
        },
        setGoodsNum(state, payload) {
            state.num = payload
        },

        sendToLocalStorage(state, payload) {
            const data = Object.values(state.goodsDetail.skuMap).find(item => { return item.id == state.id })

            if (data) {
                const { retailPrice, counterPrice, skuTitle, itemSkuSpecValueList, promBanner } = data
                var num = state.num
                state.goodsInfo =
                {
                    [state.id]:
                    {
                        retailPrice, counterPrice, skuTitle, itemSkuSpecValueList, promBanner, num
                    }
                }

            }

            // 检测购物车中是否已经有该商品
            var goods = window.localStorage.getItem("goodsInfo")
            if (goods) {
                goods = JSON.parse(goods);
                if (goods[state.id]) {
                    goods[state.id].num += state.num
                }
                state.goodsInfo = { ...state.goodsInfo, ...goods }
                window.localStorage.setItem('goodsInfo', JSON.stringify(state.goodsInfo))
            }
            window.localStorage.setItem('goodsInfo', JSON.stringify(state.goodsInfo))

        }

    },
    actions: {
        async getGoodsDetail(context, payload) {
            let { data } = await http.get(GOODS_DETAIL_URL, payload)

            // 

            const { item, policyList } = data

            let { itemDetail, attrList, detailPromBanner, promoTip, recommendReason, retailPrice, name, skuFreight, skuMap, shoppingReward, skuSpecList, remark, couponShortNameList, hdrkDetailVOList, adBanners, goodCmtRate, comments } = item

            // 分离轮播图与下方商品照片数据(视频也剔除了)
            let bannerUrlKey = Object.keys(itemDetail).filter(item => {
                return item != 'detailHtml' && item != 'videoInfo'
            })
            let detailHtml = itemDetail.detailHtml

            let bannerUrl = bannerUrlKey.map(item => {
                return itemDetail[item]
            })

            const goodsDetail = { policyList, detailHtml, bannerUrl, attrList, detailPromBanner, promoTip, recommendReason, retailPrice, name, skuFreight, skuMap, shoppingReward, skuSpecList, remark, couponShortNameList, hdrkDetailVOList, adBanners, goodCmtRate, comments }
            // 

            context.commit('setGoodsDetail', goodsDetail)
        }
    },
    getters: {
    }
}
