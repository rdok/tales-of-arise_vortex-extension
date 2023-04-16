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
  UsmInstallerRegistrationOutput,
  PakInstallerRegistration,
} from "../src/installers/PakInstallerRegistration";
import { fs as vortexFs } from "vortex-api";
import { UsmInstallerRegistration } from "../src/installers/UsmInstallerRegistration";

export const makeVortexApi = () => {
  const registerGame = jest.fn();
  const registerInstaller = jest.fn();
  const context = createMock<IExtensionContext>({
    registerGame,
    registerInstaller,
  });
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
    registerInstaller,
  };
};

export const makeMainFactory = () => {
  const game = createMock<IGame>();
  const gameRegistration = createMock<GameRegistration>({
    create: jest.fn().mockReturnValue(game),
  });

  const pakInstallerRegistrationOutput =
    createMock<UsmInstallerRegistrationOutput>();
  const pakInstallerRegistration = createMock<PakInstallerRegistration>({
    create: jest.fn().mockReturnValue(pakInstallerRegistrationOutput),
  });

  const usmInstallerRegistrationOutput =
    createMock<UsmInstallerRegistrationOutput>();
  const usmInstallerRegistration = createMock<UsmInstallerRegistration>({
    create: jest.fn().mockReturnValue(usmInstallerRegistrationOutput),
  });
  return {
    ...makeVortexApi(),
    gameRegistration,
    game,
    pakInstallerRegistration,
    pakInstallerRegistrationOutput,
    usmInstallerRegistration,
    usmInstallerRegistrationOutput,
  };
};

export const makePathsFactory = () => {
  const normalisedModsPath = "Arise";
  const normalisedPakModsPath = "Arise/Content/Paks/~mods";
  const normalisedUsmModsPath = "Arise/Content/Binaries/Movie/Animation";
  const normalisedExecutablePath = "Arise/Binaries/Win64/Tales of Arise.exe";
  return {
    normalisedModsPath,
    normalisedPakModsPath,
    normalisedUsmModsPath,
    normalisedExecutablePath,
  };
};
