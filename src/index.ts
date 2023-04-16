import { types, util } from "vortex-api";

import main from "./main";

const index = (context: types.IExtensionContext) => {
  main(context, { gameStoreHelper: util.GameStoreHelper });
};

export default index;
