import {
  executablePath,
  baseModsPath,
  pakModsPath,
  usmModsPath,
} from "../paths";
import { makePathsFactory } from "../../jest/factories";

it("normalises the mods path", () => {
  const { normalisedModsPath } = makePathsFactory();
  expect(baseModsPath()).toEqual(normalisedModsPath);
});

it("normalises the executable path", () => {
  const { normalisedExecutablePath } = makePathsFactory();
  expect(executablePath()).toEqual(normalisedExecutablePath);
});

it("normalises the mods path", () => {
  const { normalisedPakModsPath } = makePathsFactory();
  expect(pakModsPath()).toEqual(normalisedPakModsPath);
});

it("normalises the usm mods path", () => {
  const { normalisedUsmModsPath } = makePathsFactory();
  expect(usmModsPath()).toEqual(normalisedUsmModsPath);
});
