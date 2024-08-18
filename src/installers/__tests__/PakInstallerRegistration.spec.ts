import { PakInstallerRegistration } from "../PakInstallerRegistration";
import { makePathsFactory, makeVortexApi } from "../../../jest/factories";
import { createMock } from "ts-auto-mock";
import { ProgressDelegate } from "vortex-api/lib/types/api";
import { TALESOFARISE_ID } from "../../main";

describe("PakInstallerRegistration", () => {
  const { installerRegistration, gameId, destinationPath, progressDelegate } =
    makeFactory();
  const { installerName, priority, testSupportedContent, installContent } =
    installerRegistration.create();

  it("sets the installer name", async () => {
    expect(installerName).toEqual("talesofarise-PAK");
  });

  it("sets the priority", async () => {
    expect(priority).toEqual(25);
  });

  describe("testSupported", () => {
    it("supports tales of arise game", async () => {
      expect(
        await testSupportedContent(["lorem.pAk"], TALESOFARISE_ID)
      ).toEqual({
        requiredFiles: [],
        supported: true,
      });
    });
    it("does not support other games", async () => {
      expect(await testSupportedContent(["lorem.pAk"], "invalid")).toEqual({
        requiredFiles: [],
        supported: false,
      });
    });
    it("sets a valid content qualifier function", async () => {
      expect(await testSupportedContent(["lorem.pAk"], gameId)).toEqual({
        requiredFiles: [],
        supported: true,
      });
    });

    it("sets an invalid content qualifier function", async () => {
      const { installerRegistration } = makeInvalidContentQualifierFactory();
      const { testSupportedContent } = installerRegistration.create();
      expect(await testSupportedContent([], gameId)).toEqual({
        requiredFiles: [],
        supported: false,
      });
    });
  });

  describe("installContent", () => {
    const { normalisedPakModsPath } = makePathsFactory();

    it("does not install mods for other games", async () => {
      expect(
        await installContent(
          ["lorem.pak"],
          destinationPath,
          "invalid-game-id",
          progressDelegate
        )
      ).toEqual({ instructions: [] });
    });

    it("installs valid files", async () => {
      expect(
        await installContent(
          ["lorem.pak"],
          destinationPath,
          gameId,
          progressDelegate
        )
      ).toEqual({
        instructions: [
          {
            destination: `${normalisedPakModsPath}/lorem.pak`,
            source: "lorem.pak",
            type: "copy",
          },
        ],
      });
    });

    it("filters invalid files", async () => {
      expect(
        await installContent(
          ["lorem.pak", "invalid", "path/ip.pak"],
          destinationPath,
          gameId,
          progressDelegate
        )
      ).toEqual({
        instructions: [
          {
            destination: `${normalisedPakModsPath}/lorem.pak`,
            source: "lorem.pak",
            type: "copy",
          },
          {
            destination: `${normalisedPakModsPath}/path/ip.pak`,
            source: "path/ip.pak",
            type: "copy",
          },
        ],
      });
    });

    it("installs no files having non valid", async () => {
      expect(
        await installContent(
          ["invalid"],
          destinationPath,
          gameId,
          progressDelegate
        )
      ).toEqual({ instructions: [] });
    });
  });
});

function makeFactory() {
  const { gameStoreHelper, iGameStoreEntry } = makeVortexApi();
  const gameId = TALESOFARISE_ID;
  const destinationPath = "lorem-ipsum-destination-path";
  const progressDelegate = createMock<ProgressDelegate>();
  const installerRegistration = new PakInstallerRegistration();
  return {
    installerRegistration,
    gameStoreHelper,
    iGameStoreEntry,
    gameId,
    destinationPath,
    progressDelegate,
  };
}

function makeInvalidContentQualifierFactory() {
  const factory = makeFactory();

  return { ...factory };
}
