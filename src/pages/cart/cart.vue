<template>
  <div class="cart">cart
    <i class="fa fa-book"></i>
  </div>
</template>

<script>
import tabbar from '../../mixins/tabbar';
import {mapState} from 'vuex';
export default {
  mixins:[tabbar],
  name: "cart",
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('shopCart',['cart'])
  },
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    console.log(this.$store.state.shopCart.obj.name);
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

<style scoped></style>