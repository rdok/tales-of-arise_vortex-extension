import { IExtensionContext } from "vortex-api/lib/types/IExtensionContext";

export const EXECUTABLE_PATH = "Arise\\Binaries\\Win64\\Tales of Arise.exe";
export const STEAM_APP_ID = 740130;

export class GameRegistration {
  run(context: IExtensionContext) {
    context.registerGame({
      id: "talesofarise",
      name: "Tales of Arise",
      mergeMods: false,
      executable: () => EXECUTABLE_PATH,
      logo: "game_art.jpg",
      details: {
        steamAppId: STEAM_APP_ID,
        nexusPageId: "talesofarise",
      },
      queryModPath: function (gamePath: string): string {
        throw new Error("Function not implemented.");
      },
      requiredFiles: [EXECUTABLE_PATH],
      environment: { SteamAPPId: String(STEAM_APP_ID) },
    });
  }
}
