// import { URL } from "./Address";
// import {
//     tbl_admission,
//     tbl_examfee,
//     tbl_hostelfee,
//     tbl_latefinedate,
//     tbl_miscfee,
//     tbl_monthfee,
//     tbl_monthlyfeesetup,
//     tbl_stdfeemaster,
//     tbl_stdmonthfeedetail,
//     tbl_stdtransdetail,
//     tbl_transportfee,
// } from "./Interface";
// interface SqlData {
//     tbl_admission: tbl_admission;
//     tbl_transfee: tbl_transportfee;
//     tbl_stdtransdetail: tbl_stdtransdetail;
//     tbl_hostelfee: tbl_hostelfee;
//     tbl_monthfee: tbl_stdfeemaster;
//     tbl_stdmonthfeedetail: tbl_stdmonthfeedetail;
//     tbl_latefinedate: tbl_latefinedate;
//     tbl_examfee: tbl_examfee;
//     tbl_miscfee: tbl_miscfee;
//     tbl_stdfeemaster: tbl_monthfee;
//     tbl_monthlyfeesetup: tbl_monthlyfeesetup;
// }
// export class PaymentDetails {
//     private tbl_admission: tbl_admission | null = null;
//     private tbl_transportfee: tbl_transportfee | null = null;
//     private tbl_stdtransdetail: tbl_stdtransdetail | null = null;
//     private tbl_hostelfee: tbl_hostelfee | null = null;
//     private tbl_stdfeemaster: tbl_stdfeemaster | null = null;
//     private tbl_stdmonthfeedetail: tbl_stdmonthfeedetail | null = null;
//     private tbl_latefinedate: tbl_latefinedate | null = null;
//     private tbl_examfee: tbl_examfee | null = null;
//     private tbl_miscfee: tbl_miscfee | null = null;
//     private tbl_monthfee: tbl_monthfee | null = null;
//     private tbl_monthlyfeesetup: tbl_monthlyfeesetup | null = null;
//     private mainObject: SqlData | null = null;
//     constructor(
//         public monthlyCheckBox = Array(12).fill({
//             month: "",
//             isChecked: false,
//             isDisabled: false,
//             pricee: 0,
//             function: (): number => 0,
//             index: 0,
//         }),
//         public monthlyTransHostCheckBox = Array(12).fill({
//             month: "",
//             isChecked: false,
//             isDisabled: false,
//             pricee: 0,
//             function: (): number => 0,
//             index: 0,
//         }),
//         public monthfeeDetailALl = {
//             class: Array(12)
//                 .fill(0)
//                 .map(() => 0),
//             trans: Array(12)
//                 .fill(0)
//                 .map(() => 0),
//             host: Array(12)
//                 .fill(0)
//                 .map(() => 0),
//         },
//         public latefeesMonthlyAll = {
//             class: Array(12)
//                 .fill(0)
//                 .map(() => 0),
//             trans: Array(12)
//                 .fill(0)
//                 .map(() => 0),
//             host: Array(12)
//                 .fill(0)
//                 .map(() => 0),
//         },
//         public classFeeMonthALl = {
//             class: Array(12)
//                 .fill(0)
//                 .map(() => 0),
//             trans: Array(12)
//                 .fill(0)
//                 .map(() => 0),
//             host: Array(12)
//                 .fill(0)
//                 .map(() => 0),
//         },
//         private business = [
//             "Apr",
//             "May",
//             "Jun",
//             "Jul",
//             "Aug",
//             "Sep",
//             "Oct",
//             "Nov",
//             "Dec",
//             "Jan",
//             "Feb",
//             "Mar",
//         ],
//         public monhthlyfeepaid = Array(12)
//             .fill(0)
//             .map((m, index) => {
//                 {
//                     return {
//                         month: "",
//                         isChecked: false,
//                         isDisabled: false,
//                         function: this.handleMonthCheckBoxClick,
//                         index: index,
//                     };
//                 }
//             }),
//         public mthfeepaid = Array(12)
//             .fill(0)
//             .map((m, index) => {
//                 {
//                     return {
//                         month: "",
//                         isChecked: false,
//                         isDisabled: false,
//                         function: this.handleMthCheckBoxClick,
//                         index: index,
//                     };
//                 }
//             }),
//         private monthcount = {
//             count: 0,
//             latecount: 0,
//             fee: 0,
//             latefee: 0,
//         },
//         private hostelcount = {
//             count: 0,
//             latecount: 0,
//             fee: 0,
//             latefee: 0,
//         },
//         private transcount = {
//             count: 0,
//             latecount: 0,
//             fee: 0,
//             latefee: 0,
//         }
//     ) {
//         let obj = Array(12)
//             .fill(0)
//             .map((_, index) => {
//                 return {
//                     month: business[index],
//                     isChecked: false,
//                     isDisabled: false,
//                     pricee: 0,
//                     function: this.handleMonthCheckBoxClick,
//                     index: index,
//                 };
//             });
//         let obj1 = Array(12)
//             .fill(0)
//             .map((_, index) => {
//                 return {
//                     month: business[index],
//                     isChecked: false,
//                     isDisabled: false,
//                     pricee: 0,
//                     function: this.handleMthCheckBoxClick,
//                     index: index,
//                 };
//             });
//         this.monthlyCheckBox = obj;
//         this.monthlyTransHostCheckBox = obj1;
//     }
//     public handleMonthCheckBoxClick(index: number): void {}
//     public handleMthCheckBoxClick(index: number): void {}

