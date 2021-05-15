<template>
	<view>
		<view class="list">
			<view class="list_left">
				<scroll-view scroll-y="true">
					<view class="item">
						菜品分类
					</view>
				</scroll-view>
			</view>
			<view class="list_right">
				<!-- current 滑块所在的index vertical 滑块是否为纵向 duration 滑块动画时长 -->
				<swiper class="swiper" :style="{height:scrollHeight}">
					<swiper-item>
						<scroll-view scroll-y="true">
							<view class="swiper-item">
								<!-- 当前标签页标题 -->
								<view class="item_title">
									<view>name</view>
								</view>
								<!-- 菜品列表 -->
								<view class="goods">
									<image src="../../static/type/bbz.png" mode=""></image>
									<view>
										<view class="goods_name">name</view>
										<view class="goods_price">￥price</view>
									</view>
									<view class="goods_btn">
										<button class="btn _del">下架</button>
										<button class="btn _edit">编辑</button>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollHeight: '500px'
			}
		},
		methods: {

		}
	}
</script>

<style>
	page {
		background: #4f496b;
		overflow: auto;
	}

	.list {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		font-size: 30rpx;
	}

	.item {
		padding-left: 20rpx;
		position: relative;
	}

	.list_left {
		width: 176rpx;
		color: #888888;
		background-color: #3a3650;
		line-height: 97rpx;
		box-sizing: border-box;
		font-size: 29rpx;
	}

	.list_right {
		width: 0;
		flex-grow: 1;
		box-sizing: border-box;
		color: #fffae8;
		background-color: #4f496c;
		padding-left: 20rpx;
	}

	.swiper {
		height: 500px
	}

	.swiper-item {
		padding-bottom: 10rpx
	}

	.item_title {}

	.goods {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		margin-bottom: 10rpx;
		position: relative
	}

	.goods image {
		width: 150rpx;
		height: 150rpx;
		margin-right: 16rpx;
		border-radius: 20rpx
	}

	.goods_name {
		font-size: 32rpx;
		position: absolute;
		font-weight: 700;
		top: 5rpx
	}

	.goods_price {
		font-size: 30rpx;
		color: #efba21;
		position: absolute;
		right: 285rpx;
		bottom: 13rpx;
	}

	.goods_btn {
		display: flex;
		justify-content: flex-end;
		position: absolute;
		right: 30rpx;
	}

	.btn {
		width: 100rpx;
		height: 45rpx;
		padding: 0;
		text-align: center;
		font-size: 28rpx;
		font-weight: 700;
		line-height: 45rpx;
		border-radius: 6rpx;
	}

	._del {
		background: #4f496c;
		color: #0d8ada;
		border: 3rpx solid #0d8ada;
		margin-right: 6rpx;
	}

	._edit {
		background: #4f496c;
		color: #00aa00;
		border: 3rpx solid #00aa00;
	}

	.btn.button-hover {
		transform: translate(2rpx, 2rpx);
	}
</style>
