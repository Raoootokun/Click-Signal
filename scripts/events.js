import { world, system, } from "@minecraft/server";
import { log, Util } from "./lib/Util";

world.afterEvents.buttonPush.subscribe(ev => {
    const { source, block, dimension } = ev;
});

world.afterEvents.leverAction.subscribe(ev => {
    const { source, block, dimension, isPowered } = ev;
});

world.afterEvents.pressurePlatePush.subscribe(ev => {
    const { source, block, dimension, } = ev;
});