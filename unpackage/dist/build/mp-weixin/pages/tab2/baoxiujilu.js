(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab2/baoxiujilu"],{"21de":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var o={uCard:function(){return n.e("uview-ui/components/u-card/u-card").then(n.bind(null,"5245"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"8862"))},uTag:function(){return n.e("uview-ui/components/u-tag/u-tag").then(n.bind(null,"4ecf"))},uBadge:function(){return n.e("uview-ui/components/u-badge/u-badge").then(n.bind(null,"cfcf"))},uLoadmore:function(){return n.e("uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"bd61"))},uModal:function(){return n.e("uview-ui/components/u-modal/u-modal").then(n.bind(null,"068e"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-input/u-input")]).then(n.bind(null,"77e0"))},uToast:function(){return n.e("uview-ui/components/u-toast/u-toast").then(n.bind(null,"5355"))}},i=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"34f4":function(t,e,n){"use strict";n.r(e);var o=n("21de"),i=n("e9ee");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("e42f");var u,r=n("f0c5"),s=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=s.exports},"51db":function(t,e,n){"use strict";(function(t){n("db49");o(n("66fd"));var e=o(n("34f4"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},9435:function(t,e,n){"use strict";(function(t){function n(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=o(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var i=0,a=function(){};return{s:a,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u,r=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return r=t.done,t},e:function(t){s=!0,u=t},f:function(){try{r||null==n.return||n.return()}finally{if(s)throw u}}}}function o(t,e){if(t){if("string"===typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(t,e):void 0}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{status:"loadmore",loadText:{loadmore:"点击或上拉加载更多",loading:"努力加载中",nomore:"实在没有了"},pageCount:10,pages:1,selectData:[],showData:[],showDetailVisible:!1,showDelete:!1,deleteItemId:"",complete:{show:!1,data:{},content:"已完成"},tabList:[{name:"全部"},{name:"未接单",count:1},{name:"进行中",count:0},{name:"已完成"}],current:0,type:0}},computed:{},methods:{copyId:function(e){t.setClipboardData({data:e,success:function(){}})},openCompleteM:function(t){this.complete.show=!0,this.complete.data=t},completeSubmit:function(){var t=this;if(this.complete.content){this.complete.data.ProductType=JSON.stringify(this.complete.data.ProductTypeArr),this.complete.data.ReMark=this.complete.content;var e={info:JSON.stringify(this.complete.data),type:4};this.$myHttp("Order/UpdateOrder",e).then((function(e){console.log(e),t.$refs.uToast.show({title:"完成了订单",type:"success"}),t.initData()}))}else this.$refs.uToast.show({title:"请填写具体内容",type:"error"})},change:function(t){this.current=t},deleteOk:function(){this.initData()},deleteItem:function(t){this.deleteItemId=t,this.showDelete=!0},showDetail:function(t){this.showData=t,this.showDetailVisible=!0},rate:function(e){t.navigateTo({url:"../tab2/bxrate?id="+e})},shift:function(e){t.navigateTo({url:"../tab2/bxshift?data="+JSON.stringify(e)})},message:function(e){t.navigateTo({url:"../tab2/bxmessage?id="+e})},accept:function(t){var e=this;t.ProductType=JSON.stringify(t.ProductTypeArr);var n={info:JSON.stringify(t),type:2};this.$myHttp("Order/UpdateOrder",n).then((function(t){console.log(t),e.$refs.uToast.show({title:"接单成功",type:"success"}),e.initData()}))},progress:function(e){t.navigateTo({url:"../tab2/bxtimeline?id="+e})},detailItem:function(e){e.Describe=encodeURIComponent(e.Describe),t.navigateTo({url:"../tab2/baoxiudetail?data="+JSON.stringify(e)})},getData:function(){var e=this,o={OrderID:"all",pageSize:this.pageCount,pageIndex:this.pages,repairsStatus:this.type};this.$myHttp("Order/SelectOrder",o).then((function(t){console.log(t);var o,i=n(t.Data);try{for(i.s();!(o=i.n()).done;){var a=o.value;a.ProductTypeArr=JSON.parse(a.ProductType||"[]"),e.selectData.push(a)}}catch(u){i.e(u)}finally{i.f()}e.status=e.selectData.length===t.Total?"nomore":"loadmore"})),t.stopPullDownRefresh()},getNextData:function(){this.pages=this.pages+1,this.status="loading",this.getData()},initData:function(){this.selectData=[],this.pages=1,this.getData()}},onPullDownRefresh:function(){this.initData()},onReachBottom:function(){this.getNextData()},onReady:function(){},onShow:function(){2!=this.type&&this.initData()},onLoad:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.type=e.type;var n="";n=0==this.type?"未接单":1==this.type?"进行中":"已完成",t.setNavigationBarTitle({title:n}),2==this.type&&this.initData()}};e.default=a}).call(this,n("543d")["default"])},dda8:function(t,e,n){},e42f:function(t,e,n){"use strict";var o=n("dda8"),i=n.n(o);i.a},e9ee:function(t,e,n){"use strict";n.r(e);var o=n("9435"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a}},[["51db","common/runtime","common/vendor"]]]);