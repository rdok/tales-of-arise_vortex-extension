import { types } from "vortex-api";

const EXECUTABLE = "Arise\\Binaries\\Win64\\Tales of Arise.exe";

const main = (context: types.IExtensionContext) => {
  context.registerGame({
    id: "talesofarise",
    name: "Tales of Arise",
    mergeMods: false,
    executable: () => EXECUTABLE,
    logo: "game_art.jpg",
    details: {
      steamAppId: 740130,
      nexusPageId: "talesofarise",
    },
    queryModPath: function (gamePath: string): string {
      throw new Error("Function not implemented.");
    },
    requiredFiles: [EXECUTABLE],
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
