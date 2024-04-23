import { ProfileDataEdit } from "./Interface";
import {
    tbl_admission,
    tbl_examfee,
    tbl_hostelfee,
    tbl_latefinedate,
    tbl_miscfee,
    tbl_monthfee,
    tbl_monthlyfeesetup,
    tbl_stdfeemaster,
    SqlData,
    tbl_stdmonthfeedetail,
    tbl_stdtransdetail,
    tbl_transportfee,
} from "./Interface";
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

export class PaymentDetails {
    private tbl_admission: tbl_admission | null = null;
    private tbl_transportfee: tbl_transportfee | null = null;
    private tbl_stdtransdetail: tbl_stdtransdetail | null = null;
    private tbl_hostelfee: tbl_hostelfee | null = null;
    private tbl_stdfeemaster: tbl_stdfeemaster | null = null;
    private tbl_stdmonthfeedetail: tbl_stdmonthfeedetail | null = null;
    private tbl_latefinedate: tbl_latefinedate | null = null;
    private tbl_examfee: tbl_examfee | null = null;
    private tbl_miscfee: tbl_miscfee | null = null;
    private tbl_monthfee: tbl_monthfee | null = null;
    private tbl_monthlyfeesetup: tbl_monthlyfeesetup | null = null;
    private mainObject: SqlData | null = null;
    constructor(
        public monthlyCheckBox = Array(12).fill({
            month: "",
            isChecked: false,
            isDisabled: false,
            pricee: 0,
            function: (): number => 0,
            index: 0,
        }),
        public monthlyTransHostCheckBox = Array(12).fill({
            month: "",
            isChecked: false,
            isDisabled: false,
            pricee: 0,
            function: (): number => 0,
            index: 0,
        }),
        public monthfeeDetailALl = {
            class: Array(12)
                .fill(0)
                .map(() => 0),
            trans: Array(12)
                .fill(0)
                .map(() => 0),
            host: Array(12)
                .fill(0)
                .map(() => 0),
        },
        public latefeesMonthlyAll = {
            class: Array(12)
                .fill(0)
                .map(() => 0),
            trans: Array(12)
                .fill(0)
                .map(() => 0),
            host: Array(12)
                .fill(0)
                .map(() => 0),
        },
        public classFeeMonthALl = {
            class: Array(12)
                .fill(0)
                .map(() => 0),
            trans: Array(12)
                .fill(0)
                .map(() => 0),
            host: Array(12)
                .fill(0)
                .map(() => 0),
        },
        private business = [
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "Jan",
            "Feb",
            "Mar",
        ],
        public monhthlyfeepaid = Array(12)
            .fill(0)
            .map((m, index) => {
                {
                    return {
                        month: "",
                        isChecked: false,
                        isDisabled: false,
                        function: this.handleMonthCheckBoxClick,
                        index: index,
                    };
                }
            }),
        public mthfeepaid = Array(12)
            .fill(0)
            .map((m, index) => {
                {
                    return {
                        month: "",
                        isChecked: false,
                        isDisabled: false,
                        function: this.handleMthCheckBoxClick,
                        index: index,
                    };
                }
            }),
        private monthcount = {
            count: 0,
            latecount: 0,
            fee: 0,
            latefee: 0,
        },
        private hostelcount = {
            count: 0,
            latecount: 0,
            fee: 0,
            latefee: 0,
        },
        private transcount = {
            count: 0,
            latecount: 0,
            fee: 0,
            latefee: 0,
        }
    ) {
        let obj = Array(12)
            .fill(0)
            .map((_, index) => {
                return {
                    month: business[index],
                    isChecked: false,
                    isDisabled: false,
                    pricee: 0,
                    function: this.handleMonthCheckBoxClick,
                    index: index,
                };
            });
        let obj1 = Array(12)
            .fill(0)
            .map((_, index) => {
                return {
                    month: business[index],
                    isChecked: false,
                    isDisabled: false,
                    pricee: 0,
                    function: this.handleMthCheckBoxClick,
                    index: index,
                };
            });
        this.monthlyCheckBox = obj;
        this.monthlyTransHostCheckBox = obj1;
    }
    public handleMonthCheckBoxClick(index: number): void {}
    public handleMthCheckBoxClick(index: number): void {}

    public getBusinessYear(): string[] {
        return this.business;
    }
    public monthCheckBoxCount(): number {
        return this.monthlyCheckBox.reduce((a, b) => {
            if (b.isChecked && b.isDisabled) {
                return a + 1;
            }
            return a;
        }, 0);
    }
    public transCheckBoxCount(): number {
        return this.monthlyTransHostCheckBox.reduce((a, b) => {
            if (b.isChecked && b.isDisabled) {
                return a + 1;
            }
            return a;
        }, 0);
    }
    public hostCheckBoxCount(): number {
        return this.monthlyTransHostCheckBox.reduce((a, b) => {
            if (b.isChecked && b.isDisabled) {
                return a + 1;
            }
            return a;
        }, 0);
    }

    public setMainObject(data: SqlData): void {
        this.mainObject = data;
        this.tbl_admission = data.tbl_admission;
        this.tbl_transportfee = data.tbl_transfee;
        this.tbl_stdmonthfeedetail = data.tbl_stdmonthfeedetail;
        this.tbl_hostelfee = data.tbl_hostelfee;
        this.tbl_stdfeemaster = data.tbl_stdfeemaster;
        this.tbl_stdmonthfeedetail = data.tbl_stdmonthfeedetail;
        this.tbl_latefinedate = data.tbl_latefinedate;
        this.tbl_examfee = data.tbl_examfee;
        this.tbl_miscfee = data.tbl_miscfee;
        this.tbl_monthfee = data.tbl_monthfee;
        this.tbl_monthlyfeesetup = data.tbl_monthlyfeesetup;
    }
    public getTbl_admission(): tbl_admission | null {
        return this.tbl_admission;
    }
    public getTbl_transportfee(): tbl_transportfee | null {
        return this.tbl_transportfee;
    }
    public getTbl_stdtransdetail(): tbl_stdtransdetail | null {
        return this.tbl_stdtransdetail;
    }
    public getTbl_hostelfee(): tbl_hostelfee | null {
        return this.tbl_hostelfee;
    }
    public getTbl_stdfeemaster(): tbl_stdfeemaster | null {
        return this.tbl_stdfeemaster;
    }
    public getTbl_stdmonthfeedetail(): tbl_stdmonthfeedetail | null {
        return this.tbl_stdmonthfeedetail;
    }
    public getTbl_latefinedate(): tbl_latefinedate | null {
        return this.tbl_latefinedate;
    }
    public getTbl_examfee(): tbl_examfee | null {
        return this.tbl_examfee;
    }
    public getTbl_miscfee(): tbl_miscfee | null {
        return this.tbl_miscfee;
    }
    public getTbl_monthfee(): tbl_monthfee | null {
        return this.tbl_monthfee;
    }
    public getTbl_monthlyfeesetup(): tbl_monthlyfeesetup | null {
        return this.tbl_monthlyfeesetup;
    }
}
