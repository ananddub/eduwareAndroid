import {View, Text} from 'react-native';
function PaymentProfile({title, value}: {title: string; value: string}) {
  return (
    <View
      style={{
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          color: 'gray',
          width: '50%',
          fontWeight: '500',
          fontSize: 15,
        }}>
        {title}
      </Text>
      <Text
        style={{
          color: 'gray',
          fontSize: 15,
          fontWeight: '500',
          width: '50%',
        }}>
        {value}
      </Text>
    </View>
  );
}

export default PaymentProfile;
