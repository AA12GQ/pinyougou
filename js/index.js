window.addEventListener('load', function(){
    // js循环精灵图（品优购快报模块下）
    var lis = document.querySelector('.lifeservice').querySelectorAll('i');
    var countX = 0;
    var countY = 0;
    for(var i = 0; i < lis.length;i++){
        var index_x = countX * 62;
        var index_y = countY * 70;
        lis[i].style.backgroundPosition = '-' + index_x + 'px -' + index_y + 'px';
        countX++;
        if ((i + 1) % 4 == 0) {
            countX = 0;
            countY++;
        }
    }
     function animate(obj,target,callback){
    // console.log(div.offsetLeft);
    clearInterval(obj.timer);
    var step = (target - obj.offsetLeft) / 10;
    obj.timer = setInterval(function(){
    obj.style.left = obj.offsetLeft + step + 'px';
    if(obj.offsetLeft==target){
        clearInterval(obj.timer);
        if(callback){
            callback();
        }
    //     setInterval(function(){
    // div.style.left = div.offsetLeft + -50 + 'px';
    //     },30)
    }
    },100)
}
// 动画函数 
// function animate(obj,target,callback){
//     // console.log(div.offsetLeft);
//     clearInterval(obj.timer);
//     var step = Math.ceil((target - obj.offsetLeft) / 10);
//     step = step > 0? Math.ceil(step):Math.floor(step);
//     // var step = -5;
//     obj.timer = setInterval(function(){
//     obj.style.left = obj.offsetLeft + step + 'px';
//     if(obj.offsetLeft<=target){
//         clearInterval(obj.timer);
//         if(callback){
//             callback();
//         }
//     //     setInterval(function(){
//     // div.style.left = div.offsetLeft + -50 + 'px';
//     //     },30)
//     }
//     },100)
// }
function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var speed = (target - obj.offsetLeft) / 10;
        // 判断speed正负，不同方向取整
        var speed1 = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + speed1 + 'px';

    }, 15);
};
    // 轮播图按钮显示与隐藏
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter',function(){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave',function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function(){
            // 手动调用
            arrow_r.click();
        },2000)
    })
    // 动态生成小圆圈
    var ol = focus.querySelector('.circle')
    var ul = focus.querySelector('.img-list');
    // console.log(ul.children.length);
    for(var i=0; i<ul.children.length; i++){
        // 创建li
        var li = document.createElement('li');
        //记录当前i的数量
        li.setAttribute('index',i);
        // 将li放到ol中
        ol.appendChild(li);
        // 点击当前小圆圈的时候 排除其它小圆圈
        li.addEventListener('click', function(){
            for(var i = 0; i < ol.children.length; i++){
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击小圆圈获取当前的自定义属性
            var index = this.getAttribute('index');
            // 当我们点击某一个小li就把索引给num
            num = index;
            // 当我们点击某一个li就把索引给circle
            circle = index;
            // 点击小圆圈 移动ul
            console.log(focusWidth); 
            console.log(index);
            animate(ul,-index * focusWidth);
        })
    }
    // 给ol孩子中的第一个设置current这个类
    ol.children[0].className = 'current';
    // 克隆ul中第一个节点 添加到ul中最后一个
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 给右侧按钮添加点击事件
    // 控制小圆圈的播放
    var circle = 0;
    var num = 0;
    arrow_r.addEventListener('click',function(){
        if(num==ul.children.length-1){
            ul.style.left = 0;
            num = 0;
        }
        num++
        animate(ul,-num * focusWidth);
        // 点击右侧按钮 小圆圈跟着一起变化 可以再声明一个变量控制小圆圈的播放（circle）
        circle++;
        // 如果circle变成4 说明走到了克隆的哪一张图片
        if(circle==ol.children.length){
            circle =0;
        }
        circleChange();
    })
    // 左侧按钮做法
    arrow_l.addEventListener('click',function(){
        if(num==0){
            num = ul.children.length-1;
            ul.style.left = -num * focusWidth +'px';
            
        }
        num--;
        animate(ul,-num * focusWidth);
        // 点击左侧按钮 小圆圈跟着一起变化 可以再声明一个变量控制小圆圈的播放（circle）
        circle--;
        // 如果circle < 0,说明是第一张图片，则小圆圈改为第四个小圆圈
        // if(circle < 0){
        //     circle =ol.children.length-1;
        // }
       circle = circle < 0 ? circle =ol.children.length-1:circle;
       circleChange();
    })
    function circleChange(){
        for(var i = 0; i <ol.children.length; i++){
            ol.children[i].className ='';
        }
        ol.children[circle].className = 'current';
    }
    // 添加自动播放  设置定时器 定时自动点击右侧按钮 相当于手动调用
    var timer = setInterval(function(){
        // 手动调用
        arrow_r.click();
    },2000)
    // 显示隐藏电梯导航
    
    var tooltop = $('.recom_left').offset().top;
    toggleTool();
    function toggleTool(){
        if($(document).scrollTop()>=tooltop){
            $('.lift').fadeIn();
        }else{
            $('.lift').fadeOut();
        }
    }
    $(window).scroll(function(){
        toggleTool()
        if(flag){
            $('.floor .w').each(function(i,ele){
                if($(document).scrollTop()>=$(ele).offset().top){
                    $('.lift li').addClass('current').siblings().removeClass('current')
                }
            })
        }
    })
    // 点击电梯的li 添加current类 并且到达指定的楼层
    $('.lift li').click(function(){
        flag = false;
        console.log($(this).index())
        var cur = $('.floor .w').eq($(this).index()).offset().top;
        $('body,html').stop().animate({
            scrollTop:cur
        },function(){
            flag = true;
        });
        // $('.lift li').each(function(i,ele){
        //     $(ele).removeClass('current')
        // })
        // $(this).addClass('current');
        $(this).addClass('current').siblings().removeClass('current');
    })
})