import React, {useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {Dimensions} from 'react-native';
import {Circle} from 'react-native-animated-spinkit';

import {useState} from 'react';
const ButtonAnimation = (props: {
  onPrssedKey: () => void;
  styles: any;
  text: string;
  flags?: boolean;
}) => {
  // console.log(props.flags !== undefined ? props.flags : false);

  const {onPrssedKey, styles, text, flags} = props;
  const flag = useState(
    typeof flags === 'boolean' && flags == true ? flags : false,
  );
  // console.log(typeof props.flags, flag[0]);

  const scaleValue = useRef(new Animated.Value(1)).current;
  const width = Dimensions.get('window').width;
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start(() => {});
    onPrssedKey();
  };

  const animatedStyle = {
    transform: [{scale: scaleValue}],
  };
  const animationCirlce = () => {
    // console.log(typeof flags);
    if (flags === true) {
      return <Circle size={30} color="white" />;
    }
    return text;
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
      }}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}>
        <Animated.View
          style={[
            {
              backgroundColor: styles.backgroundColor,
              elevation: 5,
              paddingHorizontal:
                styles.paddingHorizontal != undefined
                  ? styles.paddingHorizontal
                  : 20,
              paddingVertical: 10,
              borderRadius: 8,
              width: styles.width,
            },
            animatedStyle,
          ]}>
          <Text
            style={{
              color: styles.color,
              fontSize: 18,
              textAlign: 'center',
            }}>
            {animationCirlce()}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonAnimation;
