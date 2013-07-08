!function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z={}.hasOwnProperty,A=function(a,b){function c(){this.constructor=a}for(var d in b)z.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},B=function(a,b){return function(){return a.apply(b,arguments)}};window.Application={Models:{},Collections:{},Views:{},router:{},tags:{},categories:{},url:"{{ site.url }}",name:"{{ site.name }}",disqus:{name:"{{ site.disqus.shortname }}",api_key:"{{ site.disqus.api_key }}",count:"{{ site.disqus.count }}"},twitter:{count:"{{ site.twitter.count }}",username:"{{ site.twitter.username }}"}},Application.Models.Post=function(a){function b(){return c=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.url=function(){return Application.url+"/"+this.id+".json"},b.prototype.defaults={author:"Benjamin J. Balter",title:"",url:"",content:"",tags:[],category:"",date:""},b}(Backbone.Model),Application.Models.Page=function(a){function b(){return d=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.url=function(){return Application.url+"/"+this.id+".json"},b}(Backbone.Model),Application.Models.Thread=function(a){function b(){return o=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.url=function(){var a;return a="https://disqus.com/api/3.0/threads/details.json?",a+="thread="+this.id,a+="&api_key="+Application.disqus.api_key,a+="&callback=?"},b.prototype.parse=function(a){return a.response},b}(Backbone.Model),Application.Models.Comment=function(a){function b(){return s=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.initialize=function(){var a=this;return this.set("thread",new Application.Models.Thread({id:this.get("thread")})),this.get("thread").fetch({success:function(){return a.collection.trigger("change")}})},b}(Backbone.Model),Application.Models.Tweet=function(a){function b(){return t=b.__super__.constructor.apply(this,arguments)}return A(b,a),b}(Backbone.Model),Application.Models.Tag=function(a){function b(){return u=b.__super__.constructor.apply(this,arguments)}return A(b,a),b}(Backbone.Model),Application.Models.Category=function(a){function b(){return v=b.__super__.constructor.apply(this,arguments)}return A(b,a),b}(Backbone.Model),Application.Collections.Comments=function(a){function b(){return w=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.model=Application.Models.Comment,b.prototype.url=function(){var a;return a="https://disqus.com/api/3.0/posts/list.json?",a+="forum="+Application.disqus.name,a+="&limit="+Application.disqus.count,a+="&api_key="+Application.disqus.api_key,a+="&callback=?"},b.prototype.parse=function(a){return a.response},b}(Backbone.Collection),Application.Collections.Tweets=function(a){function b(){return x=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.model=Application.Models.Tweet,b.prototype.url=function(){var a;return a="https://api.twitter.com/1/statuses/user_timeline.json?include_rts=true",a+="&screen_name="+Application.twitter.username,a+="&count="+Application.twitter.count,a+="&callback=?"},b}(Backbone.Collection),Application.Collections.Posts=function(a){function b(){return y=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.model=Application.Models.Post,b.prototype.url=function(){return Application.url+"/"+"pages.json"},b.prototype.comparator=function(a,b){var c;return a=a.get("date"),b=b.get("date"),a===b?c=1:a>b?c=-1:b>a&&(c=1),c},b}(Backbone.Collection),Application.Collections.Pages=function(a){function b(){return e=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.model=Application.Models.Page,b.prototype.url=function(){return Application.url+"/"+"pages.json"},b}(Backbone.Collection),Application.Collections.Tags=function(a){function b(){return f=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.model=Application.Models.Tag,b.prototype.url=function(){return Application.url+"/tags.json"},b.prototype.initialize=function(){return this.fetch()},b.prototype.parse=function(a){var b,c,d;for(c=0,d=a.length;d>c;c++)b=a[c],b.posts=new Application.Collections.Posts(b.posts);return a},b}(Backbone.Collection),Application.Collections.Categories=function(a){function b(){return g=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.model=Application.Models.Category,b.prototype.url=function(){return Application.url+"/categories.json"},b.prototype.initialize=function(){return this.fetch()},b.prototype.parse=function(a){var b,c,d;for(c=0,d=a.length;d>c;c++)b=a[c],b.posts=new Application.Collections.Posts(b.posts);return a},b}(Backbone.Collection),Application.Views.Post=function(a){function b(){return this.render=B(this.render,this),h=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.el="#main",b.prototype.tagName="article",b.prototype["class"]="post",b.prototype.template=JST.post,b.prototype.render=function(){return this.$el.append(this.template(this.model.toJSON())),this.model.get("comments")?this.loadDisqus():void 0},b.prototype.loadDisqus=function(){var a;return window.disqus_shortname=Application.disqus.name,window.disqus_identifier=this.model.get("id"),window.disqus_url=Application.url+"/"+this.model.get("id"),window.disqus_title=this.model.get("title")+" » "+Application.name,"undefined"!=typeof DISQUS&&null!==DISQUS?DISQUS.reset({reload:!0,config:function(){return this.page.identifier=disqus_identifier,this.page.url=disqus_url,this.page.title=disqus_title}}):(a=document.createElement("script"),a.type="text/javascript",a.async=!0,a.src="http://"+disqus_shortname+".disqus.com/embed.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(a))},b}(Backbone.View),Application.Views.PostExcerpt=function(a){function b(){return this.render=B(this.render,this),i=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.el=".posts",b.prototype.tagName="article",b.prototype["class"]="post",b.prototype.template=JST.post_excerpt,b.prototype.initialize=function(){return this.model.on("change",this.render)},b.prototype.render=function(){var a;return a=this.getExcerpted(),this.$el.append(this.template(a.toJSON()))},b.prototype.getExcerpted=function(){var a;return a=this.model.clone(),a.set("content",this.model.get("content").split("<!-- more -->")[0]),a},b}(Backbone.View),Application.Views.Page=function(a){function b(){return this.render=B(this.render,this),j=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.el="#main",b.prototype.tagName="article",b.prototype["class"]="page",b.prototype.template=JST.page,b.prototype.render=function(){return this.$el.html(this.template(this.model.toJSON())),"undefined"!=typeof DISQUS&&null!==DISQUS&&DISQUS.reset(),this.resume_resize()},b.prototype.resume_resize=function(){return $(".page-resume .bar").height($(".content").height()-15)},b}(Backbone.View),Application.Views.Single=function(a){function b(){return this.render=B(this.render,this),k=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.el="#content",b.prototype.template=JST.single,b.prototype.initialize=function(){return this.model.on("change",this.render)},b.prototype.render=function(){var a;return this.$el.html(this.template(this.model.toJSON())),"post"===this.model.get("layout")?a=new Application.Views.Post({model:this.model}):"page"===this.model.get("layout")&&(a=new Application.Views.Page({model:this.model})),document.title=this.model.get("title")+" » "+Application.name,a.render(),$.smoothScroll({scrollTarget:".title",offset:-60}),jQuery("#content").infinitescroll("destroy")},b}(Backbone.View),Application.Views.Index=function(a){function b(){return l=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.el="#content",b.prototype.template=$("#index_layout").html(),b.prototype.render=function(){var a,b,c;return this.$el.html(this.template),this.collection.sort(),this.collection.slice(0,10).forEach(function(a){var b;return a.fetch(),b=new Application.Views.PostExcerpt({model:a})}),a=new Application.Collections.Comments,c=new Application.Views.CommentView({collection:a}),a.fetch(),b=new Application.Collections.Tweets,c=new Application.Views.TweetView({collection:b}),b.fetch()},b}(Backbone.View),Application.Views.CommentView=function(a){function b(){return this.render=B(this.render,this),this.initialize=B(this.initialize,this),m=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.el="#recentcomments",b.prototype.template=JST.recent_comments,b.prototype.initialize=function(){return this.collection.on("change",this.render)},b.prototype.render=function(){return this.$el.html(this.template({comments:this.collection.toJSON()}))},b}(Backbone.View),Application.Views.TweetView=function(a){function b(){return this.render=B(this.render,this),this.initialize=B(this.initialize,this),n=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.el="#tweets",b.prototype.template=JST.recent_tweets,b.prototype.initialize=function(){return this.collection.on("all",this.render)},b.prototype.render=function(){return this.$el.html(this.template({tweets:this.collection.toJSON()}))},b}(Backbone.View),Application.Views.Tag=function(a){function b(){return p=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.el="#content",b.prototype.template=JST.tag,b.prototype.render=function(){return this.$el.html(this.template({tag:this.model.toJSON()})),$.smoothScroll({scrollTarget:".title",offset:-60}),jQuery("#content").infinitescroll("destroy"),document.title="Posts tagged '"+this.model.get("id")+"'' » "+Application.name},b}(Backbone.View),Application.Views.Category=function(a){function b(){return q=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.el="#content",b.prototype.template=JST.category,b.prototype.render=function(){return this.$el.html(this.template({category:this.model.toJSON()})),$.smoothScroll({scrollTarget:".title",offset:-60}),jQuery("#content").infinitescroll("destroy"),document.title="Posts categorized '"+this.model.get("id")+"'' » "+Application.name},b}(Backbone.View),a=function(a){function b(){return r=b.__super__.constructor.apply(this,arguments)}return A(b,a),b.prototype.routes={":year/:month/:day/:slug/":"post","tags/:tag/":"tag","categories/:category/":"category",":slug/":"page","":"index"},b.prototype.post=function(a,b,c,d){var e,f;return e=new Application.Models.Post({id:a+"/"+b+"/"+c+"/"+d}),Application.posts.add(e),f=new Application.Views.Single({model:e}),e.fetch({error:this.redirect}),this.setNav("")},b.prototype.page=function(a){var b,c;return b=new Application.Models.Page({id:a}),Application.pages.add(b),c=new Application.Views.Single({model:b}),b.fetch({error:this.redirect}),this.setNav(a.replace("/",""))},b.prototype.index=function(){var a;return a=new Application.Views.Index({collection:Application.posts}),Application.posts.fetch({error:this.redirect,success:function(){return a.render()}}),this.setNav("home")},b.prototype.tag=function(a){return Application.tags=new Application.Collections.Tags,Application.tags.on("reset",function(){return new Application.Views.Tag({model:Application.tags.get(a)}).render()}),this.setNav("")},b.prototype.category=function(a){return Application.categories=new Application.Collections.Categories,Application.categories.on("reset",function(){return new Application.Views.Category({model:Application.categories.get(a)}).render()}),this.setNav("")},b.prototype.redirect=function(){return document.location=Application.url+"/"+Backbone.history.fragment},b.prototype.setNav=function(a){return $(".nav .active").removeClass("active"),a.length?$(".nav #"+a).addClass("active"):void 0},b}(Backbone.Router),Application.posts=new Application.Collections.Posts,Application.pages=new Application.Collections.Pages,Application.router=new a,b=""===window.location.hash,Backbone.history.start({pushState:!0,silent:b}),null!=window.is404&&window.is404&&(window.is404=null,Backbone.history.fragment="",Application.router.navigate(document.location.pathname.replace("/",""),{trigger:!0,replace:!0})),jQuery(document).ready(function(){return window.resume_resize=function(){return $(".page-resume .bar").height($(".content").height()-15)},$(window).resize(resume_resize),resume_resize(),""===Backbone.history.fragment?jQuery("#content").infinitescroll({navSelector:"nav.pagination",nextSelector:"nav.pagination #next",itemSelector:"article.post"}):void 0})}.call(this);