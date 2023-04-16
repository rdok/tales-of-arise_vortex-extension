import { makeMainFactory } from "../../jest/factories";
import main from "../main";

const { context, gameRegistration, game, pakInstallerRegistration } =
  makeMainFactory();
main(context, { gameRegistration, pakInstallerRegistration });

describe("GameRegistration", () => {
  it("creates the game registration", () => {
    expect(gameRegistration.create).toHaveBeenCalled();
  });

  it("registers the game", () => {
    expect(context.registerGame).toHaveBeenCalledWith(game);
  });
});

describe("PakInstallerRegistration", () => {
  it("creates the pak installer registration", () => {
    expect(pakInstallerRegistration.create).toHaveBeenCalled();
  });

  // it("registers the game", () => {
  //   expect(context.registerGame).toHaveBeenCalledWith(game);
  // });
});
