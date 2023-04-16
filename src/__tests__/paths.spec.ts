import { executablePath, modsPath, pakModsPath } from "../paths";
import { makePathsFactory } from "../../jest/factories";

it("normalises the mods path", () => {
  const { normalisedModsPath } = makePathsFactory();
  expect(modsPath()).toEqual(normalisedModsPath);
});

it("normalises the executable path", () => {
  const { normalisedExecutablePath } = makePathsFactory();
  expect(executablePath()).toEqual(normalisedExecutablePath);
});

it("normalises the mods path", () => {
  const { normalisedPakModsPath } = makePathsFactory();
  expect(pakModsPath()).toEqual(normalisedPakModsPath);
});
