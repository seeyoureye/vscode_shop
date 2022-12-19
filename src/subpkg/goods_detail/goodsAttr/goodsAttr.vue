<template>
    <div>
        <uni-table :border="true" emptyText="商品属性">
        </uni-table>
        <uni-table :border="true">   
            <uni-tr v-for="a in attr" :key="a.attr_id">
            <uni-td>
                <view>{{a.attr_name}}</view>
            </uni-td>
            <uni-td>
                <view>{{a.attr_vals}}</view>
            </uni-td>
            </uni-tr>
            
        </uni-table>
    </div>
</template>

<script>
    export default {
        props:['attr'],
    }
</script>

<style lang="scss" scoped>
.titile{
    width: 375rpx;
    align-content: center;
}
</style>