<template>
  <div>
    <swiper class="swiperHeader" indicator-dots autoplay circular>
      <swiper-item v-for="item in swiperList" :key="item.goods_id">
        <image :src="item.image_src" mode="scaleToFill" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [],
    };
  },
  methods: {
    async getData() {
      let { data: res } = await uni.$API.home.reqSwiper();
      if (res.meta.status === 200) {
        this.swiperList = res.message;
        //console.log(res.message);
      } else {
        uni.$tools.uniMsg();
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.swiperHeader {
  height: 320rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>