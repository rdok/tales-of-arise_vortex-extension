import { createMock } from "ts-auto-mock";
import { IExtensionContext } from "vortex-api/lib/types/IExtensionContext";
import main from "../index";

describe("Game registration", () => {
  const { vortexContext } = makeFactory();
  main(vortexContext);

  it("sets the id", async () => {
    expect(vortexContext.registerGame).toHaveBeenCalledWith(
      expect.objectContaining({ id: "talesofarise" })
    );
  });

  it("sets the name", async () => {
    expect(vortexContext.registerGame).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Tales of Arise" })
    );
  });

  it("sets the executable", async () => {
    // Not feasible to test anonymous function. Might refactor later
    // to extract the executable else where, and then properly test.
    expect(vortexContext.registerGame).toHaveBeenCalledWith(
      expect.objectContaining({ executable: expect.any(Function) })
    );
  });
});

function makeFactory() {
  const vortexContext = createMock<IExtensionContext>({
    registerGame: jest.fn(),
  });
  return { vortexContext };
}
