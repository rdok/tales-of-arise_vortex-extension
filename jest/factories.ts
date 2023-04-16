import { createMock } from "ts-auto-mock";
import { randWord } from "@ngneat/falso";

import { IExtensionContext, IGameStoreEntry } from "vortex-api/lib/types/api";
import { GameStoreHelper } from "vortex-api/lib/util/api";

export const makeVortexApi = () => {
  const registerGame = jest.fn();
  const context = createMock<IExtensionContext>({ registerGame });

  const iGameStoreEntry = createMock<IGameStoreEntry>({ gamePath: randWord() });
  const gameStoreHelper = createMock<typeof GameStoreHelper>({
    findByAppId: jest.fn().mockResolvedValue(iGameStoreEntry),
  });

  return { context, registerGame, gameStoreHelper, iGameStoreEntry };
};
