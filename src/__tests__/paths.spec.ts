import { executablePath, pakModsPath } from "../paths";

it("normalises the pak mods path", () => {
  const { normalisedPakModsPath } = makePathsFactory();
  expect(pakModsPath()).toEqual(normalisedPakModsPath);
});

it("normalises the executable path", () => {
  const { normalisedExecutablePath } = makePathsFactory();
  expect(executablePath()).toEqual(normalisedExecutablePath);
});

it("returns with the array of PAK install path", () => {
  const { normalisedPakModsPath } = makePathsFactory();
  expect(pakModsPath()).toEqual(normalisedPakModsPath);
});

export const makePathsFactory = () => {
  const normalisedPakModsPath = "Arise/Content/Paks/~mods";
  const normalisedExecutablePath = "Arise/Binaries/Win64/Tales of Arise.exe";
  return { normalisedPakModsPath, normalisedExecutablePath };
};
