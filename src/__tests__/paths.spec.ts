import { pathToPakMods } from "../paths";

it("returns with the array of PAK install path", () => {
  expect(pathToPakMods()).toEqual(["Arise", "Content", "Paks", "~mods"]);
});

export const pathToPakModsFactory = () => {
  const path = "Arise/Content/Paks/~mods";
  return { path };
};
