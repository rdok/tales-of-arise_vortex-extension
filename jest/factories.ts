import { createMock } from "ts-auto-mock";
import { randWord } from "@ngneat/falso";

import {
  IExtensionContext,
  IGame,
  IGameStoreEntry,
} from "vortex-api/lib/types/api";
import { GameStoreHelper } from "vortex-api/lib/util/api";
import { GameRegistration } from "../src/GameRegistration";
import {
  InstallerRegistration,
  InstallerRegistrationOutput,
} from "../src/InstallerRegistration";

export const makeVortexApi = () => {
  const registerGame = jest.fn();
  const context = createMock<IExtensionContext>({ registerGame });
  context.registerInstaller;

  const iGameStoreEntry = createMock<IGameStoreEntry>({ gamePath: randWord() });
  const gameStoreHelper = createMock<typeof GameStoreHelper>({
    findByAppId: jest.fn().mockResolvedValue(iGameStoreEntry),
  });

  return { context, registerGame, gameStoreHelper, iGameStoreEntry };
};

export const makeMainFactory = () => {
  const game = createMock<IGame>();
  const gameRegistration = createMock<GameRegistration>({
    create: jest.fn().mockReturnValue(game),
  });

  const installerRegistrationOutput = createMock<InstallerRegistrationOutput>();
  const installerRegistration = createMock<InstallerRegistration>({
    create: jest.fn().mockReturnValue(installerRegistrationOutput),
  });
  return {
    ...makeVortexApi(),
    gameRegistration,
    game,
    installerRegistration,
    installerRegistrationOutput,
  };
};
