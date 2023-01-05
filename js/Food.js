// 食物类
function Food(x,y,img){
    this.x = x;
    this.y = y;
    this.img = img;
}
// 重置位置
Food.prototype.resetFood_1 = function(x,y){
    this.x = x;
    this.y = y;
}