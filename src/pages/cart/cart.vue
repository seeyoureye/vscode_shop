<template>
  <div class="cart">
    <div v-if="getCartData.length">
      <!-- 地址栏 -->
      <Address/>
      <!-- 购物车本体 -->
      <shopCart :data="getCartData" />
      <!-- 底部栏 -->
      <Footer/>
    </div>
    <!-- 无数据时的页面 -->
    <div class="box" v-else>
      <text>空空如也</text>
    </div>
  </div>
</template>

<script>
import tabbar from '../../mixins/tabbar';
import {mapState,mapGetters} from 'vuex';
import shopCart from './shopCart/index.vue';
import Address from './address/address.vue';
import Footer from './shopCartFooter/footer.vue';
export default {
  mixins:[tabbar],
  name: "cart",
  components: { shopCart, Address, Footer },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('shopCart',['cart']),
    ...mapGetters('shopCart',['getCartData'])
  },
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
} 
</script>

<style lang="scss" scoped>
.cart{
  padding-bottom: 100rpx;

  .box{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>