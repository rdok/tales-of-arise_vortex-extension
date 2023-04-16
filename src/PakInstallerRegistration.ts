import path from "path";
import {
  IInstallResult,
  IInstruction,
  ISupportedResult,
} from "vortex-api/lib/types/api";
import { TALESOFARISE_ID } from "./main";
import { pathToPakMods } from "./paths";

export type InstallerRegistrationOutput = {
  installerName: string;
  priority: number;
  testSupportedContent: (files: string[]) => Promise<ISupportedResult>;
  installContent: (files: string[]) => Promise<IInstallResult>;
};

export class PakInstallerRegistration {
  private modFileExt = ".pak";

  create(): InstallerRegistrationOutput {
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

  installContent = (files: string[]): Promise<IInstallResult> => {
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
        destination: path.join(...pathToPakMods(), file.slice(idx)),
      })
    );

    return Promise.resolve({ instructions });
  };
}
