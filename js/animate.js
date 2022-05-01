window.addEventListener('load', function(){
    // var div = document.querySelector('div');
    // var span = document.querySelector('span');
    // var btn500  = document.querySelector('.btn500');
    // var btn800 = document.querySelector('.btn800');
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
})
// animate(div,300);
// animate(span,200,50);


// btn500.addEventListener('click',function(){
//     animate(span,500,function(){
//        span.style.color = 'blue';
//     })
// })
// btn800.addEventListener('click',function(){
//     animate(span,800,function(){
//         animate(span,1000);
//     })
// })
// })