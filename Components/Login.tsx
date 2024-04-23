import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Button,
  BackHandler,
} from 'react-native';
import {
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {URL} from '../Context/Address';
import Input from '../BasicComponent/Input';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import ButtonAnimation from '../BasicComponent/Button';
import Animated from 'react-native-reanimated';
import LoginFeild from '../BasicComponent/LoginFeild';
import BasicDetail from '../Context/ProvideBasic';
import {Modal} from 'react-native';
import useCallback from 'react';
import {useUser} from '../Context/Context';
function Login() {
  const navigate = useNavigation();
  const height: number = Dimensions.get('window').height;
  const hieght1 = useSharedValue(0);
  const hieght2 = useSharedValue(0);
  const button = useSharedValue(15);
  const [isExist, setIsExist] = useState(false);
  const width: number = Dimensions.get('window').width;
  const context = useUser();
  const [flag, setFlag] = useState(false);
  // const [visible, setVisible] = useState(false);
  const [inter, setIter]: [
    NodeJS.Timeout | null,
    (value: NodeJS.Timeout | null) => void,
  ] = useState(null);

  useEffect(() => {
    console.log('Button animation');
    hieght1.value = withTiming(height / 1.6, {
      duration: 1000,
    });
    hieght2.value = withTiming(
      height / 1.68,
      {
        duration: 1000,
      },
      () => {
        hieght1.value = height / 1.6;
        hieght2.value = height / 1.68;
        console.log('animation done');
      },
    );
    setFlag(true);
  }, []);

  const onHandle = () => {
    const interval = setTimeout(() => {
      console.log(inter);
      if (flag) {
        hieght1.value = height / 1.6;
        hieght2.value = height / 1.68;
        hieght1.value = withTiming(height / 4.5, {
          duration: 300,
        });
        hieght2.value = withTiming(height / 4.45, {
          duration: 300,
        });
      } else {
        hieght1.value = height / 4.5;
        hieght2.value = height / 4.45;
        hieght1.value = withTiming(height / 1.6, {
          duration: 300,
        });
        hieght2.value = withTiming(height / 1.68, {
          duration: 300,
        });
      }
      setFlag(!flag);
    }, 100);
    if (inter == null) {
      setIter(interval);
    } else {
      clearTimeout(inter);
      setIter(interval);
    }
  };

  return (
    <Animated.View
      style={{
        height: height,
        backgroundColor: 'white',
      }}>
      <Animated.View
        style={{
          height: hieght1,
          width: width,
          backgroundColor: '#FF762A',
          justifyContent: 'center',
          // borderBottomLeftRadius: 100,
          // borderBottomRightRadius: 100,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 30, color: 'white'}}>Welcome To</Text>
        <Text style={{fontSize: 40, color: 'white'}}>Eduware</Text>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          marginTop: hieght2,
          width: width,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View>
          <TouchableOpacity onPress={onHandle} activeOpacity={0.98}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 15,
                paddingHorizontal: flag ? 60 : 80,
                borderRadius: 10,
                elevation: 5,
              }}>
              <Text
                style={{
                  color: '#FF762A',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                {flag ? 'Get Started' : 'Back'}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {!flag && (
          <LoginFeild
            fun={() => {
              // fetch();
              console.log('sucuess ', context.user.userPhone);
              navigate.navigate('Listing');
            }}
          />
        )}
      </Animated.View>
    </Animated.View>
  );
}

export default Login;
const styles = StyleSheet.create({
  box: {
    backgroundColor: '#FF762A',
  },
});
