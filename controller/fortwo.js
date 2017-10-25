 var app=angular.module("twomodule",[]);//定义一个名字
 app.controller("fortwo",function($scope,$rootScope){
        
        $(".footer>a:eq(1)").on("click",function(){
        	$("i").removeClass("animated slideOutDown");
        	$("i").addClass("animated slideInUp");
        })
        $(".footer").on("click","a",function(){
        	if($(this).index()!=1){
	        	$("i").removeClass("animated slideInUp");
	        	$("i").addClass("animated slideOutDown");
        	}
        })        

	    var list=[];
//------------初始状态设置	    
	    if(localStorage.getItem('recent')){
	        var recent=localStorage.getItem('recent').split(",");
	    }else{
			    var recent=["霍尊","victory","一个忧伤"];
	    }
	    
	    if(localStorage.getItem("list")){
	    	var list = JSON.parse(localStorage.getItem("list"));
	    	putinresult(list);
	    }
	    
//----------搜索区域节点事件
			$(".txt").on("focus",function(){
				$(this).css({
					'outline':"none",
					'box-shadow':' 0 -8px 10px -5px #D1AB57 inset',
				})
			})
			$(".txt").on("blur",function(){
				$(this).css({
					'outline':"none",
					'box-shadow':' 0 0 0px 0 #D1AB57 inset',
				})
			})			

			$(".search").on("click",function(event){
				  event.stopPropagation();
				  var t = $('.txt')[0].value;
				  load(t);
			});
			

			
			function load(k){
				
				            if(k!=null){
				            	var kw = k;
				            	$('.txt')[0].value=kw;
				            }else{
				            	var kw = "我是歌手";
				            }
		                list=[]
                    $.ajax({
								type:"get",
								url:"https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w="+kw+"&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=30&n=30&p=1&_=1489396018874&jsonpCallback=_jsonpky20i0jqjfr",
								dataType:"jsonp",
								jsonp:"jsonpCallback",  
								async:true,
								success:function(data){
									list = list.concat(data.data.song.list)
							    }
				    });		                
                    $.ajax({
								type:"get",
								url:"https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w="+kw+"&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=30&n=30&p=2&_=1489396018874&jsonpCallback=_jsonpky20i0jqjfr",
								dataType:"jsonp",
								jsonp:"jsonpCallback", 
								async:true,
								success:function(data){
								   list = list.concat(data.data.song.list);
								   localStorage.setItem("list",JSON.stringify(list)); 
		                           putinresult(list);
		                           return list;
							    }
					})
		    }
			
			function putinresult(list){
					$(".music")[0].style.display="block";
					$(".result").html("");
					for(var i=0;i<list.length;i++){
							$(".result").append("<li ind='"+i+"' class='"+list[i].songid+"' songname='"+list[i].songname+"' singername='"+list[i].singer[0].name+"' singerp='"+list[i].singer[0].mid+"'><p>"+list[i].songname+"</p><span>"+list[i].albumname+"</span><strong>"+list[i].singer[0].name+"</strong></li>")
					}														
			}

			function creatvideo(a){
				  $("body i").empty();
				  $("body i").append("<video  class='videoplay' autoplay='' loop='loop' name='media'></video>");
				  $(".videoplay").append("<source  src='http://ws.stream.qqmusic.qq.com/"+a+".m4a?fromtag=46' type='audio/mp4'>")
			}
			
			function creatrecent(a){
				  $(".recent").empty();
				  for(let i = 0 ;i<a.length;i++){
					    var span = document.createElement("span");
					    span.innerHTML=a[i];
					    span.style.border="1px solid "+changeC();
					    span.style.position="relative";
					    $(".recent").append(span);
					
				  	  var em = document.createElement("em");
					    span.appendChild(em)
				  }
			}

			function changeC(){
				var s = "#";
				for(var i = 0;i<6;i++){
					s+=parseInt(Math.random()*17).toString(16)
				}
				if(s=="#ffffff"||s=="#FFFFFF"){
					 changeC();
				}else{
				   return s;
				}

			}
			creatrecent(recent);
			
			$(".result").on("click","li",function(event){
				 event.stopPropagation();
				$("i")[0].style.display="block";
				var songid = $(this)[0].className;
				creatvideo(songid);
				if(recent.indexOf($(this).attr("songname"))==-1){
				    recent.unshift($(this).attr("songname"));
				    creatrecent(recent);
				    localStorage.setItem('recent',recent);
				    let  pic = "//y.gtimg.cn/music/photo_new/T001R300x300M000"+$(this).attr("singerp")+".jpg?";
				    $("i").append("<img src='"+pic+"'>")
				    $("i").append("<p style='position: absolute;padding-left: 60px;box-sizing: border-box;top: 25px;width:100%;font-size: 18px;font-style: normal;text-align: center;color: #D1AB57;'>"+$(this).attr('singername')+"<br/><span style='text-align: center;font-size: 13px;margin-top: 20px;'>"+$(this).attr('songname')+"</span></p>") 
				    $("i").append("<p class='nextone' ind='"+$(this).attr('ind')+"' style='position: absolute;width:26px;height:26px;border-radius:50%;box-sizing: border-box;top: 35px;right:15px;text-align:center;line-height:26px;'></p>") 
				    $(".nextone").css({"background":"url(./img/bg-icon-v.png)","backgorund-size":"cover"})  
				}else{return}
			})
      

//    var next=true;
      $("i").on("click",".nextone",function(event){
      	event.stopPropagation();
//    	if(next){
		      	let index = parseInt($(this).attr("ind"))+1;
//		      	console.log(list);
		      	if(list.length>index){
				      	let songid = list[index].songid;
//				      	console.log(list[index]);
//				      	console.log(index,songid);
				      	creatvideo(songid);
						    $("i").append("<img src='//y.gtimg.cn/music/photo_new/T001R300x300M000"+list[index].singer[0].mid+".jpg?'>")
						    $("i").append("<p style='position: absolute;padding-left: 60px;box-sizing: border-box;top: 25px;width:100%;font-size: 18px;font-style: normal;text-align: center;color: #D1AB57;'>"+list[index].singer[0].name+"<br/><span style='text-align: center;font-size: 13px;margin-top: 20px;'>"+list[index].songname+"</span></p>") 
						    $("i").append("<p class='nextone' ind='"+index+"' style='position: absolute;width:26px;height:26px;border-radius:50%;box-sizing: border-box;top: 35px;right:15px;text-align:center;line-height:26px;'></p>") 
						    $(".nextone").css({"background":"url(./img/bg-icon-v.png)","backgorund-size":"cover"})  		      	
//				      	next=false;
		      	}else{return}
//    	}else{
//    			setTimeout(function(){next=true},2000)
//    	}
      })

			$(".recent").on("click","span",function(event){
				 event.stopPropagation();
				var re = $(this).text();
				load(re);
			})
			
			$(".recent").on("click","em",function(event){
           event.stopPropagation();
					$(this)[0].parentNode.remove();
					var con = $(this)[0].parentNode.innerText;
					var index = recent.indexOf(con);
					if (index > -1) {
					recent.splice(index, 1);
					}
					localStorage.setItem("recent",recent)
			})


})
