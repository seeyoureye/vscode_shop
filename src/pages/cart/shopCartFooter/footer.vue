<template>
    <div class="footer">
        <label class="checkbox">
            <radio
                color="#ff5847"
                :checked="getState"
                @click="editState"
            /><text>全选</text>
        </label>
        <view class="price">
            合计:<text>¥:{{getPrice}}</text>
        </view>
        <view class="btn">结算({{checkGoods}})</view>
    </div>
</template>

<script>
import { tr } from '@dcloudio/vue-cli-plugin-uni/packages/postcss/tags';
import {mapGetters,mapMutations} from 'vuex';
    export default {
        props:['price'],
        computed: {
            ...mapGetters('shopCart',['checkGoods','getPrice','getState','getCartData'])
        },
        methods: {
            ...mapMutations('shopCart',['editFullState','bindState']),
            editState(){
                this.editFullState();
            }
        },
        watch: {
            checkGoods:{
                immediate:true,
                handler(nowv,oldv){
                    this.bindState(nowv === this.getCartData.length)
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.footer{
    height: 100rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #efefef;
    z-index: 99;
    .checkbox{
        padding-left: 5rpx;
        display: flex;
        align-items: center;
    }
    .price{
        color: red;
    }
    .btn{
        background-color: red;
        height: 100%;
        width: 180rpx;
        line-height: 100rpx;
        text-align: center;
        color: white;
    }
}
</style>