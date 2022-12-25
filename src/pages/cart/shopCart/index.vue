<template>
  <div>
    <!-- 顶部 -->
    <view class="title">
      <!-- icon -->
      <view class="icon">
        <uni-icons type="shop" size="24" />
      </view>
      <!-- 标题文字 -->
      <view class="title_text">
        <text>购物车</text>
      </view>
    </view>
    <!-- 中间 -->
    <view class="body">
      <uni-swipe-action>
          <uni-swipe-action-item class="item" v-for="item in data" :key="item.goods_id" :right-options="option" @click="deleteGoods(item)">
            <div class="flexBox">
              <radio
                @click="onClick(item)"
                color="#ff5847"
                :checked="item.goods_state"
              />
              <!-- 图片 -->
              <div class="img">
                <image :src="item.goods_small_logo" />
              </div>
              <!-- 名称/价格/以及数量 -->
              <div class="goods_info">
                <div class="title">
                  <text>{{ item.goods_name }}</text>
                </div>
                <div class="price">
                  <text> ¥: {{ item.goods_price }} </text>
                  <uni-number-box
                    :min="1"
                    v-model="item.goods_count"
                    @change="changeNum(item)"
                  />
                </div>
              </div>
            </div>
          </uni-swipe-action-item>
      </uni-swipe-action>
    </view>
    <!-- 底部 -->
    <view class="footer">
    </view>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  components: { },
  props: ["data"],
  data() {
    return {
      price: "",
      option: [
        {
          text: "取消",
          style: {
            backgroundColor: "#F56C6C",
          },
        },
      ],
    };
  },
  computed: {
    // 总价 每一个商品的 数量 * 单价
    // 是不是应该,写在 vuex 里面 ?
    // 可是除了购物车,其他页面也不需要这个数据
    ...mapGetters("shopCart", ["getTotalPrice", "getCartCount", "getPrice"]),
  },
  methods: {
    ...mapMutations("shopCart", ["editState", "editNumber","removeGoodsItem"]),
    onClick(item) {
      //勾选修改 vuex 里面的数据
      this.editState(item);
    },
    //修改数量
    changeNum(item) {
      this.editNumber(item);
    },
    //然后是去 vuex 里面把它删掉
    deleteGoods(item) {
        this.removeGoodsItem(item)
    },
  },
  watch: {},
  created() {
    this.price = this.getTotalPrice;
  },
};
</script>

<style lang="scss" scoped>
//@import '@/uni_modules/uni-scss';
@import "../../../uni.scss";

.title {
  display: flex;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 32rpx;
  .title_text {
    margin-left: 18rpx;
  }
}

.body {
  .item {
    display: flex;
    padding: 10rpx;
    height: 280rpx;
    line-height: 280rpx;
    border-top: 3rpx solid #efefef;
    border-block: 3rpx solid #efefef;
    .flexBox {
      display: flex;
      width: auto;
    height: 280rpx;

      .img {
        padding: 3rpx;
        image {
          width: 250rpx;
          height: 250rpx;
        }
      }
      .goods_info {
        margin-left: 15rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: 28rpx;
          line-height: 36rpx;
        }
        .price {
          font-weight: bold;
          color: red;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
</style>