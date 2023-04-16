import { IGameStoreEntry, IExtensionContext } from "vortex-api/lib/types/api";
import { GameStoreHelper } from "vortex-api/lib/util/api";

export const EXECUTABLE_PATH = "Arise\\Binaries\\Win64\\Tales of Arise.exe";
export const STEAMAPP_ID = 740130;

type Props = { gameStoreHelper: typeof GameStoreHelper };

export class GameRegistration {
  private gameStoreHelper: any;

  constructor(props: Props) {
    this.gameStoreHelper = props.gameStoreHelper;
  }

  run(context: IExtensionContext) {
    const game = {
      id: "talesofarise",
      name: "Tales of Arise",
      mergeMods: false,
      executable: () => EXECUTABLE_PATH,
      logo: "game_art.jpg",
      details: {
        steamAppId: STEAMAPP_ID,
        nexusPageId: "talesofarise",
      },
      queryModPath: () =>
        this.gameStoreHelper
          .findByAppId([String(STEAMAPP_ID)])
          .then((game: IGameStoreEntry) => game.gamePath),
      requiredFiles: [EXECUTABLE_PATH],
      environment: { SteamAPPId: String(STEAMAPP_ID) },
    };

    context.registerGame(game);

    return game;
  }
}
