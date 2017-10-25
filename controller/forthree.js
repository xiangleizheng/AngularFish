 var app=angular.module("threemodule",[]);//定义一个名字
 app.controller("forthree",function($scope,$rootScope){
         
            if(JSON.parse(localStorage.getItem("likes"))){
                $rootScope.likes=JSON.parse(localStorage.getItem("likes"))
            }else{
            	$rootScope.likes=[];
            }

            
	        putinlikelist( $rootScope.likes);          	


            
			function putinlikelist(list){
					$(".likelist").html("");
					for(let i=0;i<list.length;i++){
							$(".likelist").append("<li ind='"+i+"' class='"+list[i].songid+"' songname='"+list[i].songname+"' singername='"+list[i].singer[0].name+"' singerp='"+list[i].singer[0].mid+"'><p>"+list[i].songname+"</p></li>")
					}
			}


})
