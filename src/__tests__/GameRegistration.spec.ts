import { GameRegistration } from "../GameRegistration";

import { makeVortexApi } from "../../jest/factories";

describe("Game registration", () => {
  const { gameRegistration, iGameStoreEntry } = makeFactory();
  const game = gameRegistration.create();

  it("sets the id", async () => {
    expect(game).toMatchObject({ id: "talesofarise" });
  });

  it("sets the name", async () => {
    expect(game).toMatchObject({ name: "Tales of Arise" });
  });

  it("sets the executable", async () => {
    expect(game.executable()).toEqual(
      "Arise\\Binaries\\Win64\\Tales of Arise.exe"
    );
  });

  it("sets the logo", async () => {
    expect(game).toMatchObject({ logo: "game_art.jpg" });
  });

  it("sets the details: steam app id & nexus page id", async () => {
    expect(game).toMatchObject({
      details: { steamAppId: 740130, nexusPageId: "talesofarise" },
    });
  });

  it("sets the requires files", async () => {
    expect(game).toMatchObject({
      requiredFiles: ["Arise\\Binaries\\Win64\\Tales of Arise.exe"],
    });
  });

  it("sets the environment: steam app id", async () => {
    expect(game).toMatchObject({ environment: { SteamAPPId: "740130" } });
  });

  it("sets the game installation path", async () => {
    expect(await (game.queryPath as any)()).toEqual(iGameStoreEntry.gamePath);
  });

  it("sets the mod installation path", () => {
    expect(game.queryModPath("any")).toEqual(".");
  });

  it("clean ups empty directories", () => {
    expect(game.requiresCleanup).toBeTruthy();
  });
});

function makeFactory() {
  const { gameStoreHelper, iGameStoreEntry } = makeVortexApi();
  const gameRegistration = new GameRegistration({ gameStoreHelper });
  return { gameRegistration, gameStoreHelper, iGameStoreEntry };
}
