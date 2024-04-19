import { View } from "react-native";
import React, { useState } from "react";
import { userDetail } from "./globalUsername";
interface Props {
    children: React.ReactNode;
}
function BasicDetail({ children }: Props): JSX.Element {
    const [userAdm, setUserAdm] = useState("");
    const [userClass, setUserClass] = useState("");
    const [userRoll, setUserRoll] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userStatus, setUserStatus] = useState("");
    const [userName, setUserName] = useState("");
    const [userFatherName, setUserFatherName] = useState("");
    const [userSession, setUserSession] = useState("");
    return (
        <userDetail.Provider
            value={{
                userAdm,
                setUserAdm,
                userClass,
                setUserClass,
                userName,
                setUserName,
                userRoll,
                setUserRoll,
                userPhone,
                setUserPhone,
                userStatus,
                setUserStatus,
                userFatherName,
                setUserFatherName,
                userSession,
                setUserSession,
            }}
        >
            {children}
        </userDetail.Provider>
    );
}

export default BasicDetail;
