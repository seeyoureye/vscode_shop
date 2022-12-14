<template>
    <div>
        <!-- 轮播图 -->
        <home-swiper></home-swiper>
        <!-- 导航 -->
        <home-nav></home-nav>
        <!-- 楼层 -->
        <home-floor></home-floor>
    </div>
</template>

<script>
import HomeFloor from './home-floor/home-floor.vue'
import HomeNav from './home-nav/home-nav.vue'
import homeSwiper from './home-swiper/home-swiper.vue'
    export default {
        components: { homeSwiper, HomeNav, HomeFloor },
        
    }
</script>

<style lang="scss">
.mt-15{
    margin-top: 15rpx;
}
.mt-25 {
    margin-top: 25rpx;

}
</style>