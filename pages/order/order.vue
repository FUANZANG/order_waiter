<template>
	<view class="content">
		<view class="desk" v-for="(item, index) in deskList" :key="index" @click="latticeClick(item.id, item.order.id)">
			<view class="desk_time"></view>
			<view class="desk_name">桌位</view>
			<view class="desk_id" :style='{color:textColor(item.id)}'>{{item.id}}</view>
			<view class="desk_status">{{item.status==1?'空闲':'就餐中'}}</view>
			<view class="desk_img">
				<image :src="item.status==1?'../../static/img/Free.png':'../../static/img/Busy.png'" mode=""></image>
			</view>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" title="新订单" :content="msgDeskId + '号桌位有新订单了,是否要查看该订单？'" @confirm="latticeClick(msgDeskId,msgOrderId)">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				deskList: [],
				textColors: ['#00d969', '#1495e7', '#dc4f43', '#b3693c', '#fee082'],
				Token: 0,
				show: false,
				msgDeskId: 0,
				msgOrderId: 0,
				msgType: 'error'
			}
		},
		// 开始下拉刷新 调用后触发下拉刷新动画
		// onPullDownRefresh() {
		// 	console.log('触发了下拉刷新')
		// 	setTimeout(()=>{
		// 		uni.stopPullDownRefresh()
		// 	},1000)
		// },
		onShow() {
			uni.getStorage({
				key: 'token',
				success: res => {
					console.log(11,res)
					this.Token = res.data
				}
			})
			// this.newOrder()
				setInterval(
					function() {
						// 获取最新订单
						uni.request({
							url: this.$apiPath + '?m=admin&c=message&a=one',
							data: {
								token: this.Token
							},
							success: res => {
								// console.log(res.data)
								if (res.data.data != null) {
									this.ScanAudio()
									this.msgDeskId = res.data.data.content.desk_id;
									this.msgOrderId = res.data.data.content.order_id;
									this.show = true;
									this.$refs.alertDialog.open()
									this.newOrder(); //刷新桌位状态
								} else {
									this.newOrder(); //刷新桌位状态
								}
							}
						})
					}.bind(this),1000)
				uni.hideLoading()
		},
		methods: {
			// 查看订单方法 座位状态
			newOrder() {
				uni.request({
					url: this.$apiPath + '?m=admin&c=index&a=desks',
					dataType: 'json',
					data: {
						token: this.Token
					},
					success: res => {
						console.log(res)
						if (res.data.error == 0) {
							this.deskList = res.data.data;
						} else {
							uni.navigateTo({
								url: '/pages/login/login'
							});
						}
					}
				})
			},
			textColor(id) {
				let yushu = id % this.textColors.length
				return this.textColors[yushu]
			},
			latticeClick(id,orderid){
				console.log('座位号'+id,'订单号'+ orderid)
				uni.navigateTo({
					url: '/pages/order/ordershow?desk_id=' + id + '&order_id=' + orderid,
				animationType: 'zoom-fade-out',
				animationDuration: 200
				})
				// 震动反馈
				uni.vibrateShort({
					success:function(){
						console.log('震动反馈')
					}
				})
			}
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

	.desk:active {
		transform: translate(2rpx, 2rpx);
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

	.desk_status {
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

	.desk_img image {
		width: 100%;
		height: 100%;
	}
</style>
