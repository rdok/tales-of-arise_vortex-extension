import { fs, types, util } from "vortex-api";

import main from "./main";
import { GameRegistration } from "./GameRegistration";
import {
  PakInstallerRegistration,
  UsmInstallerRegistration,
} from "./installers";

const index = (context: types.IExtensionContext) => {
  const gameStoreHelper = util.GameStoreHelper;
  const ensureDirAsync = fs.ensureDirAsync;
  const gameRegistration = new GameRegistration({
    gameStoreHelper,
    ensureDirAsync,
  });
  const pakInstallerRegistration = new PakInstallerRegistration();
  const usmInstallerRegistration = new UsmInstallerRegistration();

  return main(context, {
    gameRegistration,
    pakInstallerRegistration,
    usmInstallerRegistration,
  });
};

export default index;
