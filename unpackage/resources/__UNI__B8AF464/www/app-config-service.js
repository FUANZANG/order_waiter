
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/order/order","pages/order/ordershow","pages/foods/foods","pages/foods/food_manage","pages/foods/food_add","pages/foods/food_edit"],"window":{"navigationBarTextStyle":"black","navigationBarBackgroundColor":"#a2a0b6","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#8b8893","selectedColor":"#2389b6","backgroundColor":"#50496f","borderStyle":"black","list":[{"text":"订单管理","pagePath":"pages/order/order","iconPath":"static/tabbar/order.png","selectedIconPath":"static/tabbar/order1.png"},{"text":"菜品管理","pagePath":"pages/foods/foods","iconPath":"static/tabbar/food.png","selectedIconPath":"static/tabbar/food1.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"点餐","compilerVersion":"3.1.13","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/order/order","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"订单管理"}},{"path":"/pages/order/ordershow","meta":{},"window":{"navigationBarTitleText":"订单"}},{"path":"/pages/foods/foods","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"菜品管理","bounce":"none","titleNView":{"buttons":[{"fontSrc":"/static/tabbar/iconfont.ttf","text":"   ","fontSize":"18","float":"right","color":"#323458"}]}}},{"path":"/pages/foods/food_manage","meta":{},"window":{"navigationBarTitleText":"菜品管理"}},{"path":"/pages/foods/food_add","meta":{},"window":{"navigationBarTitleText":"添加菜品"}},{"path":"/pages/foods/food_edit","meta":{},"window":{"navigationBarTitleText":"编辑菜品"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
