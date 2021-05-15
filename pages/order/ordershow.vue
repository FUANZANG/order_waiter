<template>
	<view>
		<view class="order_time">
			<image src="../../static/img/clock.png"></image>
			<text>{{time}}</text>
		</view>
		<view class="order_list">
			<view class="list">
				<image class="list_img" src="../../static/type/haidai.png" mode=""></image>
				<view class="list_name">香辣海苔 <br /> <i>数量: 1</i> </view>
				<view class="list_price">￥178.00</view>
			</view>
			<view class="list">
				<image class="list_img" src="../../static/type/haidai.png" mode=""></image>
				<view class="list_name">香辣海苔 <br /> <i>数量: 1</i> </view>
				<view class="list_price">￥178.00</view>
			</view>
		</view>
		<view class="footer">
			<view class="foot_price">合计:<i>￥ {{foot_price}}</i> </view>
			<button class="foot_change">修改订单</button>
			<button class="foot_bill">结算</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time: '2021-5-9 14:00:00',
				list: [],
				foot_price:300
			}
		}
	}
</script>

<style>
	page {
		background: #3d3658;
		height: 100%;
		overflow: auto;
	}

	.order_time {
		width: 50%;
		height: 30rpx;
		margin: 2% 5%;
	}

	.order_time text {
		margin-left: 5%;
		font-size: 30rpx;
		color: #ccc;
	}

	.order_time image {
		width: 35rpx;
		height: 35rpx;
		vertical-align: bottom;
	}

	.order_list {
		width: 90%;
		height: auto;
		margin: 5%;
		border-radius: 20rpx;
		background: #8a8aa2;
	}

	.list {
		width: 80%;
		height: 150rpx;
		padding: 3%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative
	}

	.list_img {
		width: 180rpx;
		height: 150rpx;
		border-radius: 10rpx;
	}

	.list_name {
		position: absolute;
		top: 20%;
		left: 220rpx;
		font-size: 45rpx;
		font-weight: 700;
	}

	.list_name i {
		font-style: normal;
		font-size: 30rpx;
		color: #888da7;
	}

	.list_price {
		font-weight: 700;
		position: absolute;
		top: 90rpx;
		right: -50rpx;
	}

	.footer {
		width: 80%;
		height: auto;
		margin: 0 10%;
		position: relative;
		border-top: 7rpx solid #4c4668;
	}

	.foot_price {
		font-weight: 700;
		color: #1171b6;
		position: absolute;
		top: 15rpx;
		right: -15rpx;
	}
	
	.foot_price i{
		font-style: normal;
		color: #893149;
	}

	.foot_change {
		width: 180rpx;
		height: 62rpx;
		line-height: 50rpx;
		padding: 0 22rpx;
		border: 7rpx solid #2e6187;
		border-radius: 7rpx;
		font-weight: 700;
		font-size: 30rpx;
		color: #2e6187;
		background: #393459;
		position: absolute;
		top: 80rpx;
		right: 200rpx;
		box-shadow: 2rpx 2rpx 10rpx #000;
	}

	.foot_change.button-hover {
		transform: translate(2rpx, 2rpx);
	}

	.foot_bill {
		width: 180rpx;
		height: 62rpx;
		line-height: 50rpx;
		padding: 0 22rpx;
		border: 7rpx solid #913b4d;
		border-radius: 7rpx;
		font-weight: 700;
		font-size: 30rpx;
		color: #913b4d;
		background: #393459;
		position: absolute;
		top: 80rpx;
		right: -10rpx;
		box-shadow: 2rpx 2rpx 10rpx #000;
	}

	.foot_bill.button-hover {
		transform: translate(2rpx, 2rpx);
	}
</style>
