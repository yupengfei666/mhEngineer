(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab2/location"],{"305d":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={components:{},data:function(){return{form:{Longitude:"",Latitude:"",Address:"",UserID:"",Company:"",PID:"",Remark:""},province:"",city:"",district:"",front:[]}},computed:{},methods:{submit:function(){var t=this;console.log(23);var n={info:JSON.stringify(this.form)};this.$myHttp("CustomerService/CheckInLocation",n).then((function(n){console.log(n),t.$refs.uToast.show({title:"更新位置成功",type:"success"}),t.getUserLocation()}))},initUserLocation:function(){var n=this,e={name:t.getStorageSync("name")};this.$myHttp("Main/GetUserInfo",e).then((function(t){n.form.UserID=t.ID,n.getUserLocation()}))},getUserLocation:function(){var t=this,n={userID:this.form.UserID,pageSize:10,pageIndex:1};this.$myHttp("CustomerService/SelectLocation",n).then((function(n){t.front=n.Data,console.log(t.front)}))}},onLoad:function(){this.initUserLocation();var n=this;t.getLocation({type:"gcj02",success:function(e){console.log(e),n.form.Longitude=e.longitude,n.form.Latitude=e.latitude;var o="https://apis.map.qq.com/ws/geocoder/v1/?location="+e.latitude+","+e.longitude+"&key=5TPBZ-I7MWO-67ZWZ-SL7SV-PJTNE-6CFQQ";t.request({url:o,success:function(t){console.log(t),console.log(t.data);var e=t.data.result.address_component;n.form.Address=e.province+e.city+e.district,n.province=e.province,n.city=e.city,n.district=e.district}})},fail:function(t){console.log(t)}})}};n.default=e}).call(this,e("543d")["default"])},6285:function(t,n,e){"use strict";e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return o}));var o={uEmpty:function(){return e.e("uview-ui/components/u-empty/u-empty").then(e.bind(null,"9a8f"))},uForm:function(){return e.e("uview-ui/components/u-form/u-form").then(e.bind(null,"1b72"))},uFormItem:function(){return Promise.all([e.e("common/vendor"),e.e("uview-ui/components/u-form-item/u-form-item")]).then(e.bind(null,"e512"))},uInput:function(){return Promise.all([e.e("common/vendor"),e.e("uview-ui/components/u-input/u-input")]).then(e.bind(null,"77e0"))},uButton:function(){return e.e("uview-ui/components/u-button/u-button").then(e.bind(null,"8862"))},uToast:function(){return e.e("uview-ui/components/u-toast/u-toast").then(e.bind(null,"5355"))}},u=function(){var t=this,n=t.$createElement;t._self._c},i=[]},aac4:function(t,n,e){"use strict";e.r(n);var o=e("305d"),u=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=u.a},d3b8:function(t,n,e){"use strict";(function(t){e("db49");o(e("66fd"));var n=o(e("f216"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},f216:function(t,n,e){"use strict";e.r(n);var o=e("6285"),u=e("aac4");for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);var r,c=e("f0c5"),s=Object(c["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);n["default"]=s.exports}},[["d3b8","common/runtime","common/vendor"]]]);