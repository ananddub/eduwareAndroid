import {View, TextInput, Text, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
function ProfileInputTable(props: {
  title: string;
  isEditable: boolean;
  placeholder: string;
  value: string;
  name: string;
  onChange: (title: string, value: string) => void;
}): JSX.Element {
  const {title, name, isEditable, placeholder, value, onChange} = props;
  const [text, setText] = useState(value);
  useEffect(() => {
    onChange(name, text);
  }, [text]);
  return (
    <View
      style={{
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 5,
        // backgroundColor: "red",
      }}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.etext}>{value}</Text>
      {/* <TextInput
                style={isEditable == true ? styles.focus : styles.etext}
                onChangeText={(e) => setText(e)}
                placeholder={placeholder}
                editable={isEditable}
                value={text}
            /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: '500',
    width: '45%',
    color: '#4B5563',
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingTop: 20,
    // backgroundColor: "red",
    borderRadius: 10,
  },
  etext: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    width: '55%',
    color: '#4B5563',
    // backgroundColor: "white",
    // backgroundColor: "green",
    flexDirection: 'column',
    paddingLeft: 20,
    paddingTop: 20,
  },
  focus: {
    fontSize: 15,
    fontWeight: '500',
    width: 200,
    marginTop: 5,
    marginLeft: 10,
    color: '#4B5563',
    backgroundColor: 'white',
    flexDirection: 'column',
    borderRadius: 10,
    borderColor: '#F97316',
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default ProfileInputTable;
