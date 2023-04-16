import { makePathsFactory, makeVortexApi } from "../../../jest/factories";
import { UsmInstallerRegistration } from "../UsmInstallerRegistration";

describe("UsmInstallerRegistration", () => {
  const { installerRegistration } = makeFactory();
  const { installerName, priority, testSupportedContent, installContent } =
    installerRegistration.create();

  it("sets the installer name", async () => {
    expect(installerName).toEqual("talesofarise-USM");
  });

  it("sets the priority", async () => {
    expect(priority).toEqual(30);
  });

  describe("testSupported", () => {
    it("sets a valid content qualifier function", async () => {
      expect(await testSupportedContent(["lorem.UsM"])).toEqual({
        requiredFiles: [],
        supported: true,
      });
    });

    it("sets an invalid content qualifier function", async () => {
      const { installerRegistration } = makeInvalidContentQualifierFactory();
      const { testSupportedContent } = installerRegistration.create();
      expect(await testSupportedContent(["lorem.pak"])).toEqual({
        requiredFiles: [],
        supported: false,
      });
    });
  });

  describe("installContent", () => {
    it("installs valid files", async () => {
      expect(await installContent(["lorem.usm"])).toEqual({
        instructions: [
          { destination: "lorem.usm", source: "lorem.usm", type: "copy" },
        ],
      });
    });

    it("filters invalid files", async () => {
      expect(
        await installContent(["lorem.usm", "invalid", "path/ip.usm"])
      ).toEqual({
        instructions: [
          { destination: "lorem.usm", source: "lorem.usm", type: "copy" },
          { destination: "path/ip.usm", source: "path/ip.usm", type: "copy" },
        ],
      });
    });

    it("installs no files having non valid", async () => {
      expect(await installContent(["invalid"])).toEqual({ instructions: [] });
    });
  });
});

function makeFactory() {
  const { normalisedPakModsPath: modPath } = makePathsFactory();
  const { gameStoreHelper, iGameStoreEntry } = makeVortexApi();
  const installerRegistration = new UsmInstallerRegistration();
  return {
    installerRegistration,
    gameStoreHelper,
    iGameStoreEntry,
    modPath,
  };
}

function makeInvalidContentQualifierFactory() {
  const factory = makeFactory();

  return { ...factory };
}