//     public getBusinessYear(): string[] {
//         return this.business;
//     }
//     public monthCheckBoxCount(): number {
//         return this.monthlyCheckBox.reduce((a, b) => {
//             if (b.isChecked && b.isDisabled) {
//                 return a + 1;
//             }
//             return a;
//         }, 0);
//     }
//     public transCheckBoxCount(): number {
//         return this.monthlyTransHostCheckBox.reduce((a, b) => {
//             if (b.isChecked && b.isDisabled) {
//                 return a + 1;
//             }
//             return a;
//         }, 0);
//     }
//     public hostCheckBoxCount(): number {
//         return this.monthlyTransHostCheckBox.reduce((a, b) => {
//             if (b.isChecked && b.isDisabled) {
//                 return a + 1;
//             }
//             return a;
//         }, 0);
//     }

//     public setMainObject(data: SqlData): void {
//         this.mainObject = data;
//         this.tbl_admission = data.tbl_admission;
//         this.tbl_transportfee = data.tbl_transfee;
//         this.tbl_stdmonthfeedetail = data.tbl_stdmonthfeedetail;
//         this.tbl_hostelfee = data.tbl_hostelfee;
//         this.tbl_stdfeemaster = data.tbl_stdfeemaster;
//         this.tbl_stdmonthfeedetail = data.tbl_stdmonthfeedetail;
//         this.tbl_latefinedate = data.tbl_latefinedate;
//         this.tbl_examfee = data.tbl_examfee;
//         this.tbl_miscfee = data.tbl_miscfee;
//         this.tbl_monthfee = data.tbl_monthfee;
//         this.tbl_monthlyfeesetup = data.tbl_monthlyfeesetup;
//     }
//     public getTbl_admission(): tbl_admission | null {
//         return this.tbl_admission;
//     }
//     public getTbl_transportfee(): tbl_transportfee | null {
//         return this.tbl_transportfee;
//     }
//     public getTbl_stdtransdetail(): tbl_stdtransdetail | null {
//         return this.tbl_stdtransdetail;
//     }
//     public getTbl_hostelfee(): tbl_hostelfee | null {
//         return this.tbl_hostelfee;
//     }
//     public getTbl_stdfeemaster(): tbl_stdfeemaster | null {
//         return this.tbl_stdfeemaster;
//     }
//     public getTbl_stdmonthfeedetail(): tbl_stdmonthfeedetail | null {
//         return this.tbl_stdmonthfeedetail;
//     }
//     public getTbl_latefinedate(): tbl_latefinedate | null {
//         return this.tbl_latefinedate;
//     }
//     public getTbl_examfee(): tbl_examfee | null {
//         return this.tbl_examfee;
//     }
//     public getTbl_miscfee(): tbl_miscfee | null {
//         return this.tbl_miscfee;
//     }
//     public getTbl_monthfee(): tbl_monthfee | null {
//         return this.tbl_monthfee;
//     }
//     public getTbl_monthlyfeesetup(): tbl_monthlyfeesetup | null {
//         return this.tbl_monthlyfeesetup;
//     }
// }

// fetch(`${URL}paymentDetails?admno=ASIS192000063`).then((response: any) => {
//     if (response.status === 200) {
//         response.json().then((data: any) => {
//             if (data.status === false) {
//                 console.log(data);
//                 return;
//             }
//             console.clear();
//             const newvalue: SqlData = data.data;
//             const obj = new PaymentDetails();
//             obj.setMainObject(newvalue);
//         });
//     }
// });
