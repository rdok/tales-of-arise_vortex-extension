import { GameRegistration } from "./GameRegistration";
import { PakInstallerRegistration } from "./installers/PakInstallerRegistration";
import { UsmInstallerRegistration } from "./installers/UsmInstallerRegistration";

type Props = {
  gameRegistration: GameRegistration;
  pakInstallerRegistration: PakInstallerRegistration;
  usmInstallerRegistration: UsmInstallerRegistration;
};

export const STEAMAPP_ID = 740130;
export const TALESOFARISE_ID = "talesofarise";

const main = (
  context: any,
  {
    usmInstallerRegistration,
    gameRegistration,
    pakInstallerRegistration,
  }: Props
) => {
  const game = gameRegistration.create();
  context.registerGame(game);

  const pakInstaller = pakInstallerRegistration.create();
  context.registerInstaller(
    pakInstaller.installerName,
    pakInstaller.priority,
    pakInstaller.testSupportedContent,
    pakInstaller.installContent
  );

  const usmInstaller = usmInstallerRegistration.create();
  context.registerInstaller(
    usmInstaller.installerName,
    usmInstaller.priority,
    usmInstaller.testSupportedContent,
    usmInstaller.installContent
  );

  return true;
};

export default main;
