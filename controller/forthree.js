 var app=angular.module("threemodule",[]);//定义一个名字
 app.controller("forthree",function($scope,$rootScope){
         
            var likesarr=[];
            if(JSON.parse(localStorage.getItem("likes"))){
                likesarr=unique(JSON.parse(localStorage.getItem("likes")));
            }else{
            	likesarr=[];
            }

            
	        putinlikelist(likesarr);          	


            
			function putinlikelist(list){
					$(".likelist").html("");
					for(let i=0;i<list.length;i++){
							$(".likelist").append("<li ind='"+i+"' class='"+list[i].songid+"' songname='"+list[i].songname+"' singername='"+list[i].singer[0].name+"' singerp='"+list[i].singer[0].mid+"'><p>"+list[i].songname+"</p></li>")
					}
			}

			function unique(array){ 
			    var n = []; 
				for(var i = 0; i < array.length; i++){ 
				    if (n.indexOf(array[i]) == -1) n.push(array[i]); 
				} 
			    return n; 
			}  
})
