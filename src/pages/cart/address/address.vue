<template>
    <div>
        <view class="chooseAddress" v-if="JSON.stringify(getAddress) === '{}'">
            <button type="primary" size="mini" class="btn" @click="getData">请选择收获地址+</button>
        </view>
        <view class="onAddress" @click="getData" v-else>
            <view class="row_1">
                <view class="name">收货人 : <text>{{getAddress.userName}}</text></view>
                <view class="phone">电话 : <text>{{getAddress.telNumber}}</text> <uni-icons
                    type="arrowright"
                    size="16"
                /></view>
            </view>
            <view class="row_2">
                <view class="title">收货地址 :</view>
                <view class="address">{{getFullAddress}}</view>
            </view>
        </view>
    </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex';
    export default {
        data() {
            return {
               
            }
        },
        methods: {
            ...mapMutations('user',['updateAddress']),
            async getData(){
                const [err,succ] = await uni.chooseAddress().catch(err=>err);
                if(err === null && succ.errMsg == "chooseAddress:ok"){
                    this.updateAddress(succ);
                    uni.setStorageSync('address',JSON.stringify(succ))
                }
                if(err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail autorize no response'))this.reAuth();
            },
            async reAuth(){
                const [err,res] = await uni.showModal({
                    content:'检测到您没有打开地址权限,是否打开?',
                    confirmText:'确认',
                    cancelText:'取消'
                })
                if(err) return;

                if(res.cancel) return uni.$tools.uniMsg('关闭了地址授权');
                if(res.confirm)return uni.openSetting({
                    success(res){
                        if(!res.authSetting['scope.address'])return uni.$tools.uniMsg('取消了授权')
                        if(res.authSetting['scope.address'])return uni.$tools.uniMsg('授权成功')

                    }
                })

            }
        },
        computed: {
            ...mapGetters('user',['getAddress','getFullAddress']),
           
        },
    }
</script>

<style lang="scss" scoped>
.chooseAddress{
    height: 180rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.onAddress{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 180rpx;
    padding: 0 15rpx;
    .row_1{
        display: flex;
        justify-content: space-between;
    }
    .row_2{
        display: flex;
        align-items: center;
        font-size: 32rpx;
        .address{
            margin: 15rpx;
        }
    }
}
</style>