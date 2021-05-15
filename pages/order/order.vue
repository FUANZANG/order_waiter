<template>
	<view class="content">
		<view class="desk">
			<view class="desk_time"></view>
			<view class="desk_name">桌位</view>
			<view class="desk_id">{{desk_id}}</view>
			<view class="desk_status">{{status}}</view>
			<view class="desk_img"><image src="../../static/img/Busy.png" mode=""></image></view>
		</view>
		<view class="desk">
			<view class="desk_time"></view>
			<view class="desk_name">桌位</view>
			<view class="desk_id">{{desk_id}}</view>
			<view class="desk_status">{{status}}</view>
			<view class="desk_img"><image src="../../static/img/Busy.png" mode=""></image></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				desk_id: '1',
				status: '空闲',
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
	page {
		background: #393558;
	}

	.content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.desk {
		width: 40%;
		height: 250rpx;
		margin: 30rpx;
		background: #4f496b;
		border-radius: 30rpx;
		position: relative;
		box-shadow: 0rpx 0rpx 60rpx 0rpx rgba(0, 0, 0, 0.4);
	}

	.desk_time {
		width: 75%;
		height: 10rpx;
		position: absolute;
		top: 15%;
		left: 12%;
		background: #ccc;
	}

	.desk_name {
		position: absolute;
		top: 30%;
		left: 12%;
		color: #ccc;
	}

	.desk_id {
		width: 45%;
		height: 25%;
		font-size: 60rpx;
		font-weight: 500;
		color: #005BBA;
		position: absolute;
		top: 50%;
		left: 12%;
	}

	.desk_status{
		width: 45%;
		height: 25%;
		font-size: 30rpx;
		font-weight: 500;
		color: #ccc;
		position: absolute;
		top: 60%;
		left: 27%;
	}

	.desk_img {
		width: 25%;
		height: 25%;
		position: absolute;
		top: 60%;
		left: 60%;
	}
	.desk_img image{
		width: 100%;
		height: 100%;
	}
</style>
