<template>
  <div>
    <mySearch @myclick="goSearchPage"></mySearch>
    <scroll-view scroll-y :style="'height:'+screenHeight+'px'">
      <!-- 轮播图 -->
      <home-swiper></home-swiper>
      <!-- 导航 -->
      <home-nav></home-nav>
      <!-- 楼层 -->
      <home-floor></home-floor>
    </scroll-view>
  </div>
</template>
    
    <script>
import tabbar from '../../mixins/tabbar';
import mySearch from "../../components/mySearch/index.vue";
import HomeFloor from "./home-floor/home-floor.vue";
import HomeNav from "./home-nav/home-nav.vue";
import homeSwiper from "./home-swiper/home-swiper.vue";
export default {
  mixins:[tabbar],
  components: { homeSwiper, HomeNav, HomeFloor, mySearch },
  data() {
    return {
      screenHeight: 0,
    };
  },
  methods: {
    goSearchPage() {
      uni.navigateTo({
        url: "/subpkg/search_page/index",
      });
    },
    getScreenHeight() {
      let { windowHeight } = uni.getSystemInfoSync();
      this.screenHeight = windowHeight - 50;
    },
  },
  created() {
    this.getScreenHeight();
  },
};
</script>
    
    <style lang="scss">
.mt-15 {
  margin-top: 15rpx;
}
.mt-25 {
  margin-top: 25rpx;
}
</style>