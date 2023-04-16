import { executablePath, pakModsPath } from "../paths";
import { makePathsFactory } from "../../jest/factories";

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
