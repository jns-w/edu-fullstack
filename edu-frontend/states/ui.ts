import { atomWithStorage, createJSONStorage } from "jotai/utils"
import { atom } from "jotai";

export const themeUserPreferenceAtom = atomWithStorage<"dark" | "light">("edu.theme", undefined)
