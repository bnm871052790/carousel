var timer=null;
var slidePage=document.getElementsByClassName('slidePage')[0];
var moveWidth=slidePage.children[0].offsetWidth;
var num=slidePage.children.length-1;
var left=document.getElementsByClassName('left')[0];
var right=document.getElementsByClassName('right')[0];
var key=true;
var index=0;
var indexSpan=document.getElementsByClassName('slidIndex')[0].getElementsByTagName('span');

//左右切换
right.onclick=function(){
	autoMove('left->right')
}
left.onclick=function(){
	autoMove('right->left')
}

//导航圆点
for (var i = 0,len=indexSpan.length; i <len ; i++) {
	(function(a){
		indexSpan[a].onclick=function(){
			key=false;
			index=a;
			changeIndesSpan(index);
			clearTimeout(timer);
			startMove(slidePage,{left:- moveWidth*index},function(){
				key=true;
				timer=setTimeout(autoMove,1500)
			})
		}
	}(i))
	
}

//自动轮播
function autoMove(direction){
	if(key){
		key=false;
		clearTimeout(timer)
		if(!direction || direction == 'left->right') {
			index++;
			if(index>=num){
				index=0;
			}
			changeIndesSpan(index)
			startMove(slidePage,{left:slidePage.offsetLeft - moveWidth},function(){
				if(slidePage.offsetLeft == -moveWidth*num) {
					slidePage.style.left = '0px';
				}
				timer=setTimeout(autoMove,1500)
				key=true;
			});
		}else if(direction == 'right->left'){
			index--;
			if(index<0){
				index=num-1;
			}
			changeIndesSpan(index)
			if(slidePage.offsetLeft == 0){
				slidePage.style.left = -moveWidth*num+'px';
			}
			startMove(slidePage,{left:slidePage.offsetLeft + moveWidth},function(){
				timer=setTimeout(autoMove,1500)

				key=true;
			})
		}
	}
}
//定时器
timer=setTimeout(autoMove,1500)

//导航原点切换
function changeIndesSpan(_index){
	for(var i=0,len=indexSpan.length;i<len;i++){
		indexSpan[i].className=' ';
	}
	indexSpan[_index].className='active';
}

//运动函数
function startMove(obj,json,callBack){
	clearInterval(obj.timer);
	var speed,cur;
	obj.timer=setInterval(function(){
		var bStop=true;
		for(var attr in json){
			if(attr=='opacity'){
				cur=parseFloat(getStyle(obj,attr)*100)
			}else{
				cur=parseInt(getStyle(obj,attr));
			}
			speed=(json[attr]-cur)/7;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(attr=='opacity'){
				obj.style.opacity=(cur+speed)/100
			}else{
				obj.style[attr]=cur+speed+'px'
			}
			if(cur!=json[attr]){
				bStop=false;
			}
		} 
		if(bStop){
			clearInterval(obj.timer);
			typeof callBack=='function' ? callBack():'';
		}
	},30)
	
}

//获取属性
function getStyle(elem,prop){
	if(window.getComputedStyle) {
		return window.getComputedStyle(elem,null)[prop];
	}else{
		return elem.currentStyle[prop];
	}
}