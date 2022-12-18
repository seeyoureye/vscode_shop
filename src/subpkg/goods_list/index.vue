<template>
  <div class="goods_list">
    <view class="ListBody">
      <view class="goods_items" 
        v-for="item in dataList" 
        :key="item.goods_id" 
        @click="goDetail(item)"
        >
        <!-- 左边的图片 -->
        <view class="leftImg">
          <image
            :src="item.goods_small_logo"
            mode="heightFix" />
        </view>
        <!-- 右边的标题/价格 -->
        <view class="rightText">
          <view class="goods_title">
            <text>{{item.goods_name}}</text>
          </view>
          <view class="goods_price">
            <text>¥ {{item.goods_price}}</text>
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  name: "goods_list",
  components: {},
  props: {},
  data() {
    return {
      queryData:{
        query:'',
        cid:'',
        pagenum:1,
        pagesize:10
      },
      total:'',
      dataList:[],
      timer:null,
    }
  },
  computed: {},
  methods: {
    // 获取数据
    async getData(data){
      this.timer = true;
      let {data:res} = await uni.$API.goods.reqGoodsList(data);
      if(res.meta.status===200){
        this.dataList.push(...res.message.goods);
        this.queryData.pagenum = res.message.pagenum;
        this.total = res.message.total;
        this.timer = false;
      }else{
        uni.$tools.uniMsg();
      }
    },
    // 上划刷新 写了个简单的节流,在请求中不允许再次请求
    onLoading(){
      if(!this.timer){
        this.queryData.pagenum++;
        this.getData(this.queryData);
      }
    },
    // 下拉刷新 重置数据
    onReach(){
      this.dataList = [];
      this.queryData.pagenum = 1;
      this.getData(this.queryData);
    },
    goDetail({goods_id}){
      uni.navigateTo({
        url:'/subpkg/goods_detail/goods_detail?goods_id='+goods_id
      })
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.queryData.query = options.query || '';
    this.queryData.cid = options.cat_id || '';
    this.getData(this.queryData);
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
  onPullDownRefresh() { 
    this.onReach();
    uni.stopPullDownRefresh(); 
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {
    if(this.dataList.length + this.queryData.pagesize >= this.total)return uni.$tools.uniMsg('已经到底了','none');
    this.onLoading()
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
} 
</script>

<style scoped lang="scss">
.goods_list{
  width: 100%;
    overflow-x:hidden ;
}
  .goods_items{
    width: 100%;
    height: 220rpx;
    padding: 10rpx 10rpx;
    display: flex;
    align-content: center;
    .leftImg{
      width: 200rpx;
      height: 200rpx;
      image{
        width: 200rpx;
        height: 200rpx;
      }
    }
    .rightText{
      margin-left: 30rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 32rpx;
      .goods_price{
        color: red;
        font-size: 36rpx;
      }
    }
  }
</style>