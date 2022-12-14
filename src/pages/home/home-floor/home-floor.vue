<template>
  <div class="mt-25">
    <view v-for="(item, index) in data" :key="index">
        <view class="floor_title">
            <image
                :src="item.floor_title.image_src"
            />
        </view>
      <view class="floor_box">
        <view v-for="(image, i) in item.product_list" :key="i">
           <image
                    :src="image.image_src"
                    mode="widthFix"
                    :style="`width:${image.image_width}rpx;`"
                />
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
        console.log(res);
        this.data = res.message;
      } else {
        uni.$tools.uniMsg();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.floor_title{
    image{
        height: 60rpx;
    width: 100%;
    }  
    
}
.floor_box {
  width: 100%;
  //height: 500rpx;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2,1fr);
  grid-template-areas:
    "frist" "frist" "second"
    "third" "fourth" "fifth";
    grid-gap:15rpx ;
  & > view:nth-child(1) {
    grid-area: frist;
  }
  & > view {
    justify-self: center;
    }
}
</style>