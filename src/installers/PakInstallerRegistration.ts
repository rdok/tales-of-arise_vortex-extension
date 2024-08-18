import path from "path";
import {
  IInstallResult,
  IInstruction,
  InstallFunc,
  TestSupported,
} from "vortex-api/lib/types/api";
import { TALESOFARISE_ID } from "../main";
import { pakModsPath } from "../paths";

export type PakInstallerRegistrationOutput = {
  installerName: string;
  priority: number;
  testSupportedContent: TestSupported;
  installContent: InstallFunc;
};

export class PakInstallerRegistration {
  private modFileExt = ".pak";

  create(): PakInstallerRegistrationOutput {
    const installerName = `${TALESOFARISE_ID}-PAK`;
    const priority = 25;
    const testSupportedContent = this.testSupportedContent;
    const installContent = this.installContent;

    return { installerName, priority, testSupportedContent, installContent };
  }

  testSupportedContent: TestSupported = (files: string[], gameId: string) => {
    if (gameId !== TALESOFARISE_ID) {
      console.debug(
        `${TALESOFARISE_ID}.${PakInstallerRegistration.name}.testSupportedContent:`,
        `Invalid game id. Expected ${TALESOFARISE_ID}. Actual: ${gameId}`
      );
      return Promise.resolve({
        supported: false,
        requiredFiles: [],
      });
    }

    const supported =
      gameId === TALESOFARISE_ID &&
      files.find((file) => {
        console.debug(`TALESOFARISE_ID: file received: ${file}`);
        return path.extname(file).toLowerCase() === this.modFileExt;
      }) !== undefined;

    return Promise.resolve({
      supported,
      requiredFiles: [],
    });
  };

  installContent: InstallFunc = (
    files: string[],
    destinationPath: string,
    gameId: string
  ): Promise<IInstallResult> => {
    if (gameId !== TALESOFARISE_ID) {
      console.debug(
        `${TALESOFARISE_ID}.${PakInstallerRegistration.name}.installContent:`,
        `Invalid game id. Expected ${TALESOFARISE_ID}. Actual: ${gameId}`
      );
      return Promise.resolve({
        instructions: [],
      });
    }

    const modFile = files.find(
      (file) => path.extname(file).toLowerCase() === this.modFileExt
    );

    if (!modFile) return Promise.resolve({ instructions: [] });
    const idx = modFile.indexOf(path.basename(modFile));
    const rootPath = path.dirname(modFile);

    const filtered = files.filter(
      (file) => file.indexOf(rootPath) !== -1 && !file.endsWith(path.sep)
    );

    const instructions = filtered.map(
      (file): IInstruction => ({
        type: "copy",
        source: file,
        destination: path.join(pakModsPath(), file.slice(idx)),
      })
    );

    return Promise.resolve({ instructions });
  };
}
