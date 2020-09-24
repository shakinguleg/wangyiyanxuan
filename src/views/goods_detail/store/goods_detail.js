import http from '../../../api/http';
import { GOODS_DETAIL_URL } from '../../../api/url';
import axios from 'axios';


export default {
    namespaced: true,
    state: {
        goodsDetail: {},
        id: "",
        goodsInfo: {}
    },
    mutations: {
        setGoodsDetail(state, payload) {
            state.goodsDetail = payload
        },
        setGoodsId(state, payload) {
            state.id = payload
        },
        sendTolocalStore(state, payload) {
            const data = Object.values(state.goodsDetail.skuMap).find(item => { return item.id == state.id })
            if (data) {
                const { retailPrice, counterPrice, skuTitle, itemSkuSpecValueList, promBanner } = data
                this.goodsInfo = {
                    retailPrice, counterPrice, skuTitle, itemSkuSpecValueList, promBanner
                }
            }
            window.localStorage.setItem('goodsInfo', JSON.stringify(this.goodsInfo))
        }

    },
    actions: {
        async getGoodsDetail(context, payload) {
            let { data } = await http.get(GOODS_DETAIL_URL, payload)

            // console.log('data: ', data);

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
            // console.log('itemDetail: ', itemDetail);

            context.commit('setGoodsDetail', goodsDetail)
        }
    },
    getters: {
    }
}
