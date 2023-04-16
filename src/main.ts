import { GameRegistration } from "./GameRegistration";

/**
 * vortex-api does not work properly with jest when attempting to mock it's types.
 */
type Props = {
  gameStoreHelper: any;
};

const main = (context: any, props: Props) => {
  const gameRegistration = new GameRegistration({
    gameStoreHelper: props.gameStoreHelper,
  });

  const game = gameRegistration.create();
  context.registerGame(game);
  return true;
};

export default main;
