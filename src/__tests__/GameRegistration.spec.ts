import { GameRegistration } from "../GameRegistration";

import { makeVortexApi } from "../../jest/factories";
import { makePathsFactory } from "./paths.spec";

describe("Game registration", () => {
  const {
    gameRegistration,
    iGameStoreEntry,
    ensureDirAsyncOutput,
    discovery,
    fs,
  } = makeFactory();
  const game = gameRegistration.create();

  it("configures mods to be installed on the same folder", async () => {
    expect(game).toMatchObject({ mergeMods: true });
  });

  it("sets the id", async () => {
    expect(game).toMatchObject({ id: "talesofarise" });
  });

  it("sets the name", async () => {
    expect(game).toMatchObject({ name: "Tales of Arise" });
  });

  it("sets the executable", async () => {
    const { normalisedExecutablePath } = makePathsFactory();
    expect(game.executable()).toEqual(normalisedExecutablePath);
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
    const { normalisedExecutablePath } = makePathsFactory();
    expect(game).toMatchObject({
      requiredFiles: [normalisedExecutablePath],
    });
  });

  it("sets the environment: steam app id", async () => {
    expect(game).toMatchObject({ environment: { SteamAPPId: "740130" } });
  });

  it("sets the game installation path", async () => {
    expect(await (game.queryPath as any)()).toEqual(iGameStoreEntry.gamePath);
  });

  it("sets the mod installation path", () => {
    const { normalisedPakModsPath } = makePathsFactory();
    expect(game.queryModPath("")).toEqual(normalisedPakModsPath);
  });

  it("clean ups empty directories", () => {
    expect(game.requiresCleanup).toBeTruthy();
  });

  describe("prepares user's environment for modding", () => {
    it("ensures directory exists", async () => {
      expect(await (game.setup as any)(discovery)).toEqual(
        ensureDirAsyncOutput
      );
    });
    it("checks the right directory", () => {
      expect(fs.ensureDirAsync).toHaveBeenCalledWith(
        "~/steamapps/common/Tales of Arise/Arise/Content/Paks/~mods"
      );
    });
  });
});

function makeFactory() {
  const vortexApi = makeVortexApi();
  const { gameStoreHelper, fs } = vortexApi;
  const gameRegistration = new GameRegistration({
    gameStoreHelper,
    ensureDirAsync: fs.ensureDirAsync,
  });

  return { ...vortexApi, gameRegistration, gameStoreHelper };
}
