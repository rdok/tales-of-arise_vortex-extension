import { types, util } from "vortex-api";

import { GameRegistration } from "./GameRegistration";
const gameStoreHelper = util.GameStoreHelper;
const gameRegistration = new GameRegistration({ gameStoreHelper });

const main = (context: types.IExtensionContext) => {
  const game = gameRegistration.create();
  context.registerGame(game);
  return true;
};

export default main;
