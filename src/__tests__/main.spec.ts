import { GameRegistration } from "../GameRegistration";

import { makeVortexApi } from "../../jest/factories";
import { createMock } from "ts-auto-mock";
import { IGame } from "vortex-api/lib/types/api";

it("creates the game registration", async () => {
  const { context, main, gameRegistration } = await makeFactory();
  main(context, { gameRegistration });

  expect(gameRegistration.create).toHaveBeenCalled();
});

it("registers the game", async () => {
  const { context, main, gameRegistration, game } = await makeFactory();
  main(context, { gameRegistration });

  expect(context.registerGame).toHaveBeenCalledWith(game);
});

const makeFactory = async () => {
  const main = (await import("../main")).default;
  const game = createMock<IGame>();
  const gameRegistration = createMock<GameRegistration>({
    create: jest.fn().mockReturnValue(game),
  });
  return { ...makeVortexApi(), main, gameRegistration, game };
};
