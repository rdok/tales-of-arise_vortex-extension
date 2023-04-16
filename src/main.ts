import { GameRegistration } from "./GameRegistration";

type Props = { gameRegistration: GameRegistration };

const main = (context: any, props: Props) => {
  const { gameRegistration } = props;

  const game = gameRegistration.create();

  context.registerGame(game);

  return true;
};

export default main;
