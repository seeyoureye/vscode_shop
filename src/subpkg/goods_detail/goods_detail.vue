<template>
  <div class="goods_detail_page">
    <!-- 轮播图 -->
    <swiper autoplay indicator-dots>
      <swiper-item
        v-for="(i, index) in pics"
        :key="i.pics_id"
        @click="preview(index)"
      >
        <image class="pics_item" :src="i.pics_big" mode="scaleToFill" />
      </swiper-item>
    </swiper>
    <!-- 商品信息 -->
    <view class="goods_info">
      <!-- 价格 -->
      <view class="goods_price">
        <text>¥ {{ goodsData.goods_price || 1999 }} </text> </view
      ><!-- {{goodsData.goods_price}} -->
      <!-- 名称/icon -->
      <view class="goods_name">
        <text class="name">{{ goodsData.goods_name }}</text>
        <view class="icon">
          <uni-icons type="star" color="#efefef" size="30" />
          <text>收藏</text>
        </view>
      </view>
      <!-- 其他信息 -->
      <view class="goods_other">
        <text>快递:免运费</text>
      </view>
    </view>
    <!-- 商品详情 -->
    <rich-text :nodes="goods_introduce"></rich-text>
    <!-- 底部栏 小程序或者说移动端,也太依赖这些东西了... -->
    <view class="goods_footerNav">
      <uni-goods-nav
        :fill="true"
        :options="footerNav.options"
        :button-group="footerNav.buttonGroup"
        @click="leftButton"
        @button-click="rightButton"
      />
    </view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsData: {},
      pics: [],
      goods_introduce: "",
      footerNav: {
        // icon
        options: [
          { icon: "shop",text: "店铺",},
          { icon: "cart", text: "购物车", info: 2 },
        ],
        // 按钮的颜色 
        buttonGroup: [
          {
            text: "加入购物车",
            backgroundColor: "linear-gradient(90deg, #FFCD1E, #FF8A18)",
            color: "#fff",
          },
          {
            text: "立即购买",
            backgroundColor: "linear-gradient(90deg, #FE6035, #EF1224)",
            color: "#fff",
          },
        ],
      },
    };
  },
  onLoad(options) {
    let { goods_id } = options;
    this.getData(goods_id);
  },
  methods: {
    async getData(id) {
      let { data: res } = await uni.$API.goods.reqGetDetail(id);
      if (res.meta.status === 200) {
        this.goodsData = res.message;
        this.pics = res.message.pics;
        console.log(this.goodsData);
        this.goods_introduce = res.message.goods_introduce
          .replace(/<img/g, '<img style="display:block;" ')
          .replace(/.webp/g, ".jpg");
      } else {
        uni.$tools.uniMsg();
      }
    },
    // 点击图片放大全屏 原生的 api
    preview(i) {
      //需要当前索引以及总共的数组
      uni.previewImage({
        //以后写要注意,否则每一次点击都在循环
        current: i, //造成性能损耗
        urls: this.pics.map((i) => i.pics_big),
      });
    },
    leftButton(e){
        let {text} = e.content;
        if(text=='购物车'){
            uni.switchTab({ url: '/pages/cart/cart' })
        }else if (text == '店铺'){
        
        }
    },
    rightButton(e){
        console.log(e);
    }
  },
};
</script>

<style lang="scss" scoped>
swiper {
  height: 750rpx;

  .pics_item {
    width: 100%;
    height: 100%;
  }
}
.goods_info {
  width: 100%;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  .goods_price {
    height: 100rpx;
    line-height: 100rpx;
    color: red;
    font-size: 36rpx;
    font-weight: bold;
  }
  .goods_name {
    display: flex;
    font-size: 26rpx;
    align-content: center;
    justify-content: space-between;
    .name {
      margin-right: 20rpx;
    }
    .icon {
      width: 240rpx;
      display: flex;
      flex-direction: column;
      font-size: 20rpx;
      align-content: center;
      //justify-content: center;
      text-align: center;
      border-left: 5rpx solid #efefef;
      color: gray;
    }
  }
  .goods_other {
    color: gray;
    margin-top: 55rpx;
    //color: #efefef;
  }
}
.goods_detail_page {
  width: 100%;
  overflow-x: hidden;
  padding-bottom: 100rpx;
}
.goods_footerNav{
    width: 100%;
    position: fixed;
    bottom: 0;

}
</style>