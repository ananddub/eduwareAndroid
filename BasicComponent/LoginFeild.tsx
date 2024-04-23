import {View, Text} from 'react-native';
import Input from './Input';
import ButtonAnimation from './Button';
import {TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';
import {useEffect, useState} from 'react';
import {useContext} from 'react';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {
  dataSelector,
  setuserAdm,
  setuserPhone,
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
import {Modal} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../Context/Context';
import {UserDetail} from '../Context/Class';
import {URL} from '../Context/Address';
import {Circle} from 'react-native-animated-spinkit';
function LoginFeild(props: {fun: () => void}): JSX.Element {
  const width = Dimensions.get('window').width;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isExisting, setIsExisting] = useState(false);
  const [isDoesNot, setDoenNot] = useState(false);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('Invalid Phone No Or Password');
  const navigate = useNavigation();
  // const contextDetail = useUser();
  const dispatch = useAppDispatch();
  const data = useAppSelector(dataSelector);
  const onSubmit = async () => {
    setIsExisting(true);
    fetch(`${data.url}phoneVerfication?phone=${username}`)
      .then(async (response: Response) => {
        if (response.status === 200) {
          const value: any = (await response.json()).status;
          if (value.status === true) {
            setIsExisting(false);
            dispatch(setuserPhone(username));
            console.log('data length :', value.data.length);
            if (value.data.length === 1) {
              console.log('moving Direct to user');
              onsubmit(value.data[0], 0);
            }
            console.log('userCOntext :', value.status);
            props.fun();
          } else {
            setText('Invalid phone or password');
            setVisible(true);
            setIsExisting(false);
          }
        }
      })
      .catch((e: any) => {
        setText(e.message);
        setVisible(true);
        setIsExisting(false);
      });
    // console.log(username, "\n", password);
  };
  const onsubmit = (item: any, selected: number): void => {
    const onsubmit = (item: any, selected: number): void => {
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
    };
  };
  return (
    <View style={{marginTop: 30}}>
      <Input
        onchange={e => {
          setUsername(e);
          setDoenNot(false);
        }}
        flag={false}
        numberic={true}
        placeholder="Enter your phone number"
      />
      {isDoesNot === true && (
        <Text
          style={{
            textAlign: 'right',
            fontSize: 12,
            paddingHorizontal: 50,
            fontWeight: 'bold',
            paddingBottom: 10,
            color: '#FF8F50',
          }}>
          user does not exist
        </Text>
      )}
      <Input
        style={{
          color: 'gray',
        }}
        onchange={setPassword}
        flag={true}
        placeholder="password"
      />
      <View
        style={{
          width: width,
          paddingHorizontal: 50,
          flex: 1,
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity>
          <Text
            style={{
              textAlign: 'right',
              fontSize: 12,
              fontWeight: 'bold',
              paddingBottom: 10,
              color: '#FF8F50',
            }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>
      <ButtonAnimation
        onPrssedKey={onSubmit}
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
        flags={isExisting == true}
        text="Sign"
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={{color: 'gray'}}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={{color: '#FF762A', fontWeight: 'bold'}}>Register</Text>
        </TouchableOpacity>
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
              {text}
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
                Okay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default LoginFeild;
