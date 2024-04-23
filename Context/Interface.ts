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

export interface ProfileDataEdit {
    userAdm: string;
    userHouseNo: string;
    userDOB: string;
    userFatherName: string;
    userMotherName: string;
    userContactNo: string;
    userMailId: string;
    userName: string;
}

export interface tbl_admission {
    regno: string;
    admno: string;
    name: string;
    class: string;
    roll: number;
    house: string;
    section: string;
    dob: string;
    gender: string;
    nationality: string;
    category: string;
    religion: string;
    bloodgroup: string;
    fname: string;
    foccu: string;
    fannual: string;
    fmob: string;
    mname: string;
    moccu: string;
    mannnual: number;
    mmob: string;
    gname: string;
    goccu: string;
    gannual: number;
    whatsapp?: string;
    ptown: string;
    pps: string;
    pdist: string;
    pstate: string;
    ppin: number;
    ctown: string;
    cps: string;
    cdist: string;
    cstate: string;
    cpin: string;
    prevschool: string;
    prevclass: string;
    doa: string;
    testmarks: string;
    email: string;
    disability: string;
    disatype: string;
    schlor: number;
    schlorofferedby: string;
    hostel: string;
    transport: string;
    imagepath: string;
    barcode: string;
    incharge: string;
    session: string;
    sessiondues: number;
    active: number;
    coa: string;
}
export interface tbl_transportfee {
    admno: string;
    apr?: number;
    may?: number;
    jun?: number;
    jul?: number;
    aug?: number;
    sep?: number;
    oct?: number;
    nov?: number;
    dece?: number;
    jan?: number;
    feb?: number;
    mar?: number;
    session: string;
}

export interface tbl_stdtransdetail {
    admno: string;
    route: string;
    destination: string;
}

export interface tbl_hostelfee {
    admno: string;
    apr: number;
    may: number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dece: number;
    jan: number;
    feb: number;
    mar: number;
    session: string;
}

export interface tbl_monthfee {
    admno: string;
    apr?: number;
    may?: number;
    jun?: number;
    jul?: number;
    aug?: number;
    sep?: number;
    oct?: number;
    nov?: number;
    dece?: number;
    jan?: number;
    feb?: number;
    mar?: number;
    billdues?: number;
    session: string;
}

export interface tbl_stdmonthfeedetail {
    sr: number;
    admno: string;
    pdate: string;
    tuitionfee: number;
    libraryfee: number;
    compfee: number;
    labfee: number;
    sclassfee: number;
    examfee: number;
    miscfee: number;
    sessionfee: number;
    fmonth: string;
    monthfee: number;
    tmonth: string;
    transfee: number;
    hmonth: string;
    hostelfee: number;
    backdues: number;
    fine: number;
    tfine: number;
    hfine: number;
    total: number;
    concession: number;
    netamt: number;
    paidamt: number;
    dues: number;
    amtinword: string;
    incharge: string;
    pmtmode?: string | null;
    pmtrefno?: string | null;
}
export interface tbl_examfee {
    class: string;
    apr: number;
    may: number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dece: number;
    jan: number;
    feb: number;
    mar: number;
}

export interface tbl_miscfee {
    class: string;
    apr: number;
    may: number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dece: number;
    jan: number;
    feb: number;
    mar: number;
}

export interface tbl_monthfee {
    admno: string;
    apr?: number;
    may?: number;
    jun?: number;
    jul?: number;
    aug?: number;
    sep?: number;
    oct?: number;
    nov?: number;
    dece?: number;
    jan?: number;
    feb?: number;
    mar?: number;
    billdues?: number;
    session: string;
}

export interface tbl_stdfeemaster {
    admno: string;
    monthfee?: number;
    transportfee?: number;
    hostelfee?: number;
    session: string;
}

export interface tbl_latefinedate {
    lday: number;
}

export interface tbl_miscfee {
    class: string;
    apr: number;
    may: number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dece: number;
    jan: number;
    feb: number;
    mar: number;
}

export interface tbl_monthlyfeesetup {
    class: string;
    tuitionfee: number;
    libraryfee: number;
    compfee: number;
    labfee: number;
    sclassfee: number;
    examfee: number;
    miscfee: number;
    fine: number;
    transfine: number;
}

export interface SqlData {
    tbl_admission: tbl_admission;
    tbl_transfee: tbl_transportfee;
    tbl_stdtransdetail: tbl_stdtransdetail;
    tbl_hostelfee: tbl_hostelfee;
    tbl_monthfee: tbl_stdfeemaster;
    tbl_stdmonthfeedetail: tbl_stdmonthfeedetail;
    tbl_latefinedate: tbl_latefinedate;
    tbl_examfee: tbl_examfee;
    tbl_miscfee: tbl_miscfee;
    tbl_stdfeemaster: tbl_monthfee;
    tbl_monthlyfeesetup: tbl_monthlyfeesetup;
}
