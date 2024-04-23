import {View, Text, Dimensions, Modal} from 'react-native';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {ScrollView, Image} from 'react-native';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {dataSelector, setFetchData} from '../app/Data/userValue';
import {useNavigation} from '@react-navigation/native';
import {Circle} from 'react-native-animated-spinkit';
import {useEffect, useState} from 'react';
import Modals from '../BasicComponent/Modal';
function Home() {
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    const [visible, setVisible] = useState(true);
    const [isErro, setError] = useState(false);
    const [text, setText] = useState('');
    const [data, setData] = useState<any>(undefined);
    const navigator = useNavigation();
    const dispatch = useAppDispatch();
    const userData = useAppSelector(dataSelector);
    useEffect(() => {
        console.log('reloaded ');
        fetch(`${userData.url}paymentDetails?admno=${userData.userAdm}`)
            .then((response: any) => {
                if (response.status === 200) {
                    response.json().then((data: any) => {
                        try {
                            if (data.status === false) {
                                console.log(data);
                                return;
                            }
                            // console.clear();
                            console.log('success');
                            setData(data.data);
                            console.log('success seted data to redux');
                            setVisible(false);
                        } catch (err: any) {
                            console.log('inner err', err);
                            setError(true);
                            setText(`dispatch function : ${err}`);
                            setVisible(false);
                        }
                    });
                } else {
                    setError(true);
                    setText('galat error');
                    setError(true);
                    setVisible(false);
                }
            })
            .catch((error: any) => {
                console.log(error);
                setError(true);
                setText(error.message);
            });
    }, []);
    useEffect(() => {
        dispatch(setFetchData(data));
    }, [data]);
    return (
        <View
            style={{
                height: height,
                width: width,
                backgroundColor: '#F1F5F9',
            }}>
            <Modals visible={isErro} text={text} />
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
                    <Circle size={80} color="white"></Circle>
                </View>
            </Modal>
            <ScrollView>
                <View
                    style={{
                        padding: 10,
                        marginTop: 28,
                        backgroundColor: '#F1F5F9',
                    }}>
                    <View
                        style={{
                            width: '100%',
                            height: 200,
                            backgroundColor: 'white',
                            elevation: 3,
                            shadowColor: '#94A3B8',
                            // backgroundColor: "#E2E8F0",
                            // borderRadius: 50,
                            flexDirection: 'column',
                            marginBottom: 10,
                            borderRadius: 10,
                            // borderBottomLeftRadius: 50,
                            // borderBottomRightRadius: 50,
                        }}>
                        <View
                            style={{
                                position: 'absolute',
                                marginTop: 50,
                                marginLeft: 10,
                                flexDirection: 'row',
                            }}>
                            <Image
                                source={{uri: 'https://picsum.photos/200'}}
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 100 / 2,
                                    borderWidth: 2,
                                    borderColor: 'gray',
                                }}
                            />
                            <Text
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: 10,
                                    color: 'black',
                                    fontSize: 17,
                                    fontWeight: '500',
                                }}>
                                {userData.userName}
                            </Text>
                        </View>
                        <View
                            style={{
                                marginLeft: 80,
                                marginTop: 80,
                                flexDirection: 'row',
                            }}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    backgroundColor: 'white',
                                    width: 120,
                                    color: 'gray',
                                    textAlign: 'center',
                                    padding: 2,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: '#D1D5DB',
                                }}>
                                {userData.userFatherName}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    textAlign: 'center',
                                    padding: 2,
                                    marginLeft: 10,
                                    paddingHorizontal: 10,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    backgroundColor: '#ECDFFB',
                                    borderColor: '#E3D8F0',
                                    color: '#4C0F9F',
                                }}>
                                {userData.userAdm}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            <Text
                                style={{
                                    marginTop: 10,
                                    marginLeft: 80,
                                    width: 100,
                                    fontSize: 14,
                                    textAlign: 'center',
                                    padding: 2,
                                    paddingHorizontal: 10,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    backgroundColor: '#FDEAD8',
                                    borderColor: '#F5E2D0',
                                    color: '#AB531A',
                                }}>
                                Roll {userData.userRoll}
                            </Text>
                            <Text
                                style={{
                                    marginTop: 10,
                                    marginLeft: 10,
                                    width: 100,
                                    fontSize: 14,
                                    textAlign: 'center',
                                    padding: 2,
                                    paddingHorizontal: 10,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    backgroundColor: '#FFE4E6',
                                    borderColor: '#FFE4E6',
                                    color: '#BE123C',
                                }}>
                                Class {userData.userClass}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    marginTop: 10,
                                    marginLeft: 80,
                                    width: 100,
                                    fontSize: 14,
                                    textAlign: 'center',
                                    padding: 2,
                                    paddingHorizontal: 10,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    backgroundColor: '#D1FAE4',
                                    borderColor: '#D3F2E1',
                                    color: '#227749',
                                }}>
                                Section {userData.userSection}
                            </Text>
                        </View>
                    </View>
                </View>
                {/* 1st part */}
                <View style={styles.flexdata}>
                    <TouchableOpacity style={styles.box}>
                        {/* <View style={{top:1}}> */}

                        <Image
                            source={require('../assets/annoucment.png')}
                            style={{
                                width: 100,
                                height: 100,
                                top: -15,
                            }}
                        />
                        {/* </View> */}
                        {/* <Icon name="campaign" size={30} color="#000" /> */}
                        <Text style={styles.text}>Annoucement</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Image
                            source={require('../assets/homework.png')}
                            style={{
                                width: 50,
                                height: 50,
                                top: -15,
                            }}
                        />
                        <Text style={styles.text}>HomeWork</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Image
                            source={require('../assets/attendance.png')}
                            style={{
                                width: 100,
                                height: 70,
                                top: -15,
                            }}
                        />
                        <Text style={styles.text}>Attendence</Text>
                    </TouchableOpacity>
                </View>
                {/* 2nd part */}
                <View style={styles.flexdata}>
                    <TouchableOpacity style={styles.box}>
                        <Image
                            source={require('../assets/marks.png')}
                            style={{
                                width: 70,
                                height: 70,
                                top: -10,
                            }}
                        />
                        <Text style={styles.text}>Marks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Image
                            source={require('../assets/e_content.png')}
                            style={{
                                width: 80,
                                height: 80,
                                top: -8,
                            }}
                        />
                        <Text style={styles.text}>Econtent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.box}
                        onPress={() =>
                            navigator.navigate('Fee Payment Profile')
                        }>
                        <Image
                            source={require('../assets/payment.png')}
                            style={{
                                width: 80,
                                height: 80,
                                top: -15,
                            }}
                        />
                        <Text style={styles.text}>Fees Payment</Text>
                    </TouchableOpacity>
                </View>
                {/* 3rd part */}
                <View style={styles.flexdata}>
                    <TouchableOpacity style={styles.box}>
                        <Image
                            source={require('../assets/calendar.png')}
                            style={{
                                width: 80,
                                height: 80,
                                top: -15,
                            }}
                        />
                        <Text style={styles.text}>Anual Calendar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Image
                            source={require('../assets/comment.png')}
                            style={{
                                width: 65,
                                height: 65,
                                top: -15,
                            }}
                        />
                        <Text style={styles.text}>comment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Image
                            source={require('../assets/location.png')}
                            style={{
                                width: 65,
                                height: 65,
                                top: -15,
                            }}
                        />
                        <Text style={styles.text}>Bus Location</Text>
                    </TouchableOpacity>
                </View>
                {/* 4th part */}
                <View style={styles.flexdata}>
                    <TouchableOpacity style={styles.box}>
                        <Image
                            source={require('../assets/notice-board.png')}
                            style={{
                                width: 75,
                                height: 75,
                                top: -10,
                            }}
                        />
                        <Text style={styles.text}>Notice Board</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigator.navigate('Profile')}
                        style={styles.box}>
                        <Image
                            source={require('../assets/user.png')}
                            style={{
                                width: 70,
                                height: 70,
                                top: -10,
                            }}
                        />
                        <Text style={styles.text}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Image
                            source={require('../assets/setting.png')}
                            style={{
                                width: 70,
                                height: 70,
                                top: -10,
                            }}
                        />
                        <Text style={styles.text}>Settings</Text>
                    </TouchableOpacity>
                </View>
                {/* 5th part */}
                <View style={styles.flexdata}>
                    <TouchableOpacity style={styles.box}>
                        <Image
                            source={require('../assets/w-t-s.png')}
                            style={{
                                width: 70,
                                height: 70,
                                top: -10,
                            }}
                        />
                        <Text style={styles.text}>Write To School</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Image
                            source={require('../assets/online_clas.png')}
                            style={{
                                width: 70,
                                height: 70,
                                top: -10,
                            }}
                        />
                        <Text style={styles.text}>Online Class</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Image
                            source={require('../assets/online-test.png')}
                            style={{
                                width: 70,
                                height: 70,
                                top: -10,
                            }}
                        />
                        <Text style={styles.text}>Online Test</Text>
                    </TouchableOpacity>
                </View>

                <View style={{height: 30}}></View>
            </ScrollView>
            {/* <View
                style={{
                    width: width,
                    flexDirection: "row",
                    alignItems: "center",
                    // alignItems: "flex-end",
                    justifyContent: "space-around",
                    height: "7%",
                    position: "absolute",
                    elevation: 2,
                    shadowColor: "gray",
                    backgroundColor: "white",
                    bottom: 0,
                }}
            >
                <TouchableOpacity style={styles.botomTap}>
                    <Text>A</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botomTap}>
                    <Text>A</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botomTap}>
                    <Text>A</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botomTap}>
                    <Text>A</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    box: {
        width: '30%',
        maxWidth: 110,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F1F5F9',
        elevation: 6,
        shadowColor: '#94A3B8',
    },
    flexdata: {
        width: '100%',
        height: 100,
        marginTop: '3%',
        backgroundColor: '#F1F5F9',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: 'white',
    },
    botomTap: {
        height: '95%',
        width: '24.6%',
        borderRadius: 5,
        backgroundColor: '',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        color: 'gray',
        position: 'absolute',
        bottom: 10,
    },
});
