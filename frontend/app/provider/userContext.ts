"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "./userProvider";

export interface UserContextType {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
