import { GameRegistration } from "./GameRegistration";
import { PakInstallerRegistration } from "./PakInstallerRegistration";

type Props = {
  gameRegistration: GameRegistration;
  pakInstallerRegistration: PakInstallerRegistration;
};

export const STEAMAPP_ID = 740130;
export const TALESOFARISE_ID = "talesofarise";

const main = (context: any, props: Props) => {
  const { gameRegistration, pakInstallerRegistration } = props;

  const game = gameRegistration.create();
  context.registerGame(game);

  const pakInstaller = pakInstallerRegistration.create();
  context.registerInstaller(
    pakInstaller.installerName,
    pakInstaller.priority,
    pakInstaller.testSupportedContent,
    pakInstaller.installContent
  );

  return true;
};

export default main;
