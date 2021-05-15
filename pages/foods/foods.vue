<template>
	<view>
		<view class="manage_list">
			<view class="food_manage" @click="onClickFoodManage">
				<image class="manage_img" src="../../static/img/up.png" mode=""></image>
				<view class="manage_name">菜品管理 <br /><i>菜品上下架及编辑菜品</i> </view>
				<view class="manage_go">前往<image src="../../static/img/right.png" mode=""></image>
				</view>
			</view>
			<view class="food_add" @click="onClickFoodAdd">
				<image class="manage_img" src="../../static/img/add.png" mode=""></image>
				<view class="manage_name">添加菜品 <br /> <i>可添加菜品</i> </view>
				<view class="manage_go">前往<image src="../../static/img/right.png" mode="">
				</view>
			</view>
			<view class="food_new" @click="onClickFoodNew">
				<image class="manage_img" src="../../static/img/tj.png" mode=""></image>
				<view class="manage_name">新功能 <br /> <i>敬请期待</i> </view>
				<view class="manage_go">前往<image src="../../static/img/right.png" mode="">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			onClickFoodManage() {
				uni.navigateTo({
						url: './food_manage',
						// 动画类型与时长
						animationType: 'zoom-fade-out',
						animationDuration: 200
					}),
					// 震动反馈
					uni.vibrateShort({
						success: function() {
							console.log('震动反馈');
						}
					});
			},
			onClickFoodAdd() {
				uni.navigateTo({
						url: './food_add',
						// 动画类型与时长
						animationType: 'zoom-fade-out',
						animationDuration: 200
					}),
					// 震动反馈
					uni.vibrateShort({
						success: function() {
							console.log('震动反馈');
						}
					});
			},
			onClickFoodNew() {
				uni.showToast({
					title: '新功能开发中，敬请期待',
					icon: 'none'
				})
			}
		}
	}
</script>

<style>
	page {
		background: #3a3458;
		overflow: auto;
	}

	.food_manage,
	.food_add,
	.food_new {
		width: 80%;
		height: 150rpx;
		padding: 5%;
		margin: 5%;
		border-radius: 30rpx;
		background: #4f496b;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
		box-shadow: 2rpx 2rpx 20rpx #000;
	}

	.food_manage:active,
	.food_add:active,
	.food_new:active {
		transform: translate(2rpx, 2rpx);
	}

	.manage_img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
	}

	.manage_name {
		position: absolute;
		top: 20%;
		left: 220rpx;
		color: #ccc;
		font-size: 35rpx;
	}

	.manage_name i {
		width: 250%;
		position: absolute;
		top: 150%;
		font-style: normal;
		font-size: 29rpx;
		color: #888da7;
	}

	.manage_go {
		position: absolute;
		top: 20%;
		right: 15%;
		color: #888da7;
	}

	.manage_go image {
		position: absolute;
		top: 20%;
		right: -70%;
		width: 15rpx;
		height: 25rpx;
	}
</style>
