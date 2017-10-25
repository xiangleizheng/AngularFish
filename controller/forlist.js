 var app=angular.module("listmodule",[]);//定义一个名字
 app.controller("forlist",function($scope,$rootScope){
    $rootScope.num = 0;
 	$(".listforyuan").on("click","li",function(){
 		$(".firstdefu").css({"filter":"grayscale(10%) opacity(99%) blur(2px)"})
 		let n =$(this).index();
 		$rootScope.num = $(this).index();
 		$(this).addClass("bg");
 		$(this).children().addClass("cur");
 		$(this).siblings().removeClass("bg");
 		$(this).siblings().children().removeClass("cur");
 		let liw = $(this).width();
 		$(this).parent().css({"left":innerWidth/2-n*liw-liw/2});
 		
 		$("#container").empty();
 		$("#container").removeClass("container");
 		
 	    
 	    $(".wx>div>p:gt(0)").addClass("animated fadeIn");
 	    $(".name").addClass("animated bounceInLeft");
	    setTimeout(function(){
	       $(".name").removeClass("animated bounceInLeft");
 	       $(".wx>div>p:gt(0)").removeClass("animated fadeIn");
	    },450);
	 		
	    for(let i = 0 ; i<$scope.ku.length;i++){
	    	if($rootScope.num==i){
	 	        $rootScope.list=$scope.ku[i];
	        }
	    } 		
 	})
 	
 	$.get("./data/heroinfo.json",function(data){
 		$scope.ku=data;
 	})
 		

})
