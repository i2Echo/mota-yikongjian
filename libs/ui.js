function ui() {

}

ui.prototype.init = function () {
    if(main.dom.data.addEventListener){
        main.dom.data.addEventListener('DOMMouseScroll',main.ui.scrollFunc,false);
    }//IE
    main.dom.data.onmousewheel=main.ui.scrollFunc;//Opera/Chrome/Safari

    this.holdingPath = 0;
    this.stepPostfix = [];
    this.mouseOutCheck = 1;
}

main.instance.ui = new ui();

ui.prototype.fillPos = function (pos) {
    core.canvas.ui.lineWidth = 0;
    core.canvas.ui.fillStyle='#bfbfbf';
    core.canvas.ui.fillRect(pos.x*32+12,pos.y*32+12,8,8);
}

ui.prototype.clearStepPostfix = function () {
    if(main.ui.mouseOutCheck >0){
        main.ui.mouseOutCheck--;
        window.setTimeout(main.ui.clearStepPostfix,1000);
        return;
    }
    main.ui.holdingPath=0;
    if(main.ui.stepPostfix.length){
        main.ui.stepPostfix=[];
        core.canvas.ui.clearRect(0, 0, 416,416);
        core.canvas.ui.restore();
    }
    //这个函数内的this是window
}//用于鼠标移出canvas时的自动清除状态

ui.prototype.ondown = function (x ,y) {
    if (!core.status.played || core.status.lockControl) {
        main.core.onclick(x, y, []);
        return;
    }
    this.holdingPath=1;
    this.mouseOutCheck =1;
    window.setTimeout(main.ui.clearStepPostfix);
    core.canvas.ui.save();
    core.canvas.ui.clearRect(0, 0, 416,416);
    var pos={'x':x,'y':y}
    this.stepPostfix=[];
    this.stepPostfix.push(pos);
    this.fillPos(pos);
}

ui.prototype.onmove = function (x ,y) {
    if (this.holdingPath==0){return;}
    this.mouseOutCheck =1;
    var pos={'x':x,'y':y};
    var pos0=this.stepPostfix[this.stepPostfix.length-1];
    var directionDistance=[pos.y-pos0.y,pos0.x-pos.x,pos0.y-pos.y,pos.x-pos0.x];
    var max=0,index=4;
    for(var ii=0;ii<4;ii++){
        if(directionDistance[ii]>max){
            index=ii;
            max=directionDistance[ii];
        }
    }
    pos=[{'x':0,'y':1},{'x':-1,'y':0},{'x':0,'y':-1},{'x':1,'y':0},false][index]
    if(pos){
        pos.x+=pos0.x;
        pos.y+=pos0.y;
        this.stepPostfix.push(pos);
        this.fillPos(pos);
    }
}

ui.prototype.onup = function () {
    this.holdingPath=0;
    if(this.stepPostfix.length){
        var stepPostfix = [];
        var direction={'0':{'1':'down','-1':'up'},'-1':{'0':'left'},'1':{'0':'right'}};
        for(var ii=1;ii<this.stepPostfix.length;ii++){
            var pos0 = this.stepPostfix[ii-1];
            var pos = this.stepPostfix[ii];
            stepPostfix.push({'direction': direction[pos.x-pos0.x][pos.y-pos0.y], 'x': pos.x, 'y': pos.y});
        }
        var posx=this.stepPostfix[0].x;
        var posy=this.stepPostfix[0].y;
        this.stepPostfix=[];
        core.canvas.ui.clearRect(0, 0, 416,416);
        core.canvas.ui.restore();
        main.core.onclick(posx,posy,stepPostfix);
        //posx,posy是之前寻路的目标点,stepPostfix是后续的移动
    }
}

ui.prototype.scrollFunc = function(e) {
    var direct=0;
    if(e.wheelDelta){//IE/Opera/Chrome
        direct=Math.sign(e.wheelDelta);
    }else if(e.detail){//Firefox
        direct=Math.sign(e.detail);
    }
    main.core.onmousewheel(direct);
}




