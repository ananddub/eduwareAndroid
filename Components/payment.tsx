// ASIS192000063
import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import PaymentProfile from '../BasicComponent/PaymentProfile';
import {useEffect, useState} from 'react';
import {useAppSelector} from '../app/hooks';
import {dataSelector} from '../app/Data/userValue';
import {URL} from '../Context/Address';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
function Payment() {
  const {width, height} = useWindowDimensions();
  const appData = useAppSelector(dataSelector);
  const admno = appData.userAdm;
  const [data, setData]: any = useState();
  const navigate = useNavigation();
  useEffect(() => {
    setData(appData.userData?.tbl_admission);
    // fetch(`${URL}BasicDetails?admno=${admno}`).then(async (resp: any) => {
    //     const value = await resp.json();
    //     setData(value.status.data[0]);
    // });
  }, []);
  return (
    <>
      <View
        style={{
          width: width,
          height: height + 10,
          backgroundColor: 'white',
          borderRadius: 20,
        }}>
        <ScrollView>
          <View
            style={{
              // position: "relateive",
              height: height,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 5,
              backgroundColor: '#E5EAF1',
            }}>
            <View
              style={{
                top: -50,
                width: '95%',
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
              <PaymentProfile title="Admission No" value={data?.admno} />
              <PaymentProfile title="Name" value={data?.name} />
              <PaymentProfile title="Class" value={data?.class} />
              <PaymentProfile title="Section" value={data?.section} />
              <PaymentProfile title="Roll" value={data?.roll} />
              <PaymentProfile title="Father's Name" value={data?.fname} />
              <PaymentProfile title="Mob No" value={data?.fmob} />
              <PaymentProfile title="Whatsapp No" value={data?.whatsapp} />
              <PaymentProfile title="Transport" value={data?.transport} />
              <PaymentProfile title="Destination" value={data?.pdist} />
              <PaymentProfile title="Hostel" value={data?.hostel} />
              <PaymentProfile title="Session" value={data?.session} />
            </View>
            <TouchableOpacity
              onPress={() => navigate.navigate('Select Month')}
              style={{
                width: '95%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginTop: 10,
                elevation: 10,
                shadowColor: '#F97316',
                backgroundColor: '#F97316',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: 'white',
                }}>
                Next
              </Text>
            </TouchableOpacity>
            {/* <Button title="ky Hll" /> */}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default Payment;
