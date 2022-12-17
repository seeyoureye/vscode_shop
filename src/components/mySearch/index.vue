<template>
  <div class="search_background">
    <view  class="mySearch" @click="onClick">
        <image class="search_icon"
          src="../../static/search.png"
          mode="widthFix"
        />
        <text>请输入搜索内容</text>
    </view>
  </div>
</template>

<script>
export default {
    data() {
        return {
            keyword:'                      我是搜索组件'
        }
    },
    methods:{
        onClick(){
            console.log(this.keyword.trim());
            this.$emit('myclick')
        }
    },
};
</script>

<style lang="scss" scoped>
.search_background {
  background-color: #ff5847;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100rpx;
  .mySearch {
    height: 70rpx;
    width: 95%;
    border-radius: 45rpx;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    .search_icon{
      width: 40rpx;
      margin-right: 5rpx;
    }
  }
}
</style>