import { View } from "react-native";
import React, { useState } from "react";
import { UserContext } from "./globalUsername";
import { UserDetail } from "./Class";
interface Props {
    children: React.ReactNode;
}
interface UserContextType {
    user: UserDetail;
    setUser: React.Dispatch<React.SetStateAction<UserDetail>>;
}

function BasicDetail({ children }: Props): JSX.Element {
    const [user, setUser] = useState(new UserDetail());
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default BasicDetail;
