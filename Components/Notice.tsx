import {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {FadeInLeft, FadeInRight} from 'react-native-reanimated';
import {Socket, io} from 'socket.io-client';
import {useAppSelector} from '../app/hooks';
import {dataSelector} from '../app/Data/userValue';
import {Path, Svg} from 'react-native-svg';
import {CommonActions, useNavigation} from '@react-navigation/native';
function Notice() {
  const {width, height} = useWindowDimensions();
  const [message, setMessage] = useState<string[]>([]);
  const userData = useAppSelector(dataSelector);
  const navigator = useNavigation();
  const admno = userData.userData?.tbl_admission.admno;
  useEffect(() => {
    console.log('re rendered message');

    const socket = io(userData.socketurl);
    socket.on('connect', () => {
      console.log('connected');

      socket.emit('register', {admno: admno});
    });

    socket.on('getchat', (data: any) => {
      console.log(
        'object key :',
        Object.keys(data),
        Array.isArray(data.seen),
        Array.isArray(data.unseen),
      );
      let combined: any[] = [];

      if (data.unseen !== false) {
        console.log(data.unseen[0]);
        combined = combined.concat(data.unseen[0]);
        data.unseen.forEach((element: any) => {
          socket.emit('seen', {
            admno: admno,
            name: userData.userData?.tbl_admission.name,
            message: element.message,
            messageid: element.messageid,
            class: userData.userClass,
            sec: userData.userSection,
          });
        });
      }

      if (data.seen !== false) {
        console.log(data.seen[0], data.unseen[0]);
        if (
          Array.isArray(data.unseen) == true &&
          data.seen[0].messageid === data.unseen[0].messageid
        )
          data.seen.shift();
        console.log('passed this was true');
        combined = combined.concat(data.seen);
      }

      if (combined.length === 0) {
        console.log('not selected any message');
        return;
      }

      setMessage(combined);
    });

    socket.on('notice', (mes: any) => {
      console.log('i am still active ');
      socket.emit('getchat', {
        admno: admno,
        class: userData.userClass,
        sec: userData.userSection,
      });
    });

    // Emitting 'getchat' once after socket connection
    socket.emit('getchat', {
      admno: admno,
      class: userData.userClass,
      sec: userData.userSection,
    });

    return () => {
      console.log('offed all port which was interfering');
      socket.off('notice');
      socket.off('getchat');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log('keys value :', Object.keys(message));
  }, [message]);
  console.log('rerendering');
  return (
    <View
      style={{
        width: width,
        height: height,
      }}>
      <View
        style={{
          width: '100%',
          height: 40,
          backgroundColor: 'white',
          borderRadius: 10,
          elevation: 5,
          flexDirection: 'row',
          shadowColor: 'gray',
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
          }}>
          <Svg width={40} height={40} viewBox="0 0 16 16" fill="none">
            <Path
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              fill="black"
            />
          </Svg>
        </TouchableOpacity>
        <View
          style={{
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '500',
              color: 'gray',
            }}>
            Annoucment
          </Text>
        </View>
      </View>
      <ScrollView
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        {message.map((item: any, index) => {
          console.log(index);
          let dateStr = item?.date;
          let date = new Date(dateStr);
          let formattedDate = date.toISOString().split('T')[0];
          console.log('formdata :', formattedDate); // Output: "2024-04-26"

          return (
            <Animated.View
              key={index}
              entering={FadeInRight.delay().duration(2000).springify()}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 20,
                backgroundColor: 'white',
                elevation: 5,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                }}>
                {item.message}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  justifyContent: 'flex-end',
                  gap: 20,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'gray',
                    textAlign: 'right',
                  }}>
                  {item?.time}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: 'gray',
                    textAlign: 'right',
                  }}>
                  {formattedDate}
                </Text>
              </View>
            </Animated.View>
          );
        })}
        <View
          style={{
            height: 100,
          }}></View>
      </ScrollView>
    </View>
  );
}

export default Notice;
