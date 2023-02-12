window.addEventListener('load', function () {
    var arrowl = document.querySelector('.arrow-l');
    var arrowr = document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    // 鼠标经过显示左右按钮并停止定时器
    focus.addEventListener('mouseenter', function () {
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    // 鼠标移开开启定时器
    focus.addEventListener('mouseleave', function () {
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';
        var timer = setInterval(function() {
            arrowr.click();
        },2500)
    })
    // 小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (i = 0; i < ul.children.length; i++) {
        var li = this.document.createElement('li');
        li.setAttribute('index', i)
        ol.appendChild(li);
        // 排他思想，在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var focusWidth = focus.offsetWidth;
            var index = this.getAttribute('index');
            // 当我们点击了某个小li，就要吧这个小li的索引号给num
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    // 点击一次，滚动一次
    // 克隆第一张图片放在最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    // 右侧按钮
    var flag = true;
    arrowr.addEventListener('click', function () {
        if (flag) {
            flag = false;
            var focusWidth = focus.offsetWidth;
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth,function(){
            flag = true;
        });
        circle++;
        // 先清除其他小圆圈的类名
        // 留下当前小圆圈的类名
        //右侧按钮 如果circle等于小圆圈数量，则要复原
        if (circle == ol.children.length) {
            circle = 0
        }
        circleChange();
        }
    });
    //    左侧按钮
    arrowl.addEventListener('click', function () {
        if (flag) {
            flag = false
            var focusWidth = focus.offsetWidth;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth,function(){
                flag = true;
            });
            circle--;
            // 左侧 如果circle小于4，则小圆圈要改为第4个小圆圈（3）
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    });
    // 先清除其他小圆圈的类名
    // 留下当前小圆圈的类名
    function circleChange() {
        for (i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';

            ol.children[circle].className = 'current';
        }
    }
    // 自动播放轮播图
    var timer = setInterval(function() {
        arrowr.click();
    },2500)

})