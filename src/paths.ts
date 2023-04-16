import path from "path";

export const modsPath = () => {
  return path.join("Arise");
};

export const pakModsPath = () => {
  return path.join(modsPath(), "Content", "Paks", "~mods");
};

export const executablePath = () => {
  return path.join("Arise", "Binaries", "Win64", "Tales of Arise.exe");
};
