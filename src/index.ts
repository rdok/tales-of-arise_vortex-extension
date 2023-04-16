import { types, util } from "vortex-api";

import main from "./main";
import { GameRegistration } from "./GameRegistration";

const index = (context: types.IExtensionContext) => {
  const gameStoreHelper = util.GameStoreHelper;
  const gameRegistration = new GameRegistration({ gameStoreHelper });
  main(context, { gameRegistration });
};

export default index;
