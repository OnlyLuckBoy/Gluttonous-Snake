// 游戏类：负责渲染、游戏交互（判断游戏是否结束）
function Game(){
    // 存储属性
    this.snake = snake;
    this.food = food;
    this.block = block;
    this.map = map;
    
    
    // 定时器句柄
    this.timebar = null;
    // 游戏是否可以正常执行
    this.starte = true;
    // 初始化
    this.init();
}
// 初始化方法
Game.prototype.init = function(){
    // 将地图初始化
    this.renderMap();
    // 渲染食物
    this.renderFood();
    // 绘制障碍物
    this.renderBlock();
    // 绘制蛇
    this.rendSnake();
    
    // 启动游戏
    this.start();
    // 绑定事件
    this.bindEvent();
}

// 渲染地图
Game.prototype.renderMap = function(){
    this.map.init();
}
// 渲染食物
Game.prototype.renderFood = function(){
    // 根据食物的横纵坐标，在地图中找到对应的元素，设置其背景图片
    this.map.arr[this.food.y][this.food.x].style.backgroundImage = 'url('+ this.food.img+')';
    // console.log(this.map,this.food)
}
// 渲染障碍物
Game.prototype.renderBlock =function(){
    // 遍历障碍物成员，将其一一绘制出来
    for(var i = 0; i < this.block.arr.length;i++){
        // 将其渲染
        // 缓存障碍物体
        var item = this.block.arr[i];
        // y对应行，x对应列，确定位置
        this.map.arr[item.y][item.x].style.backgroundImage = 'url('+ this.block.img +')';
    }
}
// 渲染蛇
Game.prototype.rendSnake = function(){
    // 特殊绘制头和尾
    var head = this.snake.arr[0];
    var tail = this.snake.arr[this.snake.arr.length-1];
    // 绘制头
    var headPosition = this.map.arr[head.y][head.x];
        headPosition.style.backgroundImage = 'url('+ this.snake.headImage +')';
    var num = this.snake.diration;
    switch (num){
        case 37:
            headPosition.style.transform = 'rotateY(180deg)';
            break;
        case 38:
            headPosition.style.transform= 'rotate(-90deg)';
            break;
        case 39:
            headPosition.style.transform = 'rotate(0deg)';
            break;
        case 40:
            headPosition.style.transform = 'rotate(90deg)';
            break;
        default :
            headPosition.style.transform = 'rotateY(180deg)';
    }

    // 绘制尾
    var tailPosition = this.map.arr[tail.y][tail.x];
    tailPosition.style.backgroundImage = 'url('+ this.snake.tailImage +')';
    var tailnum = this.snake.taildiration;
    switch (tailnum){
        case 37:
            tailPosition.style.transform = 'rotate(-90deg)';
            break;
        case 38:
            tailPosition.style.transform= 'rotate(0deg)';
            break;
        case 39:
            tailPosition.style.transform = 'rotate(90deg)';
            break;
        case 40:
            tailPosition.style.transform = 'rotate(180deg)';
            break;
        default :
            tailPosition.style.transform = 'rotateY(180deg)';
    }
    // 绘制身体,从第二张到倒数第二张
    for(var i = 1,len = this.snake.arr.length-1;i<len;i++){
        // 缓存身体
        var body = this.snake.arr[i];
        var bodyPosition = this.map.arr[body.y][body.x];
        // 绘制身体
        bodyPosition.style.backgroundImage = 'url('+ this.snake.bodyImage +')';
        switch (num){
            case 37:
                bodyPosition.style.transform = 'rotate(-90deg)';
                break;
            case 38:
                bodyPosition.style.transform= 'rotate(0deg)';
                break;
            case 39:
                bodyPosition.style.transform = 'rotate(90deg)';
                break;
            case 40:
                bodyPosition.style.transform = 'rotate(180deg)';
                break;
            default :
                bodyPosition.style.transform = 'rotateY(0deg)';
        }
    }
}

// 清空地图
Game.prototype.clear = function(){
    // 通过地图对象清空
    this.map.clear();
}
Game.prototype.start = function(){
    var me =this
    // 启动定时器
    this.timebar = setInterval(function(){
        // 移动蛇
        me.snake.move();
        // 判断边界
        me.checkMap();
        // 是否碰撞障碍物
        me.checkBlock();
        // 碰撞身体
        me.checkSnake();
        // 检测是否吃到食物
        me.checkFood();
        // 如果游戏正常运行,继续绘制
        if(me.starte){
            // 清空后重新渲染
            me.clear();
            // 重新渲染食物和墙
            me.renderBlock();
            me.renderFood();
            // 重新渲染
            me.rendSnake();
        }
        
    },1000)
}
Game.prototype.bindEvent = function(){
    // 缓存this
    me = this;
    // 监听键盘事件
    document.onkeydown = function(e){
        // 改变运行方向
        me.snake.change(e.keyCode);
    }
}

// 游戏结束
Game.prototype.gameOver = function(){
    // 终止游戏
    clearInterval(this.timebar);
    this.starte = false;
    console.log('游戏结束,你的分数为:'+ this.snake.arr.length +'分');
}

// 检测边界
Game.prototype.checkMap = function(){
    // 判断蛇的头部
    var head =this.snake.arr[0];
    // 判断是否出界
    if(head.x < 0 ||head.y < 0 || head.x>= this.map.col || head.y >= this.map.row){
        this.gameOver();
    }
}
Game.prototype.checkBlock =function(){
    // 获取头部
    var head = this.snake.arr[0];
    // 遍历障碍物
    for(var i = 0; i<this.block.arr.length;i++){
        // 比较头部与障碍物是否在同一个位置的问题
        // 获取障碍物
        var block = this.block.arr[i];
        // 比较同一位置,横纵坐标是相同的
        if(head.x === block.x && head.y === block.y){
            // 游戏结束
            this.gameOver();
            return;
        }
    }
}
Game.prototype.checkFood = function(){
    // 头部坐标与食物重合
    if(this.snake.arr[0].x === this.food.x && this.snake.arr[0].y === this.food.y){
        // 吃到食物了,蛇的变化
        this.snake.growUp();
        // 重置食物
        this.resetFood();
    }
}

// 重置食物
Game.prototype.resetFood = function(){
    // 随机一个位置
    let x = parseInt(Math.random() * this.map.col);
    let y = parseInt(Math.random() * this.map.row);
    // 判断坐标是否在墙体
    for(var i = 0;i< this.block.arr.length; i++){
        // 缓存一个障碍物
        let block = this.block.arr[i];
        // 判断是否重合
        if(block.x === x && block.y === y){
            // 在墙体中，重新随机食物
            this.resetFood();
            return;
        }
    }
    // 判断是否在蛇的身上
    for(var i = 0;i< this.snake.arr.length;i++){
        // 缓存蛇的坐标
        let snake = this.snake.arr[i];
        // 判断坐标是否重合
        if(snake.x === x && snake.y === y){
            // 重新随机食物
            this.resetFood();
            return;
        }
    }
    // 更改食物位置
    this.food.resetFood_1(x,y);
}
Game.prototype.checkSnake = function(){
    // 获取头部
    var head = this.snake.arr[0];
    // 从第二个开始遍历
    for(var i = 1; i<this.snake.arr.length;i++){
        // 缓存身体
        var body = this.snake.arr[i];
        // 判断是否碰撞
        if(head.x === body.x && head.y === body.y){
            this.gameOver();
            return;
        }
    }
}