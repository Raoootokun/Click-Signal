import { world, system, } from "@minecraft/server";
import { log, Util } from "./lib/Util";
import { ClickSignal } from "./ClickSignal";

world.afterEvents.buttonPush.subscribe(ev => {
    const { source, block, dimension } = ev;

    if(!Util.isPlyaer(source))return;
    ClickSignal.run(source, dimension, block.location);
});

world.afterEvents.leverAction.subscribe(ev => {
    const { source, block, dimension, isPowered } = ev;

    if(!Util.isPlyaer(source))return;
    if(isPowered)return;
    ClickSignal.run(source, dimension, block.location);
});

world.afterEvents.pressurePlatePush.subscribe(ev => {
    const { source, block, dimension, } = ev;

    if(!Util.isPlyaer(source))return;
    ClickSignal.run(source, dimension, block.location);
});

world.beforeEvents.playerInteractWithBlock.subscribe(ev => {
    const { player, block, isFirstEvent, } = ev;

    if(!isFirstEvent)return;
    if(!block.getComponent("sign"))return;

    ClickSignal.run(player, player.dimension, block.location);
});