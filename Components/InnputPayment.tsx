import {
  ScrollView,
  Text,
  TouchableOpacity,
  Button,
  View,
  useWindowDimensions,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {PaymentDetails} from '../Context/Class';
import {FeeClass, SqlData} from '../Context/Interface';
import {URL} from '../Context/Address';
import {tbl_monthfee} from '../Context/Interface';
import {useEffect, useState} from 'react';
import PaymentProfile from '../BasicComponent/PaymentProfile';
import {useAppSelector} from '../app/hooks';
import {dataSelector} from '../app/Data/userValue';

function InputPaymentProfile() {
  const {width, height} = useWindowDimensions();
  const appData = useAppSelector(dataSelector);
  const [data, setData]: [
    SqlData | undefined,
    (value: SqlData | undefined) => void,
  ] = useState();
  const busyear = [
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar',
  ];
  useEffect(() => {
    setData(appData.userData);
    // fetch(`${URL}paymentDetails?admno=${appData.userAdm}`).then(
    //     (response: any) => {
    //         if (response.status === 200) {
    //             response.json().then((data: any) => {
    //                 if (data.status === false) {
    //                     console.log(data);
    //                     return;
    //                 }
    //                 console.clear();
    //                 const newvalue: SqlData = data.data;
    //                 setData(newvalue);
    //                 const obj = new PaymentDetails();
    //                 obj.setMainObject(newvalue);
    //             });
    //         }
    //     }
    // );
  }, []);
  useEffect(() => {
    if (typeof data?.tbl_monthfee !== 'undefined') {
      const arr: FeeClass[] = [];
      for (let [key, value] of Object.entries(data.tbl_monthfee)) {
        if (key.length < 4) {
          console.log(key, value);
          const datas: FeeClass = {
            isChecked: value > 0,
            isDisabled: value > 0,
            name: `${key}`,
            value: `${value}`,
            latefind:
              checkLateFine(key) && data?.tbl_latefinedate !== undefined
                ? data?.tbl_monthlyfeesetup.fine
                : 0,
          };
          arr.push(datas);
        }
      }
      setMonthCheck(arr);
    }
    if (
      typeof data?.tbl_admission !== 'undefined' &&
      data?.tbl_admission.transport == 'YES'
    ) {
      const arr: FeeClass[] = [];
      for (let [key, value] of Object.entries(data.tbl_transfee)) {
        if (key.length < 4) {
          console.log(key, value);
          const datas: FeeClass = {
            isChecked: value > 0,
            isDisabled: value > 0,
            name: `${key}`,
            value: `${value}`,
            latefind:
              checkLateFine(key) && data?.tbl_latefinedate !== undefined
                ? data?.tbl_monthlyfeesetup.transfine
                : 0,
          };
          arr.push(datas);
        }
      }
      setMthCheck(arr);
    } else if (
      typeof data?.tbl_admission !== 'undefined' &&
      data?.tbl_admission.hostel == 'YES'
    ) {
      const arr: FeeClass[] = [];
      for (let [key, value] of Object.entries(data.tbl_hostelfee)) {
        if (key.length < 4) {
          console.log(key, value);
          const datas: FeeClass = {
            isChecked: value > 0,
            isDisabled: value > 0,
            name: `${key}`,
            value: `${value}`,
            latefind: 0,
          };
          arr.push(datas);
        }
      }
      setMthCheck(arr);
    }
  }, [data]);
  const [monthCount, setMonthCount] = useState<number>(0);
  const [mthCount, setMthCount] = useState<number>(0);
  const [lmonthCount, setlMonthCount] = useState<number>(0);
  const [lmthCount, setlMthCount] = useState<number>(0);

  const [total, setTotal] = useState<number>(0);

  const [mthCheckBox, setMthCheck] = useState<Array<FeeClass>>(
    Array(12).fill({
      isDisabled: false,
      isChecked: false,
      name: '',
      value: 0,
      latefind: 0,
    }),
  );
  function checkLateFine(m: string) {
    const currentDate = new Date();
    let monthList = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let busMonth = [
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
    ];
    let day = currentDate.getDate();
    let month = currentDate.getMonth();
    let num = monthList[month];
    month = busMonth.indexOf(num);

    if (data?.tbl_latefinedate !== undefined) {
      if (m === num && day > data.tbl_latefinedate.lday) {
        return true;
      } else if (
        (month === 11 && month !== busMonth.indexOf(m)) ||
        (month !== 11 && busMonth.indexOf(m) === month - 1 && day > 11)
      ) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  const [monthCheckBox, setMonthCheck] = useState<Array<FeeClass>>(
    Array(12).fill({
      isDisabled: false,
      isChecked: false,
      name: 'April',
      value: 0,
      latefind: 0,
    }),
  );

  useEffect(() => {
    let lmcount: number = 0;
    const mcount: number = monthCheckBox.reduce((a, b) => {
      if (b.isChecked === true && b.isDisabled === false) {
        if (checkLateFine(b.name)) lmcount += 1;
        return (a += 1);
      }
      return a;
    }, 0);
    let lmthcount: number = 0;
    const mthcount: number = mthCheckBox.reduce((a, b) => {
      if (b.isChecked === true && b.isDisabled === false) {
        if (checkLateFine(b.name)) lmthcount += 1;

        return (a += 1);
      }
      return a;
    }, 0);
    console.log('ltmh :', lmthcount);
    setMonthCount(mcount);
    setlMthCount(lmthcount);
    setlMonthCount(lmcount);
    setMthCount(mthcount);
    console.log('total Checked :', mcount);
  }, [mthCheckBox, monthCheckBox]);

  const onCheckMonth = (index: number, isCheck: boolean) => {
    const arr = Array.from(monthCheckBox);
    arr[index].isChecked = isCheck;
    setMonthCheck(arr);
  };
  const onCheckMth = (index: number, isCheck: boolean) => {
    let arr = Array.from(mthCheckBox);
    arr[index].isChecked = isCheck;
    setMthCheck(arr);
  };
  const totalAmount = () => {
    if (data?.tbl_stdfeemaster !== undefined) {
      let sumMonth =
        monthCount * data.tbl_stdfeemaster.monthfee +
        monthCount * data?.tbl_monthlyfeesetup.fine;
      if (data?.tbl_admission.transport === 'YES') {
        const sumTrans =
          mthCount * data.tbl_stdfeemaster.transportfee +
          mthCount * data.tbl_monthlyfeesetup.transfine;
        sumMonth += sumTrans;
      } else if (data?.tbl_admission.hostel === 'YES') {
        const sumHost = mthCount * data.tbl_stdfeemaster.hostelfee;
        sumMonth += sumHost;
      }
      sumMonth += data.tbl_monthfee.billdues;
      sumMonth += data.tbl_monthlyfeesetup.miscfee;
      sumMonth += data.tbl_monthlyfeesetup.examfee;
      return sumMonth;
    }
    return 0;
  };
  return (
    <View
      style={{
        width: width,
        height: height + 10,
        backgroundColor: '#F1F5F9',
      }}>
      <ScrollView
        style={{
          width: width,
          borderRadius: 20,
          paddingHorizontal: 20,
          backgroundColor: '#F1F5F9',
        }}>
        <View
          style={{
            width: '100%',
            marginTop: 20,
            marginBottom: 10,

            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: '#F1F5F9',

            borderRadius: 20,
          }}>
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center',
              borderRadius: 15,
              padding: 20,
              elevation: 10,

              shadowColor: 'gray',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: 20,
                // alignItems: "center",
              }}>
              <Text
                style={{
                  color: 'gray',
                  backgroundColor: '#01BAFA',
                  color: 'white',
                  width: '48%',
                  padding: 10,
                  borderRadius: 20,
                  elevation: 4,
                  shadowColor: '#01BAFA',
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Monthly (₹{data?.tbl_stdfeemaster.monthfee})
              </Text>
              {data?.tbl_admission !== undefined &&
                data.tbl_admission.transport == 'YES' && (
                  <Text
                    style={{
                      color: 'gray',
                      backgroundColor: '#01BAFA',
                      color: 'white',
                      width: '48%',
                      padding: 10,
                      borderRadius: 20,
                      elevation: 4,
                      shadowColor: '#01BAFA',
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    Transport (₹
                    {data?.tbl_stdfeemaster.transportfee})
                  </Text>
                )}

              {data?.tbl_admission !== undefined &&
                data.tbl_admission.hostel == 'YES' && (
                  <Text
                    style={{
                      color: 'gray',
                      backgroundColor: '#01BAFA',
                      color: 'white',
                      width: '48%',
                      padding: 10,
                      borderRadius: 20,
                      elevation: 4,
                      shadowColor: '#01BAFA',
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    Hostel (₹
                    {data?.tbl_stdfeemaster.hostelfee})
                  </Text>
                )}
              {/* <Text
                                    style={{
                      color:"gray",
                                        backgroundColor: "#01BAFA",
                                        color: "white",
                                        width: "48%",
                                        padding: 10,
                                        borderRadius: 20,
                                        shadowColor: "#01BAFA",

                                        elevation: 5,
                                        fontSize: 16,
                                        fontWeight: "500",
                                    }}
                                >
                                    Transport (₹600)
                                </Text> */}
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View
                style={{
                  width: '48%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                {monthCheckBox.map((item, index) => {
                  return (
                    <View
                      key={`m${index}`}
                      style={{
                        marginLeft: '24%',

                        marginTop: 10,
                      }}>
                      <BouncyCheckbox
                        size={30}
                        fillColor={item.isDisabled ? '#2DD4BF' : '#F87171'}
                        unFillColor="#FFFFFF"
                        text={`${item.name}`}
                        disabled={item.isDisabled}
                        isChecked={item.isChecked}
                        iconStyle={{
                          borderColor: '#F87171',
                        }}
                        innerIconStyle={{
                          borderWidth: 2,
                        }}
                        textStyle={{
                          fontSize: 16,
                          fontWeight: '500',
                        }}
                        onPress={(isChecked: boolean) => {
                          console.log(isChecked);
                          onCheckMonth(index, isChecked);
                        }}
                      />
                    </View>
                  );
                })}
              </View>
              {data?.tbl_admission !== undefined &&
                (data?.tbl_admission.transport === 'YES' ||
                  data?.tbl_admission.hostel === 'YES') && (
                  <View
                    style={{
                      width: '48%',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    {mthCheckBox.map((item, index) => {
                      return (
                        <View
                          key={`m${index}`}
                          style={{
                            marginLeft: '24%',

                            marginTop: 10,
                          }}>
                          <BouncyCheckbox
                            size={30}
                            fillColor={item.isDisabled ? '#2DD4BF' : '#F87171'}
                            unFillColor="#FFFFFF"
                            text={`${item.name}`}
                            disabled={item.isDisabled}
                            isChecked={item.isChecked}
                            iconStyle={{
                              borderColor: '#F87171',
                            }}
                            innerIconStyle={{
                              borderWidth: 2,
                            }}
                            textStyle={{
                              fontSize: 16,
                              fontWeight: '500',
                            }}
                            onPress={(isChecked: boolean) => {
                              onCheckMth(index, isChecked);
                            }}
                          />
                        </View>
                      );
                    })}
                  </View>
                )}
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              elevation: 10,
              borderRadius: 20,
              paddingVertical: 20,
              shadowColor: 'gray',
              // paddingHorizontal: 10,
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'gray',
                  width: '70%',
                  fontWeight: '400',
                  fontSize: 17,
                }}>
                Month Fee ({monthCount}X{data?.tbl_stdfeemaster.monthfee})
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 17,
                  textAlign: 'left',

                  fontWeight: '400',
                  width: '25%',
                }}>
                {data?.tbl_stdfeemaster !== undefined
                  ? data?.tbl_stdfeemaster.monthfee * monthCount
                  : 0}
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'gray',
                  width: '70%',
                  fontWeight: '400',
                  fontSize: 17,
                }}>
                Late Fine ({lmonthCount}X{data?.tbl_monthlyfeesetup.fine})
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 17,
                  textAlign: 'left',
                  fontWeight: '400',
                  width: '25%',
                }}>
                {lmonthCount * data?.tbl_monthlyfeesetup.fine}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                paddingTop: 20,
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'gray',
                  width: '70%',
                  fontWeight: '400',
                  fontSize: 17,
                }}>
                Destination
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 17,
                  textAlign: 'left',
                  fontWeight: '400',
                  width: '25%',
                }}>
                0
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'gray',
                  width: '70%',
                  fontWeight: '400',
                  fontSize: 17,
                }}>
                Transport Fee (
                {data?.tbl_admission !== undefined &&
                data.tbl_admission.transport == 'YES'
                  ? mthCount
                  : 0}
                X
                {data?.tbl_admission !== undefined &&
                data.tbl_admission.transport == 'YES'
                  ? data?.tbl_stdfeemaster.transportfee
                  : 0}
                )
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 17,
                  textAlign: 'left',
                  fontWeight: '400',
                  width: '25%',
                }}>
                {data?.tbl_admission !== undefined &&
                data.tbl_admission.transport == 'YES' &&
                data?.tbl_stdfeemaster !== undefined
                  ? mthCount * data.tbl_stdfeemaster.transportfee
                  : 0}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'gray',
                  width: '70%',
                  fontWeight: '400',
                  fontSize: 17,
                }}>
                Late Fee ({' '}
                {data?.tbl_admission !== undefined &&
                data.tbl_admission.transport == 'YES' &&
                data?.tbl_stdfeemaster !== undefined
                  ? lmthCount
                  : 0}
                X
                {data?.tbl_admission !== undefined &&
                data.tbl_admission.hostel == 'YES' &&
                data?.tbl_stdfeemaster !== undefined
                  ? data?.tbl_stdmonthfeedetail.tfine
                  : 0}
                )
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 17,
                  textAlign: 'left',
                  fontWeight: '400',
                  width: '25%',
                }}>
                {data?.tbl_admission !== undefined &&
                data.tbl_admission.transport == 'YES' &&
                data?.tbl_stdfeemaster !== undefined
                  ? lmthCount * data.tbl_stdmonthfeedetail.hfine
                  : 0}
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                paddingTop: 20,
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'gray',
                  width: '70%',
                  fontWeight: '400',
                  fontSize: 17,
                }}>
                Hostel Fee (
                {data?.tbl_admission !== undefined &&
                data.tbl_admission.hostel == 'YES'
                  ? mthCount
                  : 0}
                X
                {data?.tbl_admission !== undefined &&
                data.tbl_admission.hostel == 'YES' &&
                data?.tbl_stdfeemaster !== undefined
                  ? data?.tbl_stdmonthfeedetail.hostelfee
                  : 0}
                )
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 17,
                  textAlign: 'left',
                  fontWeight: '400',
                  width: '25%',
                }}>
                {data?.tbl_admission !== undefined &&
                data.tbl_admission.transport == 'YES' &&
                data?.tbl_stdfeemaster !== undefined
                  ? mthCount * data.tbl_stdmonthfeedetail.hostelfee
                  : 0}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'gray',
                  width: '70%',
                  fontWeight: '400',
                  fontSize: 17,
                }}>
                Late Fee (
                {data?.tbl_admission !== undefined &&
                data.tbl_admission.hostel == 'YES'
                  ? lmthCount
                  : 0}
                X
                {data?.tbl_admission !== undefined &&
                data.tbl_admission.hostel == 'YES' &&
                data?.tbl_stdfeemaster !== undefined
                  ? data?.tbl_stdmonthfeedetail.hfine
                  : 0}
                )
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 17,
                  textAlign: 'left',
                  fontWeight: '400',
                  width: '25%',
                }}>
                {data?.tbl_admission !== undefined &&
                data.tbl_admission.transport == 'YES' &&
                data?.tbl_stdfeemaster !== undefined
                  ? lmthCount * data.tbl_stdmonthfeedetail.hfine
                  : 0}
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                paddingTop: 20,
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'gray',
                  width: '70%',
                  fontWeight: '400',
                  fontSize: 17,
                }}>
                Misc Fee
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 17,
                  textAlign: 'left',
                  fontWeight: '400',
                  width: '25%',
                }}>
                {data?.tbl_monthlyfeesetup.miscfee}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'gray',
                  width: '70%',
                  fontWeight: '400',
                  fontSize: 17,
                }}>
                Exam Fee
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 17,
                  textAlign: 'left',
                  fontWeight: '400',
                  width: '25%',
                }}>
                {data?.tbl_monthlyfeesetup.examfee}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'gray',
                  width: '70%',
                  fontWeight: '400',
                  fontSize: 17,
                }}>
                Back Dues
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 17,
                  textAlign: 'left',
                  fontWeight: '400',
                  width: '25%',
                }}>
                {data?.tbl_monthfee.billdues}
              </Text>
            </View>
          </View>
        </View>
        <View style={{height: 200}}></View>
      </ScrollView>
      <View
        style={{
          width: width,
          position: 'fixed',
          paddingVertical: 10,
          bottom: 90,
          flexDirection: 'column',
          backgroundColor: 'white',
          justifyContent: 'space-between',
          alignItems: 'center',
          // borderRadius: 15,
          borderWidth: 1,
          borderColor: '#9CA3AF',
          paddingHorizontal: 30,
          shadowColor: 'gray',
        }}>
        <View
          style={{
            width: width,
            position: 'absolute', // Change from relative to absolute
            bottom: 0, // Stick to the bottom of the screen
            paddingVertical: 10,
            flexDirection: 'column',
            backgroundColor: 'white',
            height: 130,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#9CA3AF',
            paddingHorizontal: 10,
            shadowColor: 'gray',
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: '500',
              }}>
              Total Payment
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: '500',
              }}>
              ₹{totalAmount()}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#01BAFA',
              paddingVertical: 10,
              width: '95%',
              borderRadius: 20,
              shadowColor: '#01BAFA',
            }}>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
                textAlign: 'center',
                fontWeight: '500',
                color: 'white',
              }}>
              procced to pay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default InputPaymentProfile;
