import {
  TextInput,
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
} from 'react-native';
import {useState} from 'react';
function Input(props: {
  onchange: (e: any) => void;
  placeholder: string;
  flag?: boolean;
  numberic?: boolean;
}): JSX.Element {
  props.flag = props.flag !== undefined ? props.flag : false;
  props.numberic = props.numberic !== undefined ? props.numberic : false;
  const {onchange, placeholder, flag, numberic} = props;
  const hieght: number = Dimensions.get('window').height;
  const width: number = Dimensions.get('window').width;
  const [focus, setFocus]: [boolean, (value: boolean) => void] =
    useState(false);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          width: width,
          paddingHorizontal: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          keyboardType={numberic ? 'numeric' : 'ascii-capable'}
          secureTextEntry={flag}
          onFocus={() => setFocus(true)}
          placeholderTextColor="gray"
          onBlur={() => setFocus(false)}
          onChangeText={onchange}
          placeholder={placeholder}
          style={[focus ? styles.inputFocus : styles.inputBlur]}
        />
      </View>
    </View>
  );
}

export default Input;
const styles = StyleSheet.create({
  inputFocus: {
    backgroundColor: 'white',
    borderColor: '#FF8F50',
    padding: 3,
    color: 'gray',
    paddingHorizontal: 10,
    fontSize: 15,
    borderWidth: 2,
    borderRadius: 5,
    width: '100%',
    height: 40,
  },
  inputBlur: {
    backgroundColor: 'white',
    borderColor: '#E0E0E0',
    padding: 3,
    color: 'gray',
    paddingHorizontal: 10,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    height: 40,
  },
});
