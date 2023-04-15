import { types } from "vortex-api";

const main = (context: types.IExtensionContext) => {
  context.registerGame({
    id: "talesofarise",
    queryModPath: function (gamePath: string): string {
      throw new Error("Function not implemented.");
    },
    mergeMods: false,
    name: "",
    executable: function (discoveredPath?: string | undefined): string {
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
