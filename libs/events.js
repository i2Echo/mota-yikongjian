function events() {

}

events.prototype.init = function () {
    this.events = {
        'battle': function (data, core, callback) {
            //core.playSound('floor', 'mp3');
            //core.rmBlock('event', data.x, data.y);
            core.battle(data.event.id, data.x, data.y);
            if (core.isset(callback))
                callback();
        },
        'changeFloor': function (data, core, callback) {
            // core.changeFloor(data.event.data.floorId, data.event.data.heroLoc);
            core.changeFloor(data.event.data.floorId, data.event.data.stair,
                data.event.data.heroLoc, callback);
        },
        'getItem': function (data, core, callback) {
            core.getItem(data.event.id, 1, data.x, data.y);
            if (core.isset(callback))
                callback();
        },
        'openDoor': function (data, core, callback) {
            core.openDoor(data.event.id, data.x, data.y, true);
            if (core.isset(callback))
                callback();
        },
        'visitNpc': function (data, core, callback) {
            core.visitNpc(data.event.npcid, data.x, data.y);
            if (core.isset(callback))
                callback();
        },
        'openShop': function (data, core, callback) {
            core.openShop(data.event.shopid);
            if (core.isset(callback))
                callback();
        },
        'passNet': function (data, core, callback) {
            // core.passNet(data.event.id);
            this.passNet(data);
            if (core.isset(callback))
                callback();
        }
    }
}

events.prototype.getEvents = function (eventName) {
    if (eventName == undefined) {
        return this.events;
    }
    return this.events[eventName];
}

main.instance.events = new events();

////// 选中菜单栏 //////
events.prototype.selectSettings = function (y) {
    if (y == 3) {
        if (core.musicStatus.isIOS) {
            core.drawTip("iOS设备不支持播放音乐");
            return;
        }
        core.changeSoundStatus();
        core.openSettings(false);
    }
    if (y == 4) core.selectShop();
    if (y == 5) core.events.decreaseHard();
    if (y == 6) {
        core.showConfirmBox('你确定要清空所有存档吗？', function(){
            core.closePanel();
            localStorage.clear();
            core.drawTip("操作成功");
        }, function() {
            core.openSettings(false);
        });
    }
    if (y == 7) {
        core.showConfirmBox("你确定要重新开始吗？", function () {
            // core.drawTip("重新开始游戏");
            core.closePanel();
            core.restart();
        }, function () {
            core.openSettings(false);
        });
    }
    if (y==8) {
        core.drawAbout();
    }
    if (y == 9) core.closePanel();
    return;
}


////// 降低难度 //////
events.prototype.decreaseHard = function() {
    if (core.status.hard == 0) {
        core.drawTip("当前已是难度0，不能再降低难度了");
        return;
    }
    core.showConfirmBox("本次操作可生命+" + (1100 - 100 * core.status.hard) + "，确定吗？", function () {
        var add = 1100 - 100 * core.status.hard;
        core.status.hero.hp += add;
        core.status.hard--;
        core.updateStatusBar();
        core.closePanel();
        core.drawTip("降低难度成功，生命+" + add);
    }, function () {
        core.openSettings(false);
    });
}

////// 能否使用快捷商店 //////
events.prototype.canUseQuickShop = function(index) {
    if (core.status.floorId == 'MT20') return '当前不能使用快捷商店。';
    if (core.status.hero.flags.passLava) return '由于你刚刚经过岩浆，此时不得使用快捷商店。\n切换楼层后恢复。';
    return null;
}

////// 尝试使用道具 //////
events.prototype.useItem = function(itemId) {
    console.log("使用道具："+core.material.items[itemId].name);
    core.closePanel(false);

    if (itemId=='book') {
        core.openBook(false);
        return;
    }
    if (itemId=='fly') {
        core.useFly(false);
        return;
    }

    // TODO add other items
    if (core.canUseItem(itemId)) core.useItem(itemId);
    else core.drawTip("当前无法使用"+core.material.items[itemId].name);
}

