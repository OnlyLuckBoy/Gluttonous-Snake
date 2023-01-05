// 蛇类
function Snake(img){
    // 存储坐标
    this.arr = [
        { x: 16, y: 10},
        { x: 17, y: 10},
        { x: 18, y: 10},
        { x: 19, y: 10}
    ];
    // 存储图片
    this.headImage = img.head;
    this.bodyImage = img.body;
    this.tailImage = img.tail;
    this.diration = 37;
    this.taildiration = 37;
    // 是否可以改变方向
    this.lock = false;
}
// 让蛇移动
Snake.prototype.move = function(){
    // 创建一个头部对象
    var item = {x : this.arr[0].x,y : this.arr[0].y};
    // 判断方向
    switch (this.diration){
        case 37:
            item.x--;
            break;
        case 38:
            item.y--;
            break;
        case 39:
            item.x++;
            break;
        case 40:
            item.y++;
            break;
        default:
            break;
    }
    // 添加头部
    this.arr.unshift(item);
    // 删除尾部
    this.arr.pop();
    console.log(this.arr[this.arr.length-1])

    // 确定尾部图片的方向
    // 获取倒数第二个成员
    var secound = this.arr[this.arr.length - 2];
    // 尾部倒数第一个成员
    var tail = this.arr[this.arr.length - 1];
    // 如果x方向相同
    if(secound.x === tail.x){
        // 在垂直方向上
        if(secound.y > tail.y){
            // 往下移动
            this.taildiration = 40;
        }else {
            // 向下移动
            this.taildiration = 38;
        }
    }else{
        // x不等,说明在水平方向上
        if(secound.x > tail.x){
            // 向右移动
            this.taildiration = 39;
        }else{
            // 向左移动
            this.taildiration = 37;
        }
    }
    // 蛇移动后可以解锁
    this.lock = false;
}
// 改变方向\
Snake.prototype.change = function(code){
    // 如果锁住了,不能改变
    if(this.lock){
        return;
    }
    // 改变方向
    // 左右移动,只能上下改变方向,上下移动只能左右改变方向
    // 获取方向键值之差,math.abs()取绝对值
    var  num = Math.abs(code - this.diration);
    if(num === 0 || num === 2){
        return;
    }
    // 锁住
    this.lock = true;
    // 可以改变方向
    this.diration = code;
}
Snake.prototype.growUp = function(){
    // 获取尾部
    var tail = this.arr[this.arr.length-1];
    // 尾部添加
    this.arr.push(tail);
}