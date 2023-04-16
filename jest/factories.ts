import { createMock } from "ts-auto-mock";
import { randWord } from "@ngneat/falso";

import {
  IDiscoveryResult,
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
import { fs as vortexFs } from "vortex-api";

export const makeVortexApi = () => {
  const registerGame = jest.fn();
  const context = createMock<IExtensionContext>({ registerGame });
  const ensureDirAsyncOutput = jest.fn();
  const fs = createMock<typeof vortexFs>({
    ensureDirAsync: jest.fn().mockReturnValue(ensureDirAsyncOutput),
  });
  const discovery = createMock<IDiscoveryResult>({
    path: "~/steamapps/common/Tales of Arise",
  });

  const iGameStoreEntry = createMock<IGameStoreEntry>({ gamePath: randWord() });
  const gameStoreHelper = createMock<typeof GameStoreHelper>({
    findByAppId: jest.fn().mockResolvedValue(iGameStoreEntry),
  });

  return {
    context,
    registerGame,
    gameStoreHelper,
    iGameStoreEntry,
    fs,
    discovery,
    ensureDirAsyncOutput,
  };
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
