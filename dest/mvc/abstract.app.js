define([],function(){return _.inherit({propertys:function(){this.viewRootPath="app/views/",this.defaultView="index",this.request,this.viewId,this.mainframe,this.viewport,this.views={},this.curView,this.lastView,this.isCreate=!1,this.history=[],this.status="init",this.animations={},this.isAnimat=!0,this.animForwardName="slideleft",this.animBackwardName="slideright",this.animNoName="noAnimate",this.hasPushState=!(!window.history||!window.history.pushState),this.animatName=null,this.viewMapping={},this.container=$("body"),this.interface=["forward","back"]},initialize:function(a){this.propertys(),this.setOption(a),this.createViewPort(),this.buildEvent(),this.pushHistory(),this.start()},setOption:function(a){_.extend(this,a)},createViewPort:function(){if(!this.isCreate){var a=['<div class="main">','<div class="main-viewport"></div>',"</div>"].join("");this.mainframe=$(a),this.viewport=this.mainframe.find(".main-viewport"),this.container.empty(),this.container.append(this.mainframe),this.isCreate=!0}},buildEvent:function(){this.hasPushState?$(window).bind("popstate",_.bind(this.loadViewByUrl,this)):$(window).bind("hashchange",_.bind(this.loadViewByUrl,this))},start:function(){this.loadViewByUrl()},loadViewByUrl:function(){this.animatName||(this.animatName=this.animBackwardName),this.parseUrl(),this.switchView(this.viewId)},parseUrl:function(){var a=decodeURIComponent(location.href).toLowerCase(),b=this.getViewIdRule(a),c=_.getUrlParam(a);b=b||this.defaultView,this.viewId=b,this.request={viewId:b,path:a,query:c}},switchView:function(a){var b=a,c=this.views[b],d=this.curView;if(d&&d!=c&&(this.lastView=d),c){if(c==this.curView)return;this.curView=c;{(d||c).viewname}this.curView.onPreShow()}else this.loadView(a,function(a){if(!($('[page-url="'+b+'"]').length>0)){c=new a(this,b),this.views[b]=c,c.turning=_.bind($.proxy(function(){this.startAnimation(function(a){$(".sub-viewport").hide(),a.$el.show(),this.animatName=null})},this),this),this.curView=c;{"undefined"!=typeof d?d.viewname:null}this.curView.onPreShow()}})},startAnimation:function(a){var b=this.curView,c=this.lastView;c&&c.setScrollPos(window.scrollX,window.scrollY),this.isAnimat||(this.animatName=this.animNoName),this.animations[this.animatName]&&c?this.animations[this.animatName].call(this,b,c,a,this):(c&&c.hide(),b.show(),this.animatName=null,a&&a.call(this,b,c)),this.isAnimat=!0,this.animatName=null},loadView:function(a,b){var c=this;requirejs([this.buildUrl(a)],function(a){b&&b.call(c,a)})},buildUrl:function(a){var b=this.viewMapping[a];return b?b:this.viewRootPath+a},getViewIdRule:function(a){var b,c,d="";return this.hasPushState?d=_.getUrlParam(a,"viewid"):(d=a.replace(/^[^#]+(#(.+))?/g,"$2").toLowerCase().replace(/^#+/i,""),b=/^([^?&|]*)(.*)?$/i.exec(d),c=b[1]?b[1].split("!"):[],d=(c.shift()||"").replace(/(^\/+|\/+$)/i,"")),d},setUrlRule:function(a,b,c){if(this.hasPushState){var d,e=window.location.href,f="",g="";if(c)for(d in c)f+="&"+d+"="+c[d];g=e.indexOf("?")?e.substr(0,e.indexOf("?"))+"?viewid="+a:e+"?viewid="+a,b?history.replaceState("",{},g+f):history.pushState("",{},g+f)}else b?window.location.replace(("#"+a).replace(/^#+/,"#")):window.location.href=("#"+a).replace(/^#+/,"#")},forward:function(a,b){if(a){b=b||{};var c=b.replace,d=b.isNotAnimat;param=b.param,a=a.toLowerCase(),d&&(this.isAnimat=!1),this.animatName=b.animatName||this.animForwardName,this.setUrlRule(a,c,param),this.pushHistory(),this.hasPushState&&this.loadViewByUrl()}},back:function(a,b){b=b||{};var c=b.isNotAnimat;c&&(this.isAnimat=!1),this.animatName=this.animBackName,a?(b.animatName=this.animBackName,this.forward(a,b)):1==window.history.length?this.forward(this.defaultView,b):history.back()},pushHistory:function(){var a=window.location.href;this.history.push(a)}})});