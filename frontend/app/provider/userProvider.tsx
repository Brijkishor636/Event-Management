"use client";

import { useEffect, useState, PropsWithChildren } from "react";
import axios from "axios";
import UserContext from "./userContext";

export enum UserRole {
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
  COMPANY = "COMPANY",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/user/current", {
        withCredentials: true
      });
      //@ts-ignore
      setUser(response.data?.user);
    } catch (err: any) {
      console.warn("No logged in user (this is fine on first load).");
      setUser(undefined);
    }
  }
  fetchData();
}, []);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
