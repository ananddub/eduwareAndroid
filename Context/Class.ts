import { ProfileDataEdit } from "./Interface";
export class UserDetail {
    private _userAdm?: string;
    private _userClass?: string;
    private _userRoll?: string;
    private _userSession?: string;
    private _userStatus?: string;
    private _userPhone?: string;
    private _userFatherName?: string;
    private _userName?: string;
    private _userSection?: string;

    constructor(
        userAdm: string = "",
        userClass: string = "",
        userRoll: string = "",
        userSession: string = "",
        userStatus: string = "",
        userPhone: string = "",
        userFatherName: string = "",
        userName: string = "",
        userSection: string = ""
    ) {
        this._userAdm = userAdm;
        this._userClass = userClass;
        this._userRoll = userRoll;
        this._userSession = userSession;
        this._userStatus = userStatus;
        this._userPhone = userPhone;
        this._userFatherName = userFatherName;
        this._userName = userName;
        this._userSection = userSection;
    }

    // Getters
    get userAdm(): string | undefined {
        return this._userAdm;
    }

    get userClass(): string | undefined {
        return this._userClass;
    }

    get userRoll(): string | undefined {
        return this._userRoll;
    }

    get userSession(): string | undefined {
        return this._userSession;
    }

    get userStatus(): string | undefined {
        return this._userStatus;
    }

    get userPhone(): string | undefined {
        return this._userPhone;
    }

    get userFatherName(): string | undefined {
        return this._userFatherName;
    }

    get userName(): string | undefined {
        return this._userName;
    }

    get userSection(): string | undefined {
        return this._userSection;
    }

    // Setters
    set userAdm(value: string | undefined) {
        this._userAdm = value;
    }

    set userClass(value: string | undefined) {
        this._userClass = value;
    }

    set userRoll(value: string | undefined) {
        this._userRoll = value;
    }

    set userSession(value: string | undefined) {
        this._userSession = value;
    }

    set userStatus(value: string | undefined) {
        this._userStatus = value;
    }

    set userPhone(value: string | undefined) {
        this._userPhone = value;
    }

    set userFatherName(value: string | undefined) {
        this._userFatherName = value;
    }

    set userName(value: string | undefined) {
        this._userName = value;
    }

    set userSection(value: string | undefined) {
        this._userSection = value;
    }
}

export class ProfileEditable {
    constructor(
        public userAdm: string = "",
        public userHouseNo: string = "",
        public userDOB: string = "",
        public userFatherName: string = "",
        public userMotherName: string = "",
        public userContactNo: string = "",
        public userPhone: string = "",
        public userAddress: string = "",
        public userMailId: string = "",
        public userName: string = ""
    ) {}
}
