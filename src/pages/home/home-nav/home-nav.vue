<template>
    <div>
        <view class="home_nav mt-15">
            <view class="nav_item" @click="goNav(item)" v-for="(item,index) in navList" :key="index">
                <image 
                    :src="item.image_src"
                    mode="scaleToFill"
                />
            </view>
        </view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navList:[]
            }
        },
        methods: {
            async getData(){
                let {data:res} = await uni.$API.home.reqNav();
                if(res.meta.status === 200){
                    //console.log(res);
                    this.navList = res.message;
                }else{
                    uni.$tools.uniMsg();
                }
            },
            goNav(item){
                if(item.name == '分类'){
                    uni.switchTab({
                        url:'/pages/cate/cate'
                    })
                }
            }
        },
        created() {
            this.getData()
        },
    }
</script>

<style lang="scss" scoped>
.home_nav {
    display: flex;
    justify-content: space-evenly;
    .nav_item{
        width: 128rpx;
        height: 140rpx;
        image{
            width: 100%;
            height: 100%;
        }
    }
}
</style>