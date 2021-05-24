<template>
	<view>
		<view class="list">
			<view class="list_left">
				<scroll-view scroll-y="true" :style="{height:scrollHeight}">
					<view class="item" v-for="(item,index) in typeList" :data-id="item.id" :key="index"
						:class="{active:index == leftIndex}" @tap="leftTap">
						{{item.name}}
					</view>
				</scroll-view>
			</view>
			<view class="list_right">
				<!-- current 滑块所在的index vertical 滑块是否为纵向 duration 滑块动画时长 -->
				<swiper class="swiper" :style="{height:scrollHeight}" :current="leftIndex" @change="swiperChange"
					vertical="true" duration="300">
					<swiper-item v-for="(item, index) in typeList" :key="index">
						<scroll-view scroll-y="true">
							<view class="swiper-item">
								<!-- 当前标签页标题 -->
								<view class="item_title">
									<view>{{item.name}}</view>
								</view>
								<!-- 菜品列表 -->
								<view class="goods" v-for="(item, index) in foodsList" :key="index">
									<image :src="item.img"></image>
									<view>
										<view class="goods_name">{{item.name}}</view>
										<view class="goods_price">￥{{item.price}}</view>
									</view>
									<view class="goods_btn">
										<button class="btn _del"
											@tap="revise(item.id, item.status, index)">{{ item.status | brand }}</button>
										<button class="btn _edit" @tap="edit(item.id,item.type_id)">编辑</button>
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
				typeList: [],
				foodsList: [],
				scrollHeight: '500px',
				zhuangtai: 1,
				Token: 0,
				test: 1,
				leftIndex: 0,
			}
		},
		methods: {
			/* 左侧导航点击 */
			leftTap(e) {
				let index = e.currentTarget.dataset.index;
				this.leftIndex = Number(index);
				this.getFoodsList(e.currentTarget.dataset.id);
			},
			/* 轮播图切换 */
			swiperChange(e) {
				this.getFoodsList(this.typeList[e.detail.current].id);
				let index = e.detail.current;
				this.leftIndex = Number(index);
			},
			getFoodsList(typeId) {
				uni.request({
					//菜品接口
					url: this.$apiPath + '?m=admin&c=food&a=index',
					data: {
						token: this.Token,
						type_id: typeId
					},
					success: res => {
						this.foodsList = res.data.data;
					}
				});
			},
			revise(foodID, status, index) {
				this.change = !this.change;
				console.log(this.change);
				if (this.foodsList[index].status == 1) {
					this.foodsList[index].status = 0;
				} else {
					this.foodsList[index].status = 1;
				}
				//修改菜品状态接口
				uni.request({
						url: this.$apiPath + '?m=admin&c=index&a=foodStatus',
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: {
							token: this.Token,
							food_id: foodID,
							status: this.foodsList[index].status
						},
						success: res => {
							console.log(res);
						}
					}),
					// 振动反馈
					uni.vibrateShort({
						success: function() {
							console.log('上下架按钮震动反馈');
						}
					});
			},
			edit(foodId, typeId) {
				uni.redirectTo({
					url: 'food_edit?food_id=' + foodId + '&type_id=' + typeId
				});

				// 振动反馈
				uni.vibrateShort({
					success: function() {
						console.log('编辑按钮震动反馈');
					}
				});
			}
		},
		onShow() {
			this.$forceUpdate() //强制刷新
		},
		onLoad() {
			// 获取存入的token
			uni.getStorage({
				key: 'token',
				success: (res) => {
					this.Token = res.data
				}
			})
			uni.request({
				//服务端分类接口
				url: this.$apiPath + '?c=type&a=index',
				dataType: 'json',
				success: res => {
					this.typeList = res.data.data;
					// console.log(res.data.data[0].id)
					this.getFoodsList(res.data.data[0].id);
				}
			})
			// 设置当前滚动容器的高
			uni.getSystemInfo({
				success: res => {
					this.scrollHeight = `${res.windowHeight}px`;
				}
			})
		},
		filters: {
			brand(val) {
				var brand;
				if (val == 0) {
					brand = '已下架';
				} else if (val == 1) {
					brand = '下架';
				}
				return brand;
			}
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

	.list_left {
		width: 176rpx;
		color: #888888;
		background-color: #3a3650;
		line-height: 97rpx;
		box-sizing: border-box;
		font-size: 29rpx;
	}

	.item {
		padding-left: 20rpx;
		position: relative;
	}


	.item:not(:first-child) {
		margin-top: 1px;
	}

	.item::after {
		content: '';
		display: block;
		height: 0;
		border-top: #d6d6d6 solid 1px;
		width: 620rpx;
		position: absolute;
		top: -1px;
		right: 0;
		transform: scaleY(0.5);
		/* 1px像素 */
	}

	.item.active,
	.item:active {
		background-color: #4f496c;
		border-left: #0d8ada 10rpx solid;
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

	.item_title {
		line-height: 64rpx;
			font-size: 24rpx;
			font-weight: bold;
			color: #232323;
			background-color: #4f496c;
			position: sticky;
			top: 0;
			z-index: 999;
	}

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
