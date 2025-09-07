import { atomWithStorage, createJSONStorage } from "jotai/utils"
import { atom } from "jotai";

export const themeUserPreferenceAtom = atomWithStorage<"dark" | "light" | undefined>("edu.theme", undefined)
