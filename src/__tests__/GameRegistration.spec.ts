import { GameRegistration } from "../GameRegistration";

import { makeVortexApi } from "../../jest/factories";

describe("Game registration", () => {
  const { context, gameRegistration, iGameStoreEntry } = makeFactory();
  const game = gameRegistration.run(context);

  it("sets the id", async () => {
    expect(context.registerGame).toHaveBeenCalledWith(
      expect.objectContaining({ id: "talesofarise" })
    );
  });

  it("sets the name", async () => {
    expect(context.registerGame).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Tales of Arise" })
    );
  });

  it("sets the executable", async () => {
    expect(game.executable()).toEqual(
      "Arise\\Binaries\\Win64\\Tales of Arise.exe"
    );
  });

  it("sets the logo", async () => {
    expect(context.registerGame).toHaveBeenCalledWith(
      expect.objectContaining({ logo: "game_art.jpg" })
    );
  });

  it("sets the details: steam app id & nexus page id", async () => {
    expect(context.registerGame).toHaveBeenCalledWith(
      expect.objectContaining({
        details: {
          steamAppId: 740130,
          nexusPageId: "talesofarise",
        },
      })
    );
  });

  it("sets the requires files", async () => {
    expect(context.registerGame).toHaveBeenCalledWith(
      expect.objectContaining({
        requiredFiles: ["Arise\\Binaries\\Win64\\Tales of Arise.exe"],
      })
    );
  });

  it("sets the environment: steam app id", async () => {
    expect(context.registerGame).toHaveBeenCalledWith(
      expect.objectContaining({ environment: { SteamAPPId: "740130" } })
    );
  });

  it("sets the game installation path", async () => {
    if (!game.queryPath) throw new Error("game.queryPath should be defined");
    expect(await game.queryPath()).toEqual(iGameStoreEntry.gamePath);
  });

  it("sets the mod installation path", () => {
    expect(game.queryModPath("any")).toEqual(".");
  });

  it("clean ups empty directories", () => {
    expect(game.requiresCleanup).toBeTruthy();
  });
});

function makeFactory() {
  const { context, gameStoreHelper, iGameStoreEntry } = makeVortexApi();
  const gameRegistration = new GameRegistration({ gameStoreHelper });
  return { context, gameRegistration, gameStoreHelper, iGameStoreEntry };
}
