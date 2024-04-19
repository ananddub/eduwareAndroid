import { UserDetail } from "./Class";
import { createContext } from "react";
// Example

// export const userDetail = createContext<UserDetail>(new UserDetail());

interface UserContextType {
    user: UserDetail;
    setUser: React.Dispatch<React.SetStateAction<UserDetail>>;
}

// Create the context
export const UserContext = createContext<UserContextType | undefined>(
    undefined
);
