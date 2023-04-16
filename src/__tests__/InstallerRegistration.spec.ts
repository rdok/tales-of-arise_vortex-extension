import { InstallerRegistration } from "../InstallerRegistration";
import { makeVortexApi } from "../../jest/factories";

describe("InstallerRegistration", () => {
  const { installerRegistration } = makeFactory();
  const installer = installerRegistration.create();

  it("sets the installer name", async () => {
    expect(installer[0]).toEqual("talesofarise-PAK");
  });

  it("sets the priority", async () => {
    expect(installer[1]).toEqual(25);
  });

  it("sets a valid content qualifier function", async () => {
    expect(installer[2]).toBeTruthy();
  });

  it("installs the files", async () => {
    expect(installer[3]).toEqual([
      {
        type: "copy",
        source: "source_path",
        destination: "destination",
      },
    ]);
  });
});

function makeFactory() {
  const { gameStoreHelper, iGameStoreEntry } = makeVortexApi();
  const installerRegistration = new InstallerRegistration({ gameStoreHelper });
  return { installerRegistration, gameStoreHelper, iGameStoreEntry };
}
