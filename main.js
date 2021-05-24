import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$apiPath = 'http://lishuo-api.liyangweb.com'
Vue.prototype.ScanAudio = function(){
	var music = null
	music = null
	music = uni.createInnerAudioContext() // 创建播放对象
	music.src = '/static/yinxiao.mp3'
	music.play() // 执行播放
}
	const app = new Vue({
		...App
	})
app.$mount()
