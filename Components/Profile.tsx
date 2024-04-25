import * as Font from 'expo-font';
import {useCallback, useEffect, useState} from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import ProfileInputTable from '../BasicComponent/ProfileInput';
import {Svg, Path} from 'react-native-svg';
import Animated from 'react-native-reanimated';
import {ProfileEditable} from '../Context/Class';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {URL} from '../Context/Address';
import {dataSelector} from '../app/Data/userValue';
import {useAppSelector} from '../app/hooks';
function Profile() {
  const [isEditable, setIsEditable]: [boolean, (value: boolean) => void] =
    useState(false);
  const [blur, setBlur] = useState(0.1);
  const state = new ProfileEditable();
  const hieght: number = Dimensions.get('window').height;
  const width: number = Dimensions.get('window').width;
  const navigator = useNavigation();
  const [image, setImage] = useState<any>('');
  const userData = useAppSelector(dataSelector);
  const [fetchData, setFetchData]: [any, (data: any) => void] = useState();
  const [reload, setReload] = useState(true);
  const onChange = (title: string, data: string) => {
    switch (title) {
      case 'name':
        state.userName = data;
        break;
      case 'email':
        state.userMailId = data;
        break;
      case 'phone':
        state.userPhone = data;
        break;
      case 'houseNumber':
        state.userHouseNo = data;
        break;
      case 'fname':
        state.userFatherName = data;
      case 'mname':
        state.userMotherName = data;
      case 'Address':
        state.userAddress = data;
        break;
      case 'dob':
        state.userAddress = data;
    }
  };
  useEffect(() => {
    console.log(userData.userAdm);
    const url = `${URL}BasicDetails?admno=${userData.userAdm}`;
    setFetchData(userData?.userData.tbl_admission);
    setImage(userData?.image);
    console.log('Reloaded successfully');
  }, [reload]);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        console.log('reloaded me');
        console.log(userData?.userData.tbl_admission.fname);
        setFetchData(userData.userData.tbl_admission);
      }, 1000);
    }, []),
  );

  const handlePressIn = () => {
    console.log('commed in');
    console.log(blur);
    setBlur(10);
  };

  useEffect(() => {}, [userData]);
  const handlePressOut = () => {
    setBlur(0.1);
    console.log(blur);
  };
  const onEdit = () => {
    navigator.navigate('Edit Profile', {data: fetchData});
    console.log('welcome to edit profile');
  };
  return (
    <Animated.View
      style={{
        width: width,
        height: hieght,
        backgroundColor: '#F1F5F9',
      }}>
      <ScrollView>
        <View
          style={{
            bottom: -120,
            width: width,
            height: 150,
            backgroundColor: 'white',
            // elevation: 5,
          }}></View>
        <View
          style={{
            position: 'absolute',
            width: width,
            height: 150,
            backgroundColor: '#000000',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log('clicked Back button');
              navigator.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                }),
              );
            }}
            style={{
              position: 'absolute',
              left: 10,
              top: 40,
            }}>
            <Svg width={40} height={40} viewBox="0 0 16 16" fill="none">
              <Path
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                fill="white"
              />
            </Svg>
          </TouchableOpacity>
          <Pressable
            style={{
              // position: "absolute",
              backgroundColor: 'red',
              width: width,
            }}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            <View
              style={{
                bottom: -70,
                width: width,
                height: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: image}}
                style={{
                  bottom: 0,
                  left: -2,
                  width: 120,
                  height: 120,
                  borderWidth: 3,
                  backgroundColor: 'gray',
                  borderColor: 'gray',
                  borderRadius: 1000 / 2,
                }}
                blurRadius={blur}
              />
            </View>
            {blur === 10 && (
              <Text
                style={{
                  position: 'absolute',
                  bottom: -20,
                  fontSize: 18,
                  width: width,
                  fontWeight: '500',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Select Image
              </Text>
            )}
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 60,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: 'black',
            }}>
            {fetchData?.name}
            {/* Anand Kumar Dubey */}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: 'gray',
            }}>
            {fetchData?.admno}
            {/* ASIS192000047 */}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            width: width,
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 20,
            paddingHorizontal: 20,
            borderRadius: 20,
          }}>
          <View
            style={{
              width: '100%',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'baseline',
              backgroundColor: 'transparent',
              borderRadius: 20,
            }}>
            <View
              style={{
                height: 100,
                width: '100%',
                marginTop: 10,
                // backgroundColor: "red",
                paddingVertical: 20,
                paddingHorizontal: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: 20,
                // Heig,
                // height: 10,
              }}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'gray',
                    fontWeight: 500,
                  }}>
                  Personal Info
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onEdit}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'gray',
                    // color: ,
                    fontWeight: 500,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
              <ProfileInputTable
                name="name"
                title="Name"
                isEditable={false}
                placeholder="Enter your name"
                value={fetchData?.name}
                onChange={onChange}
              />
              <ProfileInputTable
                name="adm"
                title="Adm No"
                isEditable={false}
                placeholder="Enter your admission number"
                value={fetchData?.admno}
                onChange={onChange}
              />
              <ProfileInputTable
                name="class"
                title="Class"
                isEditable={false}
                placeholder="Enter your class"
                value={fetchData?.class}
                onChange={onChange}
              />
              <ProfileInputTable
                name="section"
                title="Section"
                isEditable={false}
                placeholder="Enter your section"
                value={fetchData?.section}
                onChange={onChange}
              />
              <ProfileInputTable
                name="roll"
                title="Roll No"
                isEditable={false}
                placeholder="Enter your roll number"
                value={fetchData?.roll}
                onChange={onChange}
              />
              <ProfileInputTable
                name="Gender"
                title="Gender"
                isEditable={false}
                placeholder=""
                value={fetchData?.gender}
                onChange={onChange}
              />
            </View>
            <View></View>
            <View
              style={{
                height: 100,
                width: '100%',
                top: -80,
                paddingVertical: 20,

                paddingHorizontal: 10,
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: 20,
                // Heig,
                // height: 10,
              }}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'gray',
                    fontWeight: 500,
                  }}>
                  Aditional Info
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onEdit}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'gray',
                    // color: ,
                    fontWeight: 500,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                top: -130,
                // height: 310,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5,
                shadowColor: 'gray',
                backgroundColor: 'white',
                flexDirection: 'column',
                paddingVertical: 10,
                // marginTop: 50,
                borderRadius: 20,
              }}>
              <ProfileInputTable
                name="hname"
                title="House's Name"
                isEditable={false}
                placeholder="Enter your house name"
                value={fetchData?.house}
                onChange={onChange}
              />
              <ProfileInputTable
                name="fname"
                title="Father's Name"
                isEditable={false}
                placeholder="Enter your Father name"
                value={fetchData?.fname}
                onChange={onChange}
              />
              <ProfileInputTable
                name="Mother's Name"
                title="mname"
                isEditable={false}
                placeholder="Enter your Mother name"
                value={fetchData?.mname}
                onChange={onChange}
              />
              <ProfileInputTable
                name="phone"
                title="Phone Number"
                isEditable={false}
                placeholder="Enter your phone number"
                value={fetchData?.fmob}
                onChange={onChange}
              />

              <ProfileInputTable
                name="Trans"
                title="Trans"
                isEditable={false}
                placeholder="Enter your  Transport"
                value="Yes"
                onChange={onChange}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

export default Profile;
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: '500',
    maxWidth: 200,
    color: '#4B5563',
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingLeft: 20,
    paddingTop: 20,
  },
  focus: {
    fontSize: 15,
    fontWeight: '500',
    maxWidth: 200,
    marginTop: 2,
    color: '#4B5563',
    backgroundColor: 'red',
    flexDirection: 'column',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textContainer: {
    width: '100%',
    top: -100,
    // height: ,
    // maxWidth: 500,
    // height: 310,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'gray',
    backgroundColor: 'white',
    flexDirection: 'column',
    marginTop: 50,
    borderRadius: 20,
    paddingVertical: 10,
  },
});
