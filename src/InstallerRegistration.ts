import path from "path";
import { util } from "vortex-api";
import { TALESOFARISE_ID } from "./main";

type Props = { gameStoreHelper: typeof util.GameStoreHelper };

export class InstallerRegistration {
  private gameStoreHelper: any;
  private modFileExt = ".pak";

  constructor(props: Props) {
    this.gameStoreHelper = props.gameStoreHelper;
  }

  create() {
    const installerName = `${TALESOFARISE_ID}-PAK`;
    const priority = 25;
    const testSupportedContent = this.testSupportedContent;
    const installContent = this.installContent;

    return { installerName, priority, testSupportedContent, installContent };
  }

  testSupportedContent = (files: string[]) => {
    let supported =
      files.find(
        (file) => path.extname(file).toLowerCase() === this.modFileExt
      ) !== undefined;

    return Promise.resolve({
      supported,
      requiredFiles: [],
    });
  };

  installContent = (files: string[]) => {
    const modFile = files.find(
      (file) => path.extname(file).toLowerCase() === this.modFileExt
    );

    if (!modFile) return Promise.resolve({ instructions: [] });

    const idx = modFile.indexOf(path.basename(modFile));
    const rootPath = path.dirname(modFile);

    const filtered = files.filter(
      (file) => file.indexOf(rootPath) !== -1 && !file.endsWith(path.sep)
    );

    const instructions = filtered.map((file) => {
      return {
        type: "copy",
        source: file,
        destination: path.join(file.substr(idx)),
      };
    });

    return Promise.resolve({ instructions });
  };
}
