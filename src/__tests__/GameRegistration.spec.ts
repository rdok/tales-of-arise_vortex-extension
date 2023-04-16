import { GameRegistration } from "../GameRegistration";
import { makeContext } from "./factories";

describe("Game registration", () => {
  const { context, gameRegistration } = makeFactory();
  gameRegistration.run(context);

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
    // Not feasible to test anonymous function. Might refactor later
    // to extract the executable else where, and then properly test.
    expect(context.registerGame).toHaveBeenCalledWith(
      expect.objectContaining({ executable: expect.any(Function) })
    );
  });

  it("sets the logo", async () => {
    // Not feasible to test anonymous function. Might refactor later
    // to extract the executable else where, and then properly test.
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
});

function makeFactory() {
  const { context } = makeContext();
  const gameRegistration = new GameRegistration();
  return { context, gameRegistration };
}
