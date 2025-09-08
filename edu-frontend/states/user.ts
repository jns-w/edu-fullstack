import { atomWithStorage } from "jotai/utils"

export type User = {
  email: string
  name: string
  sessionExpired?: boolean
  updatedAt: number
  userId: string
}

export const userAtom = atomWithStorage<null | User>("edu.user", null)
export const authTokenAtom = atomWithStorage<null | string>("edu.tkn", null)