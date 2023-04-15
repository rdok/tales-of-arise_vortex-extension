import { types } from "vortex-api";

const main = ({ registerAction, api }: types.IExtensionContext) => {
  registerAction("global-icons", 100, "menu", {}, "Sample", () => {
    api.showDialog &&
      api.showDialog(
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
