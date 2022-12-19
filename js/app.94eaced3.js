(()=>{var t={64811:(t,e,a)=>{"use strict";a(66992),a(88674),a(19601),a(17727),a(41539),a(82772);var n=a(27195),o=a(42241),r=(a(74916),a(64765),function(){var t=this,e=t._self._c;return e("div",{staticClass:"home"},[e("header",[e("h1",[t._v("Decentralized Identity on EOS")]),t.authorized?e("div",[e("span",[t._v(t._s(t.auth.actor)+"("+t._s(t.auth.permission)+")")]),e("button",{on:{click:t.logout}},[t._v("Log Out")])]):e("div",[e("button",{on:{click:t.login}},[t._v("Login")])])]),e("div",{staticClass:"search"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.account_name,expression:"account_name"}],attrs:{placeholder:"Search EOS Account",disabled:1==t.search},domProps:{value:t.account_name},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchEOSAccount.apply(null,arguments)},input:function(e){e.target.composing||(t.account_name=e.target.value)}}})]),t.authorized?e("div",{staticClass:"form"},[e("div",[e("span",[t._v("Nickname")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})]),e("div",[e("span",[t._v("Avatar")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.avatar,expression:"avatar"}],domProps:{value:t.avatar},on:{input:function(e){e.target.composing||(t.avatar=e.target.value)}}})]),e("div",[e("span",[t._v("Intro")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.desc,expression:"desc"}],domProps:{value:t.desc},on:{input:function(e){e.target.composing||(t.desc=e.target.value)}}})]),e("button",{on:{click:t.transact}},[t._v("Pay 0.1000 EOS to Confirm")])]):e("div",{staticClass:"account"},[e("img",{attrs:{src:t.avatar}}),e("span",[e("b",[t._v(t._s(t.title))])]),e("span",[t._v(t._s(t.desc))])])])}),i=[],s=a(51907),c=a(85617),u=(a(29254),a(38862),a(58e3)),l=a(68771),d=a(81273);const h={name:"Home",data:function(){return{authorized:!1,auth:void 0,search:0,account_name:"",avatar:"",desc:"",title:"",url:{website:"",telegram:"",twitter:"",wechat:""}}},mounted:function(){this.link=new u.ZP({transport:new l.Z({requestStatus:!1}),rpc:window.apiNode,chainId:window.chainId});var t=window.localStorage.getItem("auth");t?(this.authorized=!0,this.auth=JSON.parse(t)):this.authorized=!1},methods:{login:function(){var t=this;return(0,c.Z)((0,s.Z)().mark((function e(){var a,n;return(0,s.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.link.login("mydapp");case 2:a=e.sent,n=a.session,t.auth=n.auth,t.authorized=!0,window.localStorage.setItem("auth",JSON.stringify(n.auth));case 7:case"end":return e.stop()}}),e)})))()},logout:function(){window.localStorage.removeItem("auth"),this.authorized=!1},searchEOSAccount:function(){var t=this;return(0,c.Z)((0,s.Z)().mark((function e(){var a;return(0,s.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t,e.next=3,window.rpc.get_table_rows({code:window.CONTRACT_NAME,scope:window.CONTRACT_NAME,table:"accounts",lower_bound:t.account_name,limit:1,json:!0}).then((function(t){if(t.rows&&1==t.rows.length){a.avatar=t.rows[0].avatar,a.desc=t.rows[0].desc,a.title=t.rows[0].title;var e=JSON.parse(t.rows[0].url);a.url.website=e.website,a.url.telegram=e.telegram,a.url.twitter=e.twitter,a.url.wechat=e.wechat,a.search=a.authorized?1:0}}));case 3:case"end":return e.stop()}}),e)})))()},transact:function(){var t=this;return(0,c.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.link.transact({actions:t.getActions()}).then((function(t){d.log(t)}))["catch"]((function(t){d.log(t)}));case 1:case"end":return e.stop()}}),e)})))()},getActions:function(){return[{account:"eosio.token",name:"transfer",authorization:[this.auth],data:{from:this.auth.actor,memo:this.account_name,quantity:"0.1000 EOS",to:window.CONTRACT_NAME}},{account:window.CONTRACT_NAME,name:"update",authorization:[this.auth],data:{account_name:this.account_name,avatar:this.avatar,desc:this.desc,modifier:this.auth.actor,title:this.title,url:JSON.stringify(this.url)}}]}}},v=h;var p=a(1001),w=(0,p.Z)(v,r,i,!1,null,"1fb56856",null);const m=w.exports;var f=[{path:"/",name:"home",component:m}],g=new o.ZP({history:!0,mode:"history",routes:f});const _=g;var O=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("div",{attrs:{id:"main_container"}},[e("router-view")],1)])},b=[];const N={name:"Index"},y=N;var k=(0,p.Z)(y,O,b,!1,null,null,null);const x=k.exports;var C=a(35768),Z=a(41413);n.ZP.router=_,n.ZP.use(o.ZP),window.apiNode="https://api.eosn.io",window.chainId=C.ChainName.EOS,window.CONTRACT_NAME="account.info",window.rpc=new Z.pc(window.apiNode,{fetch}),(window.location.href.indexOf("eosaccount.cipherdogs.net")>-1||window.location.href.indexOf("ost:")>-1)&&new n.ZP({render:function(t){return t(x)},el:"#app",router:_})},52361:()=>{},94616:()=>{}},e={};function a(n){var o=e[n];if(void 0!==o)return o.exports;var r=e[n]={id:n,loaded:!1,exports:{}};return t[n].call(r.exports,r,r.exports,a),r.loaded=!0,r.exports}a.m=t,(()=>{var t=[];a.O=(e,n,o,r)=>{if(!n){var i=1/0;for(l=0;l<t.length;l++){for(var[n,o,r]=t[l],s=!0,c=0;c<n.length;c++)(!1&r||i>=r)&&Object.keys(a.O).every((t=>a.O[t](n[c])))?n.splice(c--,1):(s=!1,r<i&&(i=r));if(s){t.splice(l--,1);var u=o();void 0!==u&&(e=u)}}return e}r=r||0;for(var l=t.length;l>0&&t[l-1][2]>r;l--)t[l]=t[l-1];t[l]=[n,o,r]}})(),(()=>{a.n=t=>{var e=t&&t.__esModule?()=>t["default"]:()=>t;return a.d(e,{a:e}),e}})(),(()=>{a.d=(t,e)=>{for(var n in e)a.o(e,n)&&!a.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}})(),(()=>{a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()})(),(()=>{a.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e)})(),(()=>{a.nmd=t=>(t.paths=[],t.children||(t.children=[]),t)})(),(()=>{var t={143:0};a.O.j=e=>0===t[e];var e=(e,n)=>{var o,r,[i,s,c]=n,u=0;if(i.some((e=>0!==t[e]))){for(o in s)a.o(s,o)&&(a.m[o]=s[o]);if(c)var l=c(a)}for(e&&e(n);u<i.length;u++)r=i[u],a.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return a.O(l)},n=self["webpackChunkeosaccount"]=self["webpackChunkeosaccount"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})();var n=a.O(void 0,[998],(()=>a(64811)));n=a.O(n)})();
//# sourceMappingURL=app.94eaced3.js.map