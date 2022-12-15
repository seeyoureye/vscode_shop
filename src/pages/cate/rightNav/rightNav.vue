<template>
  <div class="Listview">
   <view v-for="(item) in rightData" :key="item.cat_id">
     <!-- 头部 -->
     <view class="title">
      <text>{{item.cat_name}}</text>
    </view>
    <!-- 循环的具体位置 每行 3 个 -->
    <view class="body">
      <view class="body_item" @click="goPage(cate.cat_id)" v-for="cate in item.children" :key="cate.cat_id">
        <image
          class="item_img"
          :src="cate.cat_icon.replace('dev','web')"
          mode="widthFix"
        />
        <text>{{cate.cat_name}}</text>
      </view>
    </view>
   </view>
  </div>
</template>

<script>
    export default {
        props:['rightData'],
        methods: {
          goPage(id){
            uni.navigateTo({
              url:`/subpkg/goods_list/index?cat_id=${id}`
            })
          }
        },
    }
</script>

<style lang="scss" scoped>
.Listview{
    width: 100%;

    .title {
      width: 100%;
      height: 60rpx;
      text-align: center;
      line-height: 60rpx;
    }
    .body{
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .body_item{
        width: 180rpx;
        height: 180rpx;
        font-size: 18rpx;
        display: flex;
        flex-direction: column;
        //justify-content: center;
        .item_img{
          width: 80%;
          align-self: center;
        }
        text {
          text-align: center;
        }
      }
    }
}
</style>