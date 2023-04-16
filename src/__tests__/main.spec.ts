import { GameRegistration } from "../GameRegistration";

import { makeVortexApi } from "../../jest/factories";

jest.mock("../GameRegistration");

it("creates the game registration", async () => {
  const { context, main, gameStoreHelper } = await makeFactory();
  main(context, { gameStoreHelper });

  const gameRegistration = (GameRegistration as jest.Mock).mock.instances[0];
  expect(gameRegistration.create).toHaveBeenCalled();
});

const makeFactory = async () => {
  const main = (await import("../main")).default;
  const { context, gameStoreHelper } = makeVortexApi();
  return { main, context, gameStoreHelper };
};
