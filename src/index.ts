import { fs, types, util } from "vortex-api";

import main from "./main";
import { GameRegistration } from "./GameRegistration";
import { PakInstallerRegistration } from "./PakInstallerRegistration";

const index = (context: types.IExtensionContext) => {
  const gameStoreHelper = util.GameStoreHelper;
  const ensureDirAsync = fs.ensureDirAsync;
  const gameRegistration = new GameRegistration({
    gameStoreHelper,
    ensureDirAsync,
  });
  const pakInstallerRegistration = new PakInstallerRegistration();

  return main(context, { gameRegistration, pakInstallerRegistration });
};

export default index;
