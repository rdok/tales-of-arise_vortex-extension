import { createMock } from "ts-auto-mock";
import { IExtensionContext } from "vortex-api/lib/types/api";

export const makeContext = () => {
  const registerGame = jest.fn();
  const context = createMock<IExtensionContext>({ registerGame });
  return { context, registerGame };
};
