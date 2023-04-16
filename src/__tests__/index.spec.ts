import main from "../index";
import { makeContext } from "./factories";
import { GameRegistration } from "../GameRegistration";
jest.mock("../GameRegistration");

it("registers the game", () => {
  const { context } = makeFactory();
  main(context);

  const gameRegistration = (GameRegistration as jest.Mock).mock.instances[0];
  expect(gameRegistration.run).toHaveBeenCalledWith(context);
});

const makeFactory = () => {
  const { context } = makeContext();
  return { context };
};