/****** 打完怪物 ******/
events.prototype.afterBattle = function(enemyId, callback) {
    if (core.status.floorId == 'MT14' && !core.enemyExists(5,9) && !core.enemyExists(7,9)) {
        core.openDoor("specialDoor", 6, 8, false);
    }
    if (core.status.floorId == 'MT20') {
        // 检查封印
        if (!core.status.hero.flags.seal20F) {
            // 四个角都存在，四边都不存在
            if (core.enemyExists(5,5) && core.enemyExists(5,7) && core.enemyExists(7,7) && core.enemyExists(7,5)
                && !core.enemyExists(5,6) && !core.enemyExists(7,6) && !core.enemyExists(6,5) && !core.enemyExists(6,7)) {
                // 触发封印
                core.status.hero.flags.seal20F = true;
                core.material.enemys.fairy.hp /= 10;
                core.material.enemys.fairy.atk /= 10;
                core.material.enemys.fairy.def /= 10;
                core.updateFg();
                core.drawText([
                    {'content': '啊，我怎么被封印了！\n能量只剩下一成了！', 'id': 'fairy'}
                ]);
                // core.drawTip("触发仙子封印");
            }
        }
    }
}

/****** 经过路障 ******/
events.prototype.passNet = function (id) {
    if (id=='lavaNet') {
        core.status.hero.hp -= 100;
        if (core.status.hero.hp<=0) {
            core.status.hero.hp=0;
            core.updateStatusBar();
            core.events.lose();
            return;
        }
        core.status.hero.flags.passLava = true;
        core.updateStatusBar();
        core.drawTip('经过熔岩，生命-100');
    }
}

// NPC自定义操作
events.prototype.npcCustomAction = function (npcData) {

}

// 当点击(x,y)位置后自定义操作
events.prototype.npcCustomActionOnClick = function (npcData, x, y) {

}

// NPC自定义事件处理
events.prototype.npcCustomEffect = function (effect, npc) {

}

// 存档事件前一刻的处理
events.prototype.beforeSaveData = function(data) {

}

// 读档事件后，载入事件前，对数据的处理
events.prototype.afterLoadData = function(data) {
    // 重新封印仙子
    if (core.status.hero.flags.seal20F) {
        var fairy = core.material.enemys.fairy;
        fairy.hp/=10;
        fairy.atk/=10;
        fairy.def/=10;
    }
}

events.prototype.win = function() {
    // 获胜
    core.drawText('恭喜通关难度'+core.status.hard+'！你的分数是：'+core.status.hero.hp+"\n欢迎截图到发布帖下进行炫耀！\n\n再次感谢对本塔的支持！");
}

events.prototype.lose = function() {
    // 失败
    core.drawText('很不好意思，但是你死了。', function () {
        core.restart();
    });
}


// UI 部分

events.prototype.drawUIAbout = function (left, top, width, height) {
    var text_start = left + 24;

    // 名称
    core.canvas.ui.textAlign = "left";
    core.fillText('ui', "异空间", text_start, top+35, "#FFD700", "bold 22px Verdana");
    core.fillText('ui', "HTML5复刻版", text_start+100, top+37, "#DDDDDD", "bold 15px Verdana");
    core.fillText('ui', "作者： 艾之葵", text_start, top + 80, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "原作： ss433_2", text_start, top + 112, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "制作工具： WebStorm", text_start, top + 144, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "测试平台： Chrome/微信/iOS", text_start, top + 176, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', '特别鸣谢： ss433_2', text_start, top+208);
    var len = core.canvas.ui.measureText('特别鸣谢： ').width;
    core.fillText('ui', 'iEcho', text_start+len, top+240);
    core.fillText('ui', '打Dota的喵', text_start+len, top+272);
    core.fillText('ui', 'HTML5魔塔交流群：539113091', text_start, top+304);

    core.fillText('ui', '<点击任意位置继续>', 230, 368, '#CCCCCC', '13px Verdana');
}

events.prototype.drawUISettings = function (left, top, width, height) {
    core.canvas.ui.textAlign = "center";
    core.fillText('ui', "音乐： " + (core.musicStatus.soundStatus ? "[ON]" : "[OFF]"), 208, top + 56, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "快捷商店", 208, top + 88, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "降低难度", 208, top + 120, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "清空存档", 208, top + 152, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "重新开始", 208, top + 184, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "关于本塔", 208, top + 216, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "返回游戏", 208, top + 248, "#FFFFFF", "bold 17px Verdana");
}


