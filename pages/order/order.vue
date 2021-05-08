<template>
	<view class="content">
		<view class="desk">
			<view>
				123
			</view>
			<view>桌位</view>
			<view>{{desk_id}}{{status}}</view>
			<!-- <image :src="{{image}}"></image> -->
		</view>

		<view class="desk">
			<view>
				123
			</view>
			<view>桌位</view>
			<view>{{desk_id}}{{status}}</view>
			<!-- <image :src="{{image}}"></image> -->
		</view>
		
		<view class="desk">
			<view>
				123
			</view>
			<view>桌位</view>
			<view>{{desk_id}}{{status}}</view>
			<!-- <image :src="{{image}}"></image> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				desk_id: '1',
				status: '空闲'
			}
		},
		// 开始下拉刷新 调用后触发下拉刷新动画
		// onPullDownRefresh() {
		// 	console.log('触发了下拉刷新')
		// 	setTimeout(()=>{
		// 		uni.stopPullDownRefresh()
		// 	},1000)
		// },
		onLoad() {

		},
		methods: {
			// get(){
			// 	uni.request({
			// 		url:
			// 	})
			// }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-wrap: wrap;
		justify-content:space-around;
	}

	.desk {
		width: 40%;
		height: 300rpx;
		margin: 30rpx;
		background: #ccc;
		
	}
</style>
