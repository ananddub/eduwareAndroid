import React, { createContext, Dispatch, SetStateAction } from "react";

interface Detail {
    userAdm: string;
    userName: string;
    userFatherName: string;
    userClass: string;
    userRoll: string;
    userSession: string;
    userStatus: string;
    userPhone: string;
    setUserAdm: Dispatch<SetStateAction<string>>;
    setUserClass: Dispatch<SetStateAction<string>>;
    setUserRoll: Dispatch<SetStateAction<string>>;
    setUserSession: Dispatch<SetStateAction<string>>;
    setUserStatus: Dispatch<SetStateAction<string>>;
    setUserPhone: Dispatch<SetStateAction<string>>;
    setUserFatherName: Dispatch<SetStateAction<string>>;
    setUserUserName: Dispatch<SetStateAction<string>>;
}

const defaultValue: Detail = {
    userAdm: "",
    userClass: "",
    userRoll: "",
    userSession: "",
    userStatus: "",
    userPhone: "",
    userFatherName: "",
    userName: "",
    setUserAdm: () => {},
    setUserClass: () => {},
    setUserRoll: () => {},
    setUserSession: () => {},
    setUserStatus: () => {},
    setUserPhone: () => {},
    setUserFatherName: () => {},
    setUserUserName: () => {},
};

export const userDetail = createContext<Detail>(defaultValue);
