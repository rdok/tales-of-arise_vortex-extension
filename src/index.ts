import { types } from "vortex-api";

const main = (context: types.IExtensionContext) => {
  context.registerGame({
    id: "talesofarise",
    name: "Tales of Arise",
    mergeMods: false,
    executable: () => "Arise\\Binaries\\Win64\\Tales of Arise.exe",

    queryModPath: function (gamePath: string): string {
      throw new Error("Function not implemented.");
    },
    requiredFiles: [],
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
