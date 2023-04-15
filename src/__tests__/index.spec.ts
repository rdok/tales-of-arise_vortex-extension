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
});

function makeFactory() {
  const vortexContext = createMock<IExtensionContext>({
    registerGame: jest.fn(),
  });
  return { vortexContext };
}
