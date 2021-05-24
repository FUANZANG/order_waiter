<template>
	<view class="page">
		<view class="title"><text>菜品名称</text></view>
		<view class="body">
			<input class="input" v-model="sendDate.name" placeholder="请输入菜品名称">
		</view>

		<view class="title"><text>价格 (￥)</text></view>
		<view class="body">
			<input type="number" class="input" v-model="sendDate.price" placeholder="请输入菜品价格">
		</view>

		<view class="title"><text>简单说明</text></view>
		<view class="body">
			<input class="input" v-model="sendDate.explain" maxlength="6" placeholder="请输入1-6个字">
		</view>

		<view class="title"><text>分类选择</text></view>
		<view class="body">
			<view class="input">
				<picker @change="bindPickerChange" :value="index" :range="typeList">
					<view class="uni-input">{{typeList[index]}}</view>
				</picker>
			</view>
		</view>

		<view class="title">
			<text>详细说明</text>
			<text class="quick" @tap="chooseMsg">快速键入</text>
		</view>
		<view class="body">
			<textarea class="textarea" placeholder="请输入菜品说明..." v-model="sendDate.content" />
		</view>

		<view class="title">
			<text>上下架 (选中为上架)</text>
			<switch checked color="#5479e3" @change="switchChange" />
		</view>

		<view class="title"><text>菜品序列号</text></view>
		<view class="body"><input class="input" type="number" v-model="sendDate.sort" placeholder="数字越大,顺序越靠后" /></view>

		<view class="title"><text>菜品照片 (大小100k以下)</text></view>
		<view class="body uploader">
			<view class="uploader_head">
				<text class="uni-uploader-title">已选照片</text>
				<text class="uni-uploader-info">({{ imageList.length }}/1)</text>
			</view>
			<view class="uploader_body">
				<view class="uni-uploader__files">
					<block v-for="(image, index) in imageList" :key="index">
						<view class="uni-uploader__file" style="position: relative;">
							<image class="" :src="image" @tap="previewImage"></image>
							<view class="del_img" @click="close(index)">x</view>
						</view>
					</block>
					<view class="uni-uploader__input-box" v-show="imageList.length < 1">
						<view class="uni-uploader__input" @tap="chooseImg"></view>
					</view>
				</view>
			</view>
		</view>
		<button type="primary" class="submit" @tap="send">添加菜品</button>
		<view class="title"><text>添加后直接添加到菜品列表，可在上下架管理中下架该菜品</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeList: ['请选择分类'],
				index: 0,
				msgContents: ['烧烤伴侣', '烤鱼，牛蛙必点配菜', '味甜的味道，给你可口又清爽', '不放任何添加剂，价格实惠，超值！'],
				imageList: [],
				sendDate: {
					name: '',
					price: '',
					explain: '',
					type: '',
					status: 1,
					sort: '',
					content: '',
					image: ''
				},
				typeID: 0,
			}
		},
		onLoad(option) {
			// 获取存入的token
			uni.getStorage({
					key: 'token',
					success: (res) => {
						this.Token = res.data
					}
				}),
				uni.request({
					// 服务端分类接口
					url: this.$apiPath + '?c=type&a=index',
					dataType: 'json',
					success: (res) => {
						const type = res.data.data
						for (var i = 0; i < type.length; i++) {
							this.typeList.push(type[i].name)
						}
					}
				})
			this.index = this.typeID
		},
		methods: {
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.sendDate.type = this.typeList[e.target.value]
				this.typeID = e.target.value
			},
			close(e) {
				this.imageList.splice(e, 1)
			},
			chooseMsg() {
				// 快速输入
				uni.showActionSheet({
					itemList: this.msgContents,
					success: (res) => {
						this.sendDate.content = this.msgContents[res.tapIndex]
					}
				})
			},
			chooseImg() {
				// 选择图片
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: 'compressed',
					count: 8 - this.imageList.length,
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths)
						console.log(res.tempFilePaths[0])
						uni.uploadFile({
							// 上传图片接口
							url: this.$apiPath + '?c=upload&a=uploadImg',
							filePath: res.tempFilePaths[0],
							name: 'img',
							// header:{"Content-Type": "multipart/form-data"},
							success: res => {
								console.log(JSON.parse(res.data).data)
								this.sendDate.image = (JSON.parse(res.data).data.thumb_img)
							},
							fail: (res) => {
								uni.showToast({
									title: '失败',
									icon: 'none'
								})
							}
						})
					}
				})
			},
			previewImage() {
				// 预览图片
				uni.previewImage({
					urls: this.imageList
				})
			},
			// switch改变
			switchChange(e) {
				console.log('switch 发生change事件 携带值为', e.target.value)
				if (e.target.value) {
					this.sendDate.status = 1
				} else {
					this.sendDate.status = 0
				}
			},
			send() {
				console.log(this.sendDate)
				if (this.typeID == 0) {

				}
				// 添加菜品接口
				uni.request({
					url: this.$apiPath + '?m=admin&c=food&a=create',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						token: this.Token,
						name: this.sendDate.name,
						explain: this.sendDate.explain,
						type_id: this.typeID,
						status: this.sendDate.status,
						sort: this.sendDate.sort,
						price: this.sendDate.price,
						content: this.sendDate.content,
						img: this.sendDate.image
					},
					success: res => {
						console.log(res);
						if (res.data.error != 0) {
							uni.showToast({
								title: '添加失败，请检查',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: '添加成功',
								icon: 'none'
							}, 1000)
							this.disabled = true
							setTimeout(() => {
								uni.switchTab({
									url: 'foods'
								})
							}, 1000)
						}
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background: #a1a0b5;
		display: inline-block;
	}

	.title {
		width: 100%;
		height: 65rpx;
		font-size: 28rpx;
		color: #4f496c;
		line-height: 65rpx;
		margin: 0 10rpx;
		background: #a1a0b5;
	}

	.title {
		position: relative;
	}

	switch {
		position: absolute;
		right: 15rpx;
	}

	.quick {
		position: absolute;
		right: 30rpx;
	}

	.body {
		background: #c0c1d9;
		position: relative;
	}

	.body input {
		height: 65rpx;
		margin: 0 10rpx;
	}

	.body picker {
		padding: 10rpx;
	}

	.del_img {
		height: 40rpx;
		line-height: 24rpx;
		text-align: center;
		font-size: 20rpx;
		color: #ccc;
		width: 30rpx;
		height: 30rpx;
		border: 1rpx solid #ccc;
		border-radius: 50%;
		position: absolute;
		left: 190rpx;
		top: -14rpx;
		background-color: red;
	}

	textarea {
		height: 200rpx;
		font-size: 34rpx;
		line-height: 50rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 10rpx 10rpx 0;
	}

	.close-view {
		text-align: center;
		line-height: 14px;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #ff5053;
		color: #ffffff;
		position: absolute;
		top: -6px;
		right: -4px;
		font-size: 12px;
	}

	.uploader {
		padding: 22upx 20upx;
		background-color: #c1c1d9;
	}

	.uni-uploader-head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.uni-uploader-body {
		margin-top: 16upx;
	}

	.uni-uploader__files {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.uni-uploader__file {
		margin: 10rpx;
		width: 210rpx;
		height: 210rpx;
	}

	.uni-uploader__img {
		display: block;
		width: 210rpx;
		height: 210rpx;
	}

	.uni-uploader__input-box {
		position: relative;
		margin: 10rpx;
		width: 208rpx;
		height: 208rpx;
		border: 2rpx solid #d9d9d9;
	}

	.uni-uploader__input-box:before,
	.uni-uploader__input-box:after {
		content: ' ';
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #d9d9d9;
	}

	.uni-uploader__input-box:before {
		width: 4rpx;
		height: 79rpx;
	}

	.uni-uploader__input-box:after {
		width: 79rpx;
		height: 4rpx;
	}

	.uni-uploader__input-box:active {
		border-color: #999999;
	}

	.uni-uploader__input-box:active:before,
	.uni-uploader__input-box:active:after {
		background-color: #999999;
	}

	.uni-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.submit {
		width: 95%;
		bottom: -10rpx;
		margin: 20rpx;
	}


	uni-image {
		width: 100%;
		height: 100%;
		display: inline-block;
		overflow: hidden;
		position: relative;
	}
</style>
