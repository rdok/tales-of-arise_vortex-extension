import { GameRegistration } from "./GameRegistration";

type Props = { gameRegistration: GameRegistration };

export const EXECUTABLE_PATH = "Arise\\Binaries\\Win64\\Tales of Arise.exe";
export const STEAMAPP_ID = 740130;
export const ID = "talesofarise";

const main = (context: any, props: Props) => {
  const { gameRegistration } = props;

  const game = gameRegistration.create();
  context.registerGame(game);

  const pakPriority = 25;
  context.registerInstaller(`${ID}-PAK`, pakPriority);

  return true;
};

export default main;
