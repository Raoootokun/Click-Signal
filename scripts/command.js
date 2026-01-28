import { world, system, CommandPermissionLevel, CustomCommandParamType, CustomCommandStatus, } from "@minecraft/server";

const PREFIX = "cs";

const COMMAND_LIST = [
    { //bind
        command: {
            name: `${PREFIX}:` + "bind",
            description: "bind",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            cheatsRequired: true,
            mandatoryParameters: [
                { type: CustomCommandParamType.Enum, name: "cs:dimension" },
                { type: CustomCommandParamType.Location, name: "location" },
                { type: CustomCommandParamType.Integer, name: "command" },
            ]
        },
        alias: [  ],
        func: function(origin, ...args) {
            const dimension = args[0];
            const location = args[1];
            const command = args[2];

            if(!ENUM_LIST["eh:dimension"].includes(dimension))return {
                message: `§c"${dimension}" ではバイオームは見つかりませんでした`,
                status: CustomCommandStatus.Failure,
            };
            
            return {
                message: `${players.map(p => p.name).join(", ")} の ${text}(${objectiveId}) を ${score} に設定しました`,
                status: CustomCommandStatus.Success,
            };
        }
    },
 
];

const ENUM_LIST = {
    "cs:dimension": [ "overworld", "nether", "the_end" ],
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