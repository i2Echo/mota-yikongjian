function npcs() {

}

npcs.prototype.init = function () {
    this.npcs = {
        'npc1': {'id': 'npc1', 'name': '神秘老人', 'icon': 'magician'},
        'npc2': {'id': 'npc2', 'name': '一个木牌', 'icon': 'wood'},
        'npc3': {'id': 'npc3', 'name': '一个木牌', 'icon': 'wood'},
        'npc4': {'id': 'npc4', 'name': '一个木牌', 'icon': 'wood'},
        'npc5': {'id': 'npc5', 'name': '一个木牌', 'icon': 'wood'},
        'npc6': {'id': 'npc6', 'name': '一个木牌', 'icon': 'wood'},
        'npc7': {'id': 'npc7', 'name': '一个木牌', 'icon': 'wood'},
    }
}

npcs.prototype.getNpcs = function (npcId) {
    if (npcId == undefined) return this.npcs;
    return this.npcs[npcId];
}

npcs.prototype.getEffect = function (npcid, times) {
    switch (npcid) {
        case 'npc1':
            if (times == 0) {
                return [
                    {
                        'type': 'text', 'id': 'npc1',
                        'content': '提示：灰色的水泥墙比棕色的更为坚固。\n用破墙镐无法破坏水泥墙。\n例如本层墙内的宝物，可以使用地震卷轴获取。'
                    },
                ];
            }
            break;
    }
    return [];
}

main.instance.npcs = new npcs();