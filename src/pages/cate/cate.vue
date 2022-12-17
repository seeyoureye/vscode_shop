<template>
 <div>
  <mySearch @myclick="goSearchPage"></mySearch>
  <div class="cate" :style="'height:'+screenHeight+'px'">
    <!-- 左侧 -->
    <scroll-view scroll-y class="left_Nav">
        <view class="left_Nav_item" @click="onClick(cate,i)"
          :class="[active == i ? 'active' : '']"
          v-for="(cate,i) in cateList" 
          :key="cate.cat_id">
          <text>{{cate.cat_name}}</text>
        </view>
    </scroll-view>
    <!-- 右侧 -->
    <scroll-view 
      scroll-y class="right_Nav" 
      :scroll-top="tempState ? 1 : 0"><!-- 每次点击,取反 然后根据正反来让置顶是 0/1 -->
      <rightNav :rightData="rightData"></rightNav>
    </scroll-view>
  </div>
 </div>
</template>

<script>
import rightNav from './rightNav/rightNav';
import mySearch from '../../components/mySearch';
export default {
  components: { rightNav,mySearch },
  name: "cate",
  props: {},
  data() {
    return {
      cateList:[],//整体遍历使用的数据
      rightData:[],//每次点击时右边新替换的数据
      screenHeight:0,
      active:0,
      tempState:false,
    }
  },
  computed: {
    scrollTo(){
    }
  },
  methods: {
    async getData(){
      let {data:res} = await uni.$API.cate.reqCateList();
      if(res.meta.status === 200){
        this.cateList = res.message;
        this.rightData = res.message[0].children;
        //console.log(this.rightData);
      }else{
        uni.$tools.uniMsg();
      }
    },
    getScreenHeight(){
      let {windowHeight} = uni.getSystemInfoSync();
      this.screenHeight = windowHeight-50;
    },
    onClick(item,index){
      this.active = index;
      let {children} = item;
      this.rightData = children;
      //每次点击,做出判断 让它变成 true 执行一次回到顶部
      this.tempState = !this.tempState;
    },
    goSearchPage(){
      //console.log('213');
      uni.navigateTo({
        url:'/subpkg/search_page/index'
      })
    }
  },
  watch: {
  },

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getData();
    this.getScreenHeight();
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

<style lang="scss">
  .cate{
    display: flex;

    .left_Nav{
      width: 30vw;
      height: 100%;
      background-color: rgb(246, 244, 244);
      .left_Nav_item {
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 24rpx;

        &.active{
          background-color: #fff;
          position: relative;
          &::before {
            content: '';
            display: block;
            width: 7rpx;
            height: 70rpx;
            background-color: #c00;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    .right_Nav{
      //width: 65vw;
      padding-left: 28rpx;
      height: 100%;
    }
  }
</style>