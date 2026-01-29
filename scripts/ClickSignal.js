import { world, system, Dimension, Player, } from "@minecraft/server";
import { log, Util } from "./lib/Util";
import { worldDB } from "./main";
import { Vector } from "./lib/Vector";

export class ClickSignal {
    static get dimensionIds() {
        return [ "overworld", "nether", "the_end" ];
    };

    /**
     * @param {string} dimensionId 
     * @param {{ x:number, y:number, z:number, }} pos 
     * @param {string} command 
     */
    static bind(dimensionId, pos, command) {
        if(ClickSignal.dimensionIds.includes(dimensionId))return -1;

        pos = Vector.floor(pos);

        const res = worldDB.set(`${dimensionId}.${pos.x}.${pos.y}.${pos.z}`, command);
        if(res)return 1;
        else return -2; 
    }

    /**
     * @param {string} dimensionId 
     * @param {{ x:number, y:number, z:number, }} pos 
     */
    static unbind(dimensionId, pos) {
        if(ClickSignal.dimensionIds.includes(dimensionId))return -1;
        pos = Vector.floor(pos);

        if(!worldDB.has(`${dimensionId}.${pos.x}.${pos.y}.${pos.z}`))return -2;

        worldDB.delete(`${dimensionId}.${pos.x}.${pos.y}.${pos.z}`);
        return 1;
    }

    /**
     * @param {string} dimensionId 
     */
    static unbindAll(dimensionId) {
        if(ClickSignal.dimensionIds.includes(dimensionId))return -1;

        const keys = worldDB.keys().filter(key => key.startsWith(dimensionId));
        if(keys.length == 0)return -2;

        for(const key of keys) {
            worldDB.delete(key);
        }
        return keys.length;
    }

    /**
     * @param {string} dimensionId 
     */
    static list(dimensionId = undefined) {
        if(ClickSignal.dimensionIds.includes(dimensionId) && dimensionId != undefined)return -1;

        let keys = worldDB.keys();
        if(dimensionId)keys.filter(key => key.startsWith(dimensionId));

        if(keys.length == 0)return -2;

        const arr = [];
        for(const key of keys) {
            const keyArr = key.split(`.`);
            const dimensionId_ = keyArr[0];
            const pos = { x:keyArr[1]*1, y:keyArr[2]*1, z:keyArr[3]*1 };
            const command = worldDB.get(key);

            arr.push(`${dimensionId_}: (${pos.x}, ${pos.y}, ${pos.z}), ${command}§r`);
        };

        return arr.join(`\n`);
    }




    /**
     * @param {Player} player 
     * @param {Dimension} dimension 
     * @param {{ x:number, y:number, z:number, }} pos 
     */
    static run(player, dimension, pos) {
        const key = `${dimension.id}.${pos.x}.${pos.y}.${pos.z}`;
        if(!worldDB.has(key))return;

        const command = worldDB.get(key);
        try{
            player.runCommand(command);
        }catch(e) {
            world.sendMessage(`§c[Click Signal][Error]: コマンド実行失敗\nエラー: ${e?.message ?? e}\nコマンド: ${command}\n座標: ${pos.x}, ${pos.y}, ${pos.z}`);
        };
    }

}