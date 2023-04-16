import { makeMainFactory } from "../../jest/factories";
import main from "../main";

const {
  context,
  gameRegistration,
  game,
  pakInstallerRegistration,
  pakInstallerRegistrationOutput,
  usmInstallerRegistration,
  usmInstallerRegistrationOutput,
} = makeMainFactory();

main(context, {
  gameRegistration,
  pakInstallerRegistration,
  usmInstallerRegistration,
});

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

  it("registers the installer", () => {
    expect(context.registerInstaller).toHaveBeenNthCalledWith(
      1,
      pakInstallerRegistrationOutput.installerName,
      pakInstallerRegistrationOutput.priority,
      pakInstallerRegistrationOutput.testSupportedContent,
      pakInstallerRegistrationOutput.installContent
    );
  });
});

describe("UsmInstallerRegistration", () => {
  it("creates the usm installer registration", () => {
    expect(usmInstallerRegistration.create).toHaveBeenCalled();
  });

  it("registers the installer", () => {
    expect(context.registerInstaller).toHaveBeenNthCalledWith(
      2,
      usmInstallerRegistrationOutput.installerName,
      usmInstallerRegistrationOutput.priority,
      usmInstallerRegistrationOutput.testSupportedContent,
      usmInstallerRegistrationOutput.installContent
    );
  });
});
