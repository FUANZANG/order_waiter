<template>
	<view>
		<view class="order_time">
			<image src="../../static/img/clock.png"></image>
			<text>{{order_time}}</text>
		</view>
		<view class="order_list">
			<view class="list" v-for="(item,index) in formList" :key="index">
				<image class="list_img" :src="item.img"></image>
				<view class="list_name">{{item.name}} <br /> <i>数量: {{item.num}}</i> </view>
				<view class="list_price">￥{{item.food_price}}</view>
				<transition name="fade">
					<image src="../../static/img/del.png" class="del_img" :class="{open:display}"
						@click="del(item,index)"></image>
				</transition>
			</view>
		</view>
		<view class="footer">
			<view class="foot_price">合计:<i>￥ {{total_price}}</i> </view>
			<button class="foot_change" @click="revise()">{{text}}</button>
			<button class="foot_bill" @click="Settlement()">结算</button>
		</view>
		<!-- 提示窗示例 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" title="结算该订单" content="是否要结算该订单？此操作无法取消!" @confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId: null,
				order_time: '',
				list: [],
				total_price: {},
				text: "修改订单",
				show: false,
				Token: 0,
				display: true,
				msgType: 'error'
			}
		},
		onLoad(option) {
			uni.getStorage({
				key: 'token',
				success: (res) => {
					this.Token = res.data
				}
			});
			console.log(option.desk_id)
			console.log(option.order_id)
			this.orderId = option.order_id
			//调用查看订单接口
			this.lookOrder(option.order_id);
		},
		computed: {
			// 过滤器 过滤菜品个数为0
			formList: function() {
				return this.list.filter(function(item) {
					if (item.num != 0) {
						return item
					}
				})
			}
		},
		methods: {
			revise() {
				this.display = !this.display
				if (this.text == '修改订单') {
					this.text = '确认'
				} else {
					this.text = '修改订单'
				}
				// 震动反馈
				uni.vibrateShort({
					success: function() {
						console.log('success');
					}
				});
			},
			lookOrder(order_id) {
				// 服务端查看订单接口
				uni.request({
					url: this.$apiPath + "?m=admin&c=index&a=order",
					dataType: 'json',
					data: {
						order_id: order_id,
						token: this.Token
					},
					success: (res) => {
						console.log(res)
						this.list = res.data.data.order_detail
						console.log(this.list)
						this.order_time = res.data.data.start_time
						console.log(this.order_time)
						this.total_price = res.data.data.price
					}
				})
			},
			del(item, index) {
				var orderId = item.order_id
				var orderDetailId = item.id
				uni.request({
					url: this.$apiPath + "?m=admin&c=index&a=changeOrderNum",
					method: 'POST',
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					data: {
						token: this.Token,
						order_id: orderId,
						action: "decr",
						order_detail_id: orderDetailId
					},
					success: (res) => {
						if (res.data.error == 0) {
							item.num -= 1
							this.list.splice(index, 1, item)
							this.lookOrder(orderId) // 数量变化后更新总价
						} else {
							alert(res.data.msg)
						}
					}
				})
			},
			Settlement() {
				this.$nextTick(() => {
					this.$refs.alertDialog.open()
				})
				console.log('结算')
				this.show = true
				// 震动反馈
				uni.vibrateShort({
					success: function() {
						console.log('success');
					}
				});
			},
			confirm() {
				uni.request({
					url: this.$apiPath + "?m=admin&c=index&a=changeOrderStatus",
					dataType: 'json',
					method: 'POST',
					header: {
						// 对于 POST 方法且 header['content-type'] 为 application/x-www-form-urlencoded 的数据，会将数据转换为 query string
						"content-type": "application/x-www-form-urlencoded"
					},
					data: {
						order_id: this.orderId,
						status: 1,
						token: this.Token
					},
					success: (res) => {
						if (res.data.error != 0) {
							alert(res.data.msg)
						} else {
							// 修改订单状态并跳转
							uni.navigateBack({
								url: 'pages/order/order'
							})
						}
					}
				})
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
	}

	.list_price {
		font-weight: 700;
		position: absolute;
		top: 90rpx;
		right: -10rpx;
	}


	.open {
		visibility: hidden;
		opacity: 0;
		transition: 0.5s;
	}

	.del_img {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		right: -74rpx;
		bottom: 57rpx;
	}

	.del_img:active {
		transform: translate(2rpx, 2rpx);
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

	.foot_price i {
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
