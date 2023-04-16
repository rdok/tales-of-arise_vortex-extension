import { makeMainFactory } from "../../jest/factories";
import main from "../main";

const {
  context,
  gameRegistration,
  game,
  pakInstallerRegistration,
  pakInstallerRegistrationOutput,
} = makeMainFactory();

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

  it("registers the pak id", () => {
    expect(context.registerInstaller).toHaveBeenCalledWith(
      pakInstallerRegistrationOutput.installerName,
      expect.anything(),
      expect.anything(),
      expect.anything()
    );
  });

  it("registers the pak priority", () => {
    expect(context.registerInstaller).toHaveBeenCalledWith(
      expect.anything(),
      pakInstallerRegistrationOutput.priority,
      expect.anything(),
      expect.anything()
    );
  });

  it("registers the pak testSupported content", () => {
    expect(context.registerInstaller).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      pakInstallerRegistrationOutput.testSupportedContent,
      expect.anything()
    );
  });

  it("registers the pak install content", () => {
    expect(context.registerInstaller).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      pakInstallerRegistrationOutput.installContent
    );
  });
});
