import { world, system, Dimension, } from "@minecraft/server";
import { log, Util } from "./lib/Util";
import { worldDB } from "./main";

export class ClickSignal {
    /**
     * @param {string} dimensionId 
     * @param {{ x:number, y:number, z:number, }} pos 
     * @param {string} command 
     * @returns {boolean}
     */
    bind(dimensionId, pos, command) {
        return worldDB.set(`${dimensionId}`);
    }

}