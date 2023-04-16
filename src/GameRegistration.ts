import path from "path";
import { types } from "vortex-api";
import { EXECUTABLE_PATH, STEAMAPP_ID, TALESOFARISE_ID } from "./main";
import { pathToPakMods } from "./paths";

type Props = {
  gameStoreHelper: any;
  ensureDirAsync: any;
};

export class GameRegistration {
  private gameStoreHelper: any;
  private ensureDirAsync: any;

  constructor(props: Props) {
    this.gameStoreHelper = props.gameStoreHelper;
    this.ensureDirAsync = props.ensureDirAsync;
  }

  create(): types.IGame {
    return {
      id: TALESOFARISE_ID,
      name: "Tales of Arise",
      mergeMods: false,
      executable: () => EXECUTABLE_PATH,
      logo: "game_art.jpg",
      details: {
        steamAppId: STEAMAPP_ID,
        nexusPageId: "talesofarise",
      },
      queryModPath: () => ".",
      requiredFiles: [EXECUTABLE_PATH],
      environment: { SteamAPPId: String(STEAMAPP_ID) },
      queryPath: () =>
        this.gameStoreHelper
          .findByAppId([String(STEAMAPP_ID)])
          .then((game: types.IGameStoreEntry) => game.gamePath),
      requiresCleanup: true,
      setup: (discovery: types.IDiscoveryResult) => {
        if (!discovery.path) throw new Error("`discovery.path` is undefined.");

        return this.ensureDirAsync(
          path.join(discovery.path, ...pathToPakMods())
        );
      },
    };
  }
}
