import { makePathsFactory, makeVortexApi } from "../../../jest/factories";
import { UsmInstallerRegistration } from "../UsmInstallerRegistration";
import { TALESOFARISE_ID } from "../../main";
import { createMock } from "ts-auto-mock";
import { ProgressDelegate } from "vortex-api/lib/types/api";

describe("UsmInstallerRegistration", () => {
  const { installerRegistration, gameId, destinationPath, progressDelegate } =
    makeFactory();
  const { installerName, priority, testSupportedContent, installContent } =
    installerRegistration.create();

  it("sets the installer name", async () => {
    expect(installerName).toEqual("talesofarise-USM");
  });

  it("sets the priority", async () => {
    expect(priority).toEqual(30);
  });

  describe("testSupported", () => {
    it("supports tales of arise game", async () => {
      expect(
        await testSupportedContent(["lorem.usm"], TALESOFARISE_ID)
      ).toEqual({
        requiredFiles: [],
        supported: true,
      });
    });
    it("does not support other games", async () => {
      expect(await testSupportedContent(["lorem.usm"], "invalid")).toEqual({
        requiredFiles: [],
        supported: false,
      });
    });
    it("sets a valid content qualifier function", async () => {
      expect(await testSupportedContent(["lorem.UsM"], gameId)).toEqual({
        requiredFiles: [],
        supported: true,
      });
    });

    it("sets an invalid content qualifier function", async () => {
      const { installerRegistration } = makeInvalidContentQualifierFactory();
      const { testSupportedContent } = installerRegistration.create();
      expect(await testSupportedContent(["lorem.invalid"], gameId)).toEqual({
        requiredFiles: [],
        supported: false,
      });
    });
  });

  describe("installContent", () => {
    const { normalisedUsmModsPath } = makePathsFactory();

    it("does not install mods for other games", async () => {
      expect(
        await installContent(
          ["lorem.usm"],
          destinationPath,
          "invalid-game-id",
          progressDelegate
        )
      ).toEqual({ instructions: [] });
    });

    it("installs valid files", async () => {
      expect(
        await installContent(
          ["lorem.usm"],
          destinationPath,
          gameId,
          progressDelegate
        )
      ).toEqual({
        instructions: [
          {
            destination: `${normalisedUsmModsPath}/lorem.usm`,
            source: "lorem.usm",
            type: "copy",
          },
        ],
      });
    });

    it("filters invalid files", async () => {
      expect(
        await installContent(
          ["lorem.usm", "invalid", "path/ip.usm"],
          destinationPath,
          gameId,
          progressDelegate
        )
      ).toEqual({
        instructions: [
          {
            destination: `${normalisedUsmModsPath}/lorem.usm`,
            source: "lorem.usm",
            type: "copy",
          },
          {
            destination: `${normalisedUsmModsPath}/path/ip.usm`,
            source: "path/ip.usm",
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
  const installerRegistration = new UsmInstallerRegistration();
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
