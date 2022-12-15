<template>
  <div class="mt-25">
    <view class="floor-list" v-for="(item, i) in data" :key="i">
      <view class="floor-item">
        <image :src="item.floor_title.image_src" class="floor_title" />
      </view>
      <view class="floor-img-box">
        <!-- 左 -->
        <view class="leftImg" @click="goPage(item.product_list,0)">
          <image
            :src="item.product_list[0].image_src"
            :style="'width:' + item.product_list[0].image_width + 'rpx;'"
            mode="widthFix"
          />
        </view>
        <!-- 右 -->
        <view class="rightImg" >
          <view v-for="(item2, i2) in item.product_list.slice(1)" :key="i2"
          @click="goPage(item.product_list,i2)">
            <image
              :src="item2.image_src"
              :style="'width:' + item2.image_width + 'rpx;'"
              mode="widthFix"
            />
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let { data: res } = await uni.$API.home.reqFloor();
      if (res.meta.status === 200) {
        this.data = this.setUrl(res.message);
      } else {
        uni.$tools.uniMsg();
      }
    },
    setUrl(data) {
      data.map((m) => {
        if (m.product_list.length) {
          return m.product_list.forEach((arr) => {
            arr.navigatorUrl =
              "/subpkg/goods_list/index?" + arr.navigator_url.split("?")[1];
          });
        }
      });
      return data;
    },
    goPage(item,i){
      let {navigatorUrl} = item[i]
      uni.navigateTo({ url: navigatorUrl })
    }
  },
};
</script>

<style lang="scss" scoped>
.floor_title {
  height: 60rpx;
  width: 100%;
  display: flex;
}
.floor-img-box {
  display: flex;

  .rightImg {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>