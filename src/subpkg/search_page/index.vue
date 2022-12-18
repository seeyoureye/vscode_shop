<template>
  <div class="goods_list">
    <view class="goods_search_title">
      <uni-search-bar
        class="searchBg"
        @input="input"
        :value="keyword"
        @confirm="enter"
        :focus="inputFocus"
        cancelButton="none"
        placeholder="请输入搜索内容"
        :radius="100"
      />
    </view>
    <scroll-view scroll-y :style="'height:' + screenHeight + 'px'">
      <uni-list v-if="queryList.length">
        <uni-list-item
          showArrow
          :ellipsis="1"
          v-for="item in queryList"
          :key="item.goods_id"
          :title="item.goods_name"
          link="navigateTo"
          :to="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`"
        >
        </uni-list-item>
      </uni-list>
      <view v-else class="historyBox">
        <view class="tag_header"
          ><text>历史记录</text><uni-icons @click.native="deleteTag" type="trash" color="" size="17"
        /></view>
        <view class="tag-view">
          <uni-tag
            class="tag_items"
            v-for="(item, index) in showTag"
            @click="onClickSearch(item)"
            :key="index"
            :inverted="true"
            :text="item"
          />
        </view>
      </view>
    </scroll-view>
  </div>
</template>
  
  <script>
export default {
  name: "goods_list",
  components: {},
  props: {},
  data() {
    return {
      keyword: "",
      screenHeight: 0,
      inputFocus: false,
      timer: null,
      queryList: [], //搜索返回的列表信息
      setList: [],
    };
  },
  computed: {
    //自动去重 并且取反
    showTag() {
      return [...new Set(this.setList)].reverse();
    },
  },
  methods: {
    //设置 页面高度
    getScreenHeight() {
      let { windowHeight } = uni.getSystemInfoSync();
      this.screenHeight = windowHeight - 50;
    },
    // input 的防抖
    input(value) {
      //this.keyword  = value;
        this.queryList = [];
        if (value!='') {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.queryKeyword(value);
        }, 1000);
      }
    },
    enter() {
      this.queryKeyword(this.keyword);
    },
    // 请求
    async queryKeyword(keyword) {
      if (keyword) {
        this.sum(keyword)
        let { data: res } = await uni.$API.goods.reqSearchKeyword(keyword);
        if (res.meta.status === 200) {
          this.queryList = res.message;
        } else {
          uni.$tools.uniMsg();
        }
      }
    },
    //点击 tag 实现搜索功能
    onClickSearch(item) {
      this.keyword = item;
      this.queryKeyword(item);
      //找到点击的值,然后删除掉 再添加回去 居然是数组吗,我还以为是个体呢
      this.sum(item);
      /* let index = this.setList.indexOf(item);
      let temp = this.setList.splice(index,1);
      this.setList.push(...temp); */
    },//让被响应的关键字置顶
    sum(keyword){
      let temp = new Set(this.setList)
        if(temp.has(keyword)){
          temp.delete(keyword);
          temp.add(keyword);
        }else{
          temp.add(keyword)
        }
      this.setList = temp;
      uni.setStorageSync('keyword',JSON.stringify(this.setList));
    },
    deleteTag(){
      this.setList = [];
      uni.removeStorageSync('keyword');
    }
  },
  watch: {
  },
  created() {
    this.getScreenHeight();
    this.setList = JSON.parse(uni.getStorageSync('keyword')) || [];
  },
  mounted() {
    //打开页面自动获取焦点
    //uni.hideHomeButton();
    this.$nextTick(() => {
      this.inputFocus = true;
      //console.log(this.inputFocus);
    });
  },
  // 页面周期函数--监听页面加载
  onLoad() {},
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
};
</script>
  
  <style scoped lang="scss">
.goods_search_title {
  background-color: #ff5847;
}
.historyBox {
  padding: 10rpx;

  .tag_header {
    height: 30rpx;
    display: flex;
    justify-content: space-between;
    line-height: 30rpx;
  }
  .tag-view {
    margin-top: 30rpx;
    display: flex;
    flex-wrap: wrap;
    .tag_items {
      margin: 15rpx;
    }
  }
}
</style>