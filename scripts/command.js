import { world, system, CommandPermissionLevel, CustomCommandParamType, CustomCommandStatus, } from "@minecraft/server";
import { ClickSignal } from "./ClickSignal";

const PREFIX = "cs";

const COMMAND_LIST = [
    { //bind
        command: {
            name: `${PREFIX}:` + "bind",
            description: "bind",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            cheatsRequired: true,
            mandatoryParameters: [
                { type: CustomCommandParamType.Enum, name: "cs:dimensionId" },
                { type: CustomCommandParamType.Location, name: "location" },
                { type: CustomCommandParamType.String, name: "command" },
            ]
        },
        alias: [  ],
        func: function(origin, ...args) {
            const dimensionId = args[0];
            const location = args[1];
            const command = args[2];

            const res = ClickSignal.bind(dimensionId, location, command);
            if(res == -1)return {
                message: `§c"${dimensionId}" ではディメンションは見つかりませんでした`,
                status: CustomCommandStatus.Failure,
            };
            if(res == -2)return {
                message: `§c保存に失敗しました. コマンドの構文が長すぎる可能性があります`,
                status: CustomCommandStatus.Failure,
            };
            
            return {
                message: `§f${dimensionId}(§7${location.x}§f, §7${location.y}§f, §7${location.z}§f) に ${command} §rを登録しました`,
                status: CustomCommandStatus.Success,
            };
        }
    },
    { //unbind
        command: {
            name: `${PREFIX}:` + "unbind",
            description: "unbind",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            cheatsRequired: true,
            mandatoryParameters: [
                { type: CustomCommandParamType.Enum, name: "cs:dimensionId" },
                { type: CustomCommandParamType.Location, name: "location" },
            ]
        },
        alias: [  ],
        func: function(origin, ...args) {
            const dimensionId = args[0];
            const location = args[1];

            const res = ClickSignal.unbind(dimensionId, location);
            if(res == -1)return {
                message: `§c"${dimensionId}" ではディメンションは見つかりませんでした`,
                status: CustomCommandStatus.Failure,
            };
            if(res == -2)return {
                message: `§c${location.x}, ${location.y}, ${location.z} にコマンドは登録されていません`,
                status: CustomCommandStatus.Failure,
            };
            
            return {
                message: `§f${dimensionId}(§7${location.x}§f, §7${location.y}§f, §7${location.z}§f) の登録を解除しました`,
                status: CustomCommandStatus.Success,
            };
        }
    },
    { //unbind_all
        command: {
            name: `${PREFIX}:` + "unbind_all",
            description: "unbind_all",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            cheatsRequired: true,
            mandatoryParameters: [
                { type: CustomCommandParamType.Enum, name: "cs:dimensionId" },
            ]
        },
        alias: [  ],
        func: function(origin, ...args) {
            const dimensionId = args[0];

            const res = ClickSignal.unbindAll(dimensionId);
            if(res == -1)return {
                message: `§c"${dimensionId}" ではディメンションは見つかりませんでした`,
                status: CustomCommandStatus.Failure,
            };
            if(res == -2)return {
                message: `§c"${dimensionId}" ではコマンドは登録されていません`,
                status: CustomCommandStatus.Failure,
            };
            
            return {
                message: `${dimensionId} のすべての登録を解除しました(${res}件)`,
                status: CustomCommandStatus.Success,
            };
        }
    },
    { //bind_list
        command: {
            name: `${PREFIX}:` + "bind_list",
            description: "bind_list",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            cheatsRequired: true,
            optionalParameters: [
                { type: CustomCommandParamType.Enum, name: "cs:dimensionId" },
            ]
        },
        alias: [  ],
        func: function(origin, ...args) {
            const dimensionId = args[0];

            const res = ClickSignal.list(dimensionId);
            if(res == -1)return {
                message: `§c"${dimensionId}" ではディメンションは見つかりませんでした`,
                status: CustomCommandStatus.Failure,
            };
            if(res == -2)return {
                message: `§c"${dimensionId}" ではコマンドは登録されていません`,
                status: CustomCommandStatus.Failure,
            };
            
            return {
                message: `--- 登録情報---\n${res}\n------------`,
                status: CustomCommandStatus.Success,
            };
        }
    },
 
];

const ENUM_LIST = {
    "cs:dimensionId": [ "overworld", "nether", "the_end" ],
};

system.beforeEvents.startup.subscribe(ev => {
    for(const key of Object.keys(ENUM_LIST)) {
        const ENUM = ENUM_LIST[key];
        ev.customCommandRegistry.registerEnum(key, ENUM);
    }

    for(const DATA of COMMAND_LIST) {
        ev.customCommandRegistry.registerCommand(DATA.command, DATA.func);

        if(DATA?.alias?.length > 0) {
            for(const alia of DATA.alias) {
                const commandCopy = JSON.parse(JSON.stringify(DATA.command));
                commandCopy.name = `${PREFIX}:` + alia;

                ev.customCommandRegistry.registerCommand(commandCopy, DATA.func);
            }
            
        }
    }
});