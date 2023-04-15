import { types } from "vortex-api";

const EXECUTABLE_PATH = "Arise\\Binaries\\Win64\\Tales of Arise.exe";
const STEAM_APP_ID = 740130;

const main = (context: types.IExtensionContext) => {
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

  context.registerAction("global-icons", 100, "menu", {}, "Sample", () => {
    context.api.showDialog &&
      context.api.showDialog(
        "info",
        "Success!",
        {
          text: "Hello World",
        },
        [{ label: "Close" }]
      );
  });
  return true;
};

export default main;
