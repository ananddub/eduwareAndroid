import {useEffect, useState, useContext} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
  Text,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {View} from 'react-native';
import {TextInput} from 'react-native';
import {URL} from '../Context/Address';
import {useUser} from '../Context/Context';
import ButtonAnimation from '../BasicComponent/Button';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {
  dataSelector,
  setuserAdm,
  setuserClass,
  setuserFatherName,
  setuserHost,
  setuserName,
  setuserRoll,
  setuserSection,
  setuserSession,
  setuserStatus,
  setuserTrans,
} from '../app/Data/userValue';
const renderItem = ({item}: {item: any}): JSX.Element => {
  return (
    <View>
      <View
        style={{
          flex: 1,
          flexWrap: 'wrap',
          flexDirection: 'row',
        }}>
        <Image
          source={{uri: 'https://picsum.photos/200'}}
          style={{
            width: 50,
            height: 50,
            borderRadius: 100 / 2,
            marginRight: 10,
          }}
        />
        <View></View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: '#3C3C3C',
              }}>
              {item.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 120,
            }}>
            <View>
              <Text
                style={{
                  backgroundColor: '#D1FAE4',
                  borderColor: '#D3F2E1',
                  color: '#227749',
                  padding: 2,
                  fontSize: 12,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                {item.section}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  backgroundColor: '#FDEAD8',
                  borderColor: '#F5E2D0',
                  color: '#AB531A',
                  padding: 2,
                  fontSize: 12,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                {item.roll}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  backgroundColor: '#ECDFFB',
                  borderColor: '#E3D8F0',
                  color: '#4C0F9F',
                  fontSize: 12,
                  padding: 2,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                {item.class}
              </Text>
            </View>
          </View>
        </View>
        {/* <View>
                    <Text
                        style={{
                            marginLeft: 10,
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 16,

                            fontWeight: "bold",
                            color: "#4BA7E6",
                        }}
                    >
                        next
                    </Text>
                </View> */}
      </View>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          flexDirection: 'row',
          marginTop: 32,
        }}>
        <Text
          style={{
            marginLeft: 57,
            color: '#414147',
            fontSize: 12,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#D1D5DB',
            paddingHorizontal: 7,
          }}>
          {item.fname}
        </Text>
        <Text
          style={{
            marginLeft: 10,
            color: '#414147',
            fontSize: 12,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#D1D5DB',
            paddingHorizontal: 7,
          }}>
          {item.admno}
        </Text>
      </View>
    </View>
  );
};
import {Modal} from 'react-native';
export const Listing = (): JSX.Element => {
  const width: number = Dimensions.get('window').width;
  const height: number = Dimensions.get('window').height;
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);
  const [search, setSearch]: [any, (value: any) => void] = useState([]);
  const navigate = useNavigation();
  const context = useUser();
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const userData = useAppSelector(dataSelector);
  const [selected, setSelected]: [number, (value: number) => void] =
    useState(0);
  const phone = userData.userPhone;
  // console.log("phone: ", selected);
  useEffect(() => {
    const url = `${userData.url}phoneVerfication?phone=${userData.userPhone}`;
    // console.log([url, 0]);
    fetch(url.trim()).then((res: any) => {
      if (res.status === 200) {
        res.json().then((data: any) => {
          // console.log(
          //     "isArray :",
          //     Array.isArray(data.status.data),
          //     data.status.data.length
          // );
          if (data.status.data.length == 1) {
            onsubmit(data.status.data[0], 0);
            return;
          }
          setData(data.status.data);
          setSearch(data.status.data);
          setSelected(-1);
        });
      } else {
        console.log('unable to connect');
      }
    });
  }, []);
  useEffect(() => {
    const arr: any = [];
    if (text == '') {
      setSearch(data);
    } else {
      data.map((item: any) => {
        if (item.name.toLowerCase().includes(text.toLowerCase())) {
          arr.push(item);
        }
      });
      setSearch(arr);
    }
  }, [text]);
  const onsubmit = (item: any, selected: number): void => {
    if (selected != -1) {
      console.log('new admno, selected :', item.admno);
      // dispatch(setuserAdm(item.admno))
      dispatch(setuserAdm(item.admno));
      dispatch(setuserClass(item.class));
      dispatch(setuserRoll(item.roll));
      dispatch(setuserSection(item.section));
      dispatch(setuserFatherName(item.fname));
      dispatch(setuserName(item.name));
      dispatch(setuserSession(item.session));
      dispatch(setuserStatus(item.active));
      dispatch(setuserTrans(item.transport));
      dispatch(setuserHost(item.hostel));
      navigate.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
      // navigate.navigate("Home");
    } else {
      // alert("Please Select a Student");
      setVisible(true);
    }
  };
  // 9631086222
  return (
    <View style={{height: height, backgroundColor: 'white'}}>
      <View
        style={{
          marginTop: 100,
          flexDirection: 'row',
          marginBottom: 5,
          paddingHorizontal: 6,
          marginHorizontal: 5,
          // justifyContent: "center",
        }}>
        <TextInput
          onChangeText={setText}
          style={{
            width: '100%',
            height: 40,
            backgroundColor: focus == true ? 'white' : '#F5F5F5',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: focus == true ? '#FF762A' : '#D1D5DB',
            paddingHorizontal: 10,
          }}
          placeholderTextColor={'gray'}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="Search..."
        />
      </View>
      <View style={{padding: 2}}></View>
      <View
        style={{
          height: '70%',
        }}>
        <FlatList
          style={{
            backgroundColor: '#F8F8FA',
          }}
          data={search}
          renderItem={(item: any) => {
            return (
              <Pressable
                onPress={() => {
                  setFocus(false);
                  setSelected(item.index);
                }}
                style={{
                  backgroundColor: selected == item.index ? '#FFF7ED' : 'white',
                  padding: 10,
                  borderWidth: 1,
                  borderColor: selected == item.index ? '#FFEDD5' : '#EAEBEF',
                }}>
                {renderItem(item)}
              </Pressable>
            );
          }}
          alwaysBounceVertical={true}
          keyExtractor={item => item.admno.toString()}
        />
      </View>
      <View
        style={{
          backgroundColor: '#F8F8FA',
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <ButtonAnimation
          onPrssedKey={() => onsubmit(search[selected], selected)}
          styles={{
            color: 'white',
            backgroundColor: '#FF762A',
            fontWeight: 'bold',
            fontSize: 20,
            width: width / 1.3,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          text="check It"></ButtonAnimation>
      </View>
      <Modal
        animationType="fade"
        visible={visible}
        transparent={true}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            paddingHorizontal: 30,
          }}>
          <View
            style={{
              width: '100%',
              height: 150,
              backgroundColor: '#F1F5F9',
              flexDirection: 'Column',
              borderRadius: 20,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
                color: '#4B5563',
                textAlign: 'center',
              }}>
              please select any student
            </Text>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={{
                width: 200,
                height: 50,

                backgroundColor: '#FF3E03',
                borderRadius: 25,
                elevation: 32,
                shadowColor: '#FF3E03',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '400',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
