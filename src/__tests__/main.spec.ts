import { makeMainFactory } from "../../jest/factories";
import main from "../main";

const { context, gameRegistration, game } = makeMainFactory();

describe("GameRegistration", () => {
  it("creates the game registration", () => {
    expect(gameRegistration.create).toHaveBeenCalled();
  });

  it("registers the game", () => {
    expect(context.registerGame).toHaveBeenCalledWith(game);
  });
});

describe("InstallerRegistration", () => {
  main(context, { gameRegistration });

  it("registers the PAK installer name", () => {
    expect(context.registerInstaller).toHaveBeenCalledWith("talesofarise-PAK");
  });
});
