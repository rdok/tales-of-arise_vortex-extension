import { types } from "vortex-api";
import { GameStoreHelper as gameStoreHelper } from "vortex-api/lib/util/api";
import { GameRegistration } from "./GameRegistration";

const main = (context: types.IExtensionContext) => {
  const gameRegistration = new GameRegistration({ gameStoreHelper });
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
