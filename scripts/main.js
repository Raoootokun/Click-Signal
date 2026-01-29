import { world, system, } from "@minecraft/server";
import { WorldLoad } from "./lib/WorldLoad";
import { PlayerDB, WorldDB } from "./lib/Database";
import { log, Util } from "./lib/Util";

import "./events";
import "./command"

export const worldDB = new WorldDB("cs");
export const playerDB = new PlayerDB("cs");

export const VERSION = [ 1, 0, 0 ];

WorldLoad.subscribe(ev => {
    ev.reloadLog(`§7Click Signal`, VERSION);
});