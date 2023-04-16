import { types, util } from "vortex-api";

export const EXECUTABLE_PATH = "Arise\\Binaries\\Win64\\Tales of Arise.exe";
export const STEAMAPP_ID = 740130;

type Props = { gameStoreHelper: typeof util.GameStoreHelper };

export class GameRegistration {
  private gameStoreHelper: any;

  constructor(props: Props) {
    this.gameStoreHelper = props.gameStoreHelper;
  }

  create(): types.IGame {
    return {
      id: "talesofarise",
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
    };
  }
}
