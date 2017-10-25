 var app=angular.module("onemodule",[]);//定义一个名字
 app.controller("forone",function($scope,$rootScope){
        
	$(".sx").on("click",function(){
 		    $("#container").addClass("container");	   		
	   		var sxarr = $rootScope.list.sx;
	   		var dom = document.getElementById("container");
			var myChart = echarts.init(dom);
			var app = {};
			option = null;
			option = {
				backgroundColor: 'rgba(0,0,0,0.7)',//背景色
			    series : [
			        {
			            name: '属性图',
			            type: 'pie',
			            radius: '55%',
			            roseType: 'angle', //添加后就会用半径大小来表示数据
			                
			            data:[
			                {value:sxarr[1][0], name:sxarr[0][0]+"："+sxarr[1][0]+" ("+parseFloat((sxarr[1][0]*100)/sxarr[1].reduce(function(a,b){return a+b;})).toFixed(2)+"%)"},//在对象中可以单独加入itemStyle.normal.color设置单独块的属性
			                {value:sxarr[1][1], name:sxarr[0][1]+"："+sxarr[1][1]+" ("+parseFloat((sxarr[1][1]*100)/sxarr[1].reduce(function(a,b){return a+b;})).toFixed(2)+"%)"},
			                {value:sxarr[1][2], name:sxarr[0][2]+"："+sxarr[1][2]+" ("+parseFloat((sxarr[1][2]*100)/sxarr[1].reduce(function(a,b){return a+b;})).toFixed(2)+"%)"},
			                {value:sxarr[1][3], name:sxarr[0][3]+"："+sxarr[1][3]+" ("+parseFloat((sxarr[1][3]*100)/sxarr[1].reduce(function(a,b){return a+b;})).toFixed(2)+"%)"},
			            ],			           
			        }
			    ]
			};;
			if (option && typeof option === "object") {
			    myChart.setOption(option, true);
			}
	
	
	});
	

	
	$(".nav").on("click","li",function(){
		var n = $(this).index();
		$(this).addClass("curli");
		$(this).siblings().removeClass("curli");
		$(".navcon>div").eq(n).css({"display":"block"});
        $(".navcon>div").eq(n).removeClass("animated slideOutRight");
		$(".navcon>div").eq(n).addClass("animated slideInLeft");
		$(".navcon>div").eq(n).siblings().addClass("animated slideOutRight");
		setTimeout(function(){
		    $(".navcon>div").eq(n).removeClass("animated slideInLeft");
		    $(".navcon>div").eq(n).siblings().removeClass("animated slideOutRight");
		    $(".navcon>div").eq(n).siblings().css({"display":"none"});
		},500)
	})
	
	
	$(".pf").on("click","img",function(){
		$(".showskin").css({"display":"block"});
		$(".showskin").append("<img src='"+$(this).attr('src')+"'/>");
	})
    $(".showskin").on("click",function(){
		$(".showskin").css({"display":"none"});
		$(".showskin").empty();
    	
    })

})
