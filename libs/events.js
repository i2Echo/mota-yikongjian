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
            core.events.passNet(data);
            if (core.isset(callback))
                callback();
        },
        'blockEvent': function (data, core, callback) {
            core.events.blockEvent(data);
            if (core.isset(callback)) callback();
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

events.prototype.startGame = function (hard) {

    core.hideStartAnimate(function() {
        core.drawText([
            "我是一位勇士。\n不，应该说，我曾经是一位勇士。",
            "我奉国王之命，冲进魔塔。\n杀死魔王，拯救被抓走的公主。",
            "但是，我杀死了魔王并没有选择离开。\n而是选择跟随仙子，集齐灵杖消灭了塔顶的血影。",
            "最终，虽然我成功杀死了血影。\n但是我根本就找不到回来的路。",
            "原来，血影根本就不在塔顶。\n而是，位于....异空间。",
            "只可惜，异空间的入口只能进不能出。\n我深陷在这狭长的异空间内无法逃离。",
            "我杀死血影以后的不久，\n魔塔失去了重心倒塌了。",
            "在我的身边，烧起了熊熊大火。",
            "而我，注定要被埋葬在这一片烈火之中吗？",
            "我倒在地上，意识已经渐渐地模糊了。",
            "公主，不知道你现在怎样了。\n已经离开魔塔了吗？",
            "不管怎样，我再也见不到你了。",
            "就这样吧，也许，这里，就是我的终点。",
            "就这样...不知道过了多久..."
        ], function() {
            core.startGame(10);
        });
    })
}

////// 转换楼层结束的事件 //////
events.prototype.afterChangeFloor = function (floorId) {

    core.status.hero.flags.passLava = false;

    // 首次到达某层
    if (!core.isset(core.status.hero.flags.visitFloors[floorId])) {
        core.status.hero.flags.visitFloors[floorId]=true;
        if (floorId=='MT1') {
            core.drawText([
                {'content': '这里...是哪里？', 'id': 'hero'},
                {'content': '难道？我还活着？', 'id': 'hero'},
                {'content': '一股似曾相识的感觉，\n但我又不知道在哪里见过。', 'id': 'hero'},
                {'content': '魔塔已经被大火烧成了灰烬，\n这里为什么安然无恙？这到底是什么地方？', 'id': 'hero'},
                {'content': '这里，我感觉到不像是我生活的地方。\n难道我已经到了异世界吗？', 'id': 'hero'},
                {'content': '算了，不管这么多了。\n只要我还活着，一切都好。', 'id': 'hero'},
                {'content': '我先四处看看要怎么出去吧。', 'id': 'hero'},
                {'content': '（系统提示）本塔快捷键如下：\n\n[↑][↓][←][→]    移动\n[X]    怪物手册\n[G]    楼层传送器\n[T]    工具栏\n[K]    快捷商店\n[S/L]    存/读档\n[ESC]    菜单栏\n同时也可以点击状态栏中的图标进行操作。'},
                {'content': '（系统提示）\n在菜单栏里可以同步存档，这样可以很方便的让你\n在多设备（例如手机/电脑）之间接档游戏。'}
            ]);
        }
        if (floorId=='MT2') {
            core.drawText([
                {'content': '奇怪，我明明杀死了血影。\n为什么这里又出现了一个。', 'id': 'hero'},
                {'content': '不过我的力量似乎都被冻结了。\n目前肯定是无法杀死血影，\n等我变强以后再回来吧。', 'id': 'hero'},
            ]);
        }
        if (floorId=='MT11') {
            core.drawText([
                {'content': '诶，奇怪，我明明只是上了一层楼而已。\n为什么，这里变得如此的寒冷...', 'id': 'hero'},
                {'content': '诶，毕竟我已经不在我生活的世界了。\n很多事情都是预料不到的。', 'id': 'hero'},
                {'content': '不管怎么说，我要继续上去看个究竟。', 'id': 'hero'}
            ])
        }
        if (floorId=='MT20') {
            core.drawText([
                {'content': '这...这里就是塔顶了吗。\n仙子，你怎么也在这里。\n魔塔倒塌了，你也死掉了所以到达这里了吗？', 'id': 'hero'},
                {'content': '呵，怎么可能。我怎么会这么容易死。\n这里就是位面的交界处了，\n我就是这个位面的操纵者。', 'id': 'fairy'},
                {'content': '你居然有这样强大的能力！\n跟我第一次遇见你差距太大了吧！', 'id': 'hero'},
                {'content': '是的，一开始，我弱不禁风。\n但是你帮我集齐了十字架和三个灵杖，\n让我的能力得到了巨幅度的提高。', 'id': 'fairy'},
                {'content': '估计你自己也想不到这些东西有这么大的威力。\n不过还要感谢你的无私奉献成就了我的现在。', 'id': 'fairy'},
                {'content': '......', 'id': 'hero'},
                {'content': '其实，魔塔倒塌是我一手策划的，\n就是为了把所有的生物都驱逐进这个亡灵位面。', 'id': 'fairy'},
                {'content': '我一直策划着等我有一天变强了，\n我要一人统治世界，消灭掉所有的其他生物。\n如今我的目标达成了。', 'id': 'fairy'},
                {'content': '消灭其他所有生物？也就是说也包括我？', 'id': 'hero'},
                {'content': '没错。愚蠢的人类终于觉悟了。', 'id': 'fairy'},
                {'content': '呵呵，想当初，我就应该一刀把你杀了。\n真没想到我会轻信你的鬼话。', 'id': 'hero'},
                {'content': '现在说这些还有什么用呢，\n你和我的力量根本就不是一个级别的。\n劝你放弃抵抗吧。', 'id': 'fairy'},
                {'content': '（仙子有来源于高维度的力量支持，\n所以目前强大无比。我是不可能战胜的。）', 'id': 'hero'},
                {'content': '（不过，这个位面力量非常不稳定，\n如果我能成功的封印她，切断外界的支持，\n也许还能有机会求胜。）', 'id': 'hero'},
                {'content': '（仙子目前的位置正好被八个小怪包围，\n如果按照当年封印Zeno的方法去封印她，\n能否成功呢？这是我唯一的希望。）', 'id': 'hero'},
                {'content': '系统提示：（专门给没玩过TSW的玩家看的）\n击杀仙子周围的四个怪，保留四个角的怪。\n如果还看不懂的，看一眼你的小键盘，\n仙子在5的位置，击杀2468。'},
            ]);
        }
    }
}

////// 走到某位置时触发事件 //////
events.prototype.blockEvent = function (data) {

    if (core.status.floorId=='MT16' && data.x==6 && data.y==2) {
        core.waitHeroToStop(function (){
            // 和魔王对话
            core.drawText([
                {'content': '冥灵魔王？你不是已经被我杀了吗？\n为什么会出现在这里？？', 'id': 'hero'},
                {'content': '因为...这里位于魔塔的另一个位面。\n大多数情况下，塔内死亡的生物都会回归这里。', 'id': 'vampire'},
                {'content': '你的意思是说，我现在已经死了？', 'id': 'hero'},
                {'content': '是的，能到达这里的，\n除了可以掌控位面的高智慧生物以外，只有\n亡灵。', 'id': 'vampire'},
                {'content': '呵，既然，我的生命已经不复存在。\n我已经没有什么好怕的了。\n大魔头，我们冤家路窄，居然又见面了，\n决斗吧！', 'id': 'hero'},
                {'content': '你似乎还没明白。。。', 'id': 'vampire'},
                {'content': '明白什么？', 'id': 'hero'},
                {'content': '诶，算了，决一死战吧。', 'id': 'vampire'},
            ], function() {
                core.removeBlock('data', data.x, data.y);
            })
        });
        return;
    }

}

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
    if (y == 5) this.decreaseHard();
    if (y == 6) {
        core.syncSave();
        /*
        core.showConfirmBox('你确定要清空所有存档吗？', function(){
            core.closePanel();
            localStorage.clear();
            core.drawTip("操作成功");
        }, function() {
            core.openSettings(false);
        });
        */
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
        // core.debug();
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
    var add = 100, x=core.status.hard;
    while (x<10) {
        x++; add*=2;
    }
    core.showConfirmBox("本次操作可生命+" + add + "，确定吗？", function () {
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
events.prototype.afterBattle = function(enemyId) {
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
                core.clearContinueAutomaticRoute();
                return;
            }
        }
        // 打败仙子
        if (enemyId == 'fairy') {
            core.events.win();
            core.clearContinueAutomaticRoute();
            return;
        }
    }


    //继续行走
    core.continueAutomaticRoute();
}

/****** 开完门 ******/
events.prototype.afterOpenDoor = function(doorId) {

    //继续行走
    core.continueAutomaticRoute();
}

/****** 经过路障 ******/
events.prototype.passNet = function (data) {
    if (data.event.id=='lavaNet') {
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

    core.waitHeroToStop(function() {
        core.clearMap('all');
        core.rmGlobalAnimate(0,0,true);
        core.drawText([
            {'content': '终于，我逃脱了这个可怕的异空间。', 'id': 'hero'},
            {'content': '接下来，我要何去何从。', 'id': 'hero'},
            {'content': '顺着这条漆黑的甬道走下去，\n我能回到我的现实世界吗？', 'id': 'hero'},
            {'content': '恭喜通关难度' + core.status.hard + '！你的分数是：' + core.status.hero.hp + '\n欢迎截图到发布帖下进行炫耀！\n\n再次感谢对本塔的支持！'}
        ], function () {
            core.restart();
        })
    });
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
    core.fillText('ui', "HTML5复刻版", text_start+75, top+37, "#DDDDDD", "bold 15px Verdana");
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
    core.fillText('ui', "同步存档", 208, top + 152, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "重新开始", 208, top + 184, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "关于本塔", 208, top + 216, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "返回游戏", 208, top + 248, "#FFFFFF", "bold 17px Verdana");
}


