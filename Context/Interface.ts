import { Dispatch, SetStateAction } from "react";

export interface Detail {
    userAdm: string;
    userName: string;
    userFatherName: string;
    userClass: string;
    userRoll: string;
    userSession: string;
    userSection: string;
    userStatus: string;
    userPhone: string;
    setUserAdm: Dispatch<SetStateAction<string>>;
    setUserName: Dispatch<SetStateAction<string>>;
    setUserClass: Dispatch<SetStateAction<string>>;
    setUserRoll: Dispatch<SetStateAction<string>>;
    setUserSession: Dispatch<SetStateAction<string>>;
    setUserStatus: Dispatch<SetStateAction<string>>;
    setUserPhone: Dispatch<SetStateAction<string>>;
    setUserFatherName: Dispatch<SetStateAction<string>>;
    setUserSection: Dispatch<SetStateAction<string>>;
}
