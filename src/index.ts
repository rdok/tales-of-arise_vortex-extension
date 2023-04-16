import { types, util } from "vortex-api";

import { GameRegistration } from "./GameRegistration";

const main = (context: types.IExtensionContext) => {
  const gameRegistration = new GameRegistration({
    gameStoreHelper: util.GameStoreHelper,
  });
  gameRegistration.run(context);
  return true;
};

export default main;
