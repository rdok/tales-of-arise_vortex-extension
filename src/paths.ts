import path from "path";

export const baseModsPath = () => {
  return path.join("Arise");
};

export const pakModsPath = () => {
  return path.join(baseModsPath(), "Content", "Paks", "~mods");
};

export const usmModsPath = () => {
  return path.join(baseModsPath(), "Content", "Binaries", "Movie", "Animation");
};

export const executablePath = () => {
  return path.join("Arise", "Binaries", "Win64", "Tales of Arise.exe");
};
