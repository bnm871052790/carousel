var time=null;
var liWidth=parseInt($('li').eq(0).css('width'));
var num=$('li').length-1;
var key=true;
var slidePage=$('.slidePage');
var nav=$('.slidIndex').children();
var index=0;
//左右切换
$('.right').on('click',function(){
	autoMove('left-->right');
})
$('.left').on('click',function(){
	autoMove('right-->left');
})
//导航圆点
for (var i = 0; i < num; i++) {
	(function(a){
		nav.eq(a).on('click',function(){
			key=false;
			clearTimeout(time);
			index=a;
			changeNavActive(index);
			slidePage.animate({left:-liWidth*index},function(){
				key=true;
				time=setTimeout(autoMove,1000);
			})
		})
	}(i))
}
function changeNavActive(index){
	nav.each(function(index){
		this.className=' ';
	})
	nav[index].className='active'
}
//自动轮播
function autoMove(direction){
	if(key){
		key=false;
		clearTimeout(time);
		if(!direction || direction=='left-->right'){
			index++;
			if(index>=num){
				index=0;
			}
			changeNavActive(index);
			var pageLeft=parseInt(slidePage.css('left'));
			slidePage.animate({left:pageLeft-liWidth},function(){
				if(pageLeft<=-(num-1)*liWidth){
					slidePage.css({left:0})
				}
				key=true;
				time=setTimeout(autoMove,1000)
			})
		}else if( direction=='right-->left'){
			key=false;
			index--;
			if(index<0){
				index=num-1;
			}
			changeNavActive(index);
			var pageLeft=parseInt(slidePage.css('left'));
			if(pageLeft>=0){
				slidePage.css({left:-num*liWidth});
				pageLeft=parseInt(slidePage.css('left'));
			}
			slidePage.animate({left:pageLeft+liWidth},function(){
				key=true;
				time=setTimeout(autoMove,1000)
			})
		}
	}
}
time=setTimeout(autoMove,1000);

