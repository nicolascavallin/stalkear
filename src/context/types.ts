import { UserData } from "@/utils/interfaces";
import { User } from "firebase/auth";

export interface Context {
  state: {
    user: User | null;
    data: UserData | null;
  };
  actions: {
    login: () => void;
    logout: () => void;
    setUsername: (username: string) => void;
  };
}
