import { types } from "vortex-api";
import { GameRegistration } from "./GameRegistration";

const gameRegistration = new GameRegistration();

const main = (context: types.IExtensionContext) => {
  gameRegistration.run(context);
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
