import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Pressable,
  Text,
  TextInput,
  Button,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {Svg, Path} from 'react-native-svg';

import {Modal} from 'react-native';
import ButtonAnimation from '../BasicComponent/Button';
import {
  dataSelector,
  setFetchData,
  setImage,
  setuserAdm,
  setuserFatherName,
  setuserName,
} from '../app/Data/userValue';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {Circle} from 'react-native-animated-spinkit';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';

import CameraIcon, {GalleryIcon} from '../assets/SVG';
import {tbl_admission} from '../Context/Interface';
import {useDispatch} from 'react-redux';
import Modals from '../BasicComponent/Modal';
const App = (props: {route: {params: any}}) => {
  const {data} = props.route.params;
  const {width, height} = useWindowDimensions();
  const [name, setName] = useState(data?.name);
  const [fatherName, setFatherName] = useState(data?.fname);
  const [motherName, setMotherName] = useState(data?.mname);
  const userData = useAppSelector(dataSelector);
  const dispatch = useAppDispatch();
  const [fetchData, setFetchDatas] = useState<any>(userData.userData);
  const [address, setAddress] = useState(data?.pdist);
  const [visible, setVisible] = useState(false);
  const [spin, setSpin] = useState(false);
  const [cameraflag, setCameraflag] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [newData, setNewData] = useState<any>(userData.userData);
  const [cameraFlags, setCameraflags] = useState(false);
  const [blur, setBlur] = useState(10);
  const [text, setText] = useState('');
  const [isErr, setError] = useState(false);
  const navigatar = useNavigation();
  const [flag, setFag] = useState(new Array(6).fill(false));
  const [image, setImages] = useState<{
    type: string;
    name: string;
    uri: string;
  }>({
    type: 'image',
    name: `${userData.userData?.tbl_admission.admno}.jpg`,
    uri: userData.image,
  });
  const handleSubmit = () => {
    // Handle form submission here
    console.log('Name:', name);
    console.log("Father's Name:", fatherName);
    console.log("Mother's Name:", motherName);
    console.log('Address:', address);
    // alert("Data Store Sucessfully Added!");
    if (
      data?.name === name &&
      data?.fname === fatherName &&
      data?.mname === motherName &&
      data?.pdist === address &&
      cameraFlags === false
    ) {
      setVisible2(true);
    } else {
      setConfirm(true);
    }
  };
  const Update = () => {
    try {
      setSpin(true);
      uploadData();
      dispatch(setImage(image.uri));
    } catch (err) {
      console.log(err);
    }
  };

  const reloadData = () => {
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
              setNewData(data.data);
              console.log('reloaded sucess');
              console.log('success seted data to redux');
              setVisible(true);
              setSpin(false);
            } catch (err: any) {
              console.log('inner err', err);
              setSpin(false);
            }
          });
        } else {
          setSpin(false);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setText(`Error : ${error.message}`);
        setError(true);
        setSpin(false);
      });
  };
  useEffect(() => {
    if (spin === false && newData !== userData.userData) {
      console.log('new data seted');
      dispatch(setFetchData(newData));
      dispatch(setImage(image.uri));
    }
  }, [spin]);
  const uploadData = () => {
    const form = new FormData();
    const obj = image;
    try {
      const names = obj.uri.split('/').pop(); // Get the image file name from URI
      const extension = names.slice(names.lastIndexOf('.') + 1);
      console.log(extension);
      obj.name = `${userData.userAdm}.${extension}`;
      if (cameraFlags === true) {
        form.append('image', obj);
        form.append('imagename', obj.name);
      }
      form.append('admno', userData.userAdm);
      form.append('name', name);
      form.append('fname', fatherName);
      form.append('mname', motherName);
      form.append('pdist', address);

      fetch(`${userData.url}profileupdate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: form,
      }).then((resp: any) => {
        try {
          resp.json().then((data: any) => {
            console.log('after update :', data);

            reloadData();
            // setText('hello');
            // setError(true);
          });
        } catch (err: any) {
          setText(`Error : ${err.message}`);
          setError(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  function handleResponse(response: ImagePickerResponse) {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri =
        response.uri || (response.assets && response.assets[0].uri);
      console.log('started uploading');
      setCameraflags(true);
      setImages(response.assets[0]);
    }
  }
  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    setCameraflag(false);

    launchCamera(options, handleResponse);
  };
  const openGallary = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    setCameraflag(false);

    launchImageLibrary(options, handleResponse);
  };
  return (
    <View
      style={{
        width: width,
        height: height,
        flexDirection: 'column',
        // justifyContent: "center",
        alignItems: 'center',
        // backgroundColor: "red",
        // paddingHorizontal: 10,
        backgroundColor: '#F1F5F9',
      }}>
      <View
        style={{
          // flex: 1,
          width: '100%',
          height: height,
          alignItems: 'center',
          backgroundColor: 'white',
          // borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 30,
        }}>
        <Modals visible={isErr} text={text} />
        <Modal
          animationType="fade"
          visible={spin}
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
        <View
          style={{
            top: -150,
            bottom: 0,
            width: '100%',
            height: 300,
            // backgroundColor: "green",
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              width: width,
              // height: 150,
              //   backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                console.log('clicked Back button');
              }}
              style={{
                position: 'absolute',
                left: 10,
                top: 40,
              }}>
              <Svg width={40} height={40} viewBox="0 0 16 16" fill="none">
                <Path
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                  stroke="white"
                />
              </Svg>
            </TouchableOpacity>
            <Pressable
              style={{
                position: 'absolute',
                backgroundColor: 'black',
                width: width,
              }}
              onTouchStart={() => setBlur(10)}
              onTouchEnd={() => {
                setBlur(0);
              }}
              // onPress={()=>}
              // onBlur={() => setBlur(0.01)}
              // onFocus={() => setBlur(10)}
            >
              <View
                style={{
                  bottom: -70,
                  width: width,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: image.uri,
                  }}
                  style={{
                    bottom: 0,
                    left: -2,
                    width: 120,
                    height: 120,

                    borderWidth: 3,
                    backgroundColor: 'gray',
                    borderColor: 'white',
                    borderRadius: 1000 / 2,
                  }}
                  blurRadius={1}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    // width: width,
                    left: width / 1.85,
                    bottom: 10,
                    padding: 10,
                    backgroundColor: 'black',
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setCameraflag(true)}>
                  <CameraIcon
                    color="white"
                    width={30}
                    height={30}
                    style={{}}></CameraIcon>
                </TouchableOpacity>
              </View>
            </Pressable>
            <TouchableOpacity
              onPress={() => {
                console.log('clicked Back button');
                navigatar.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Profile'}],
                  }),
                );
              }}
              style={{
                // backgroundColor: 'white',
                width: 50,
                height: 100,
                borderRadius: 15,
                left: -width / 2.3,
                top: 40,
                position: 'position',
              }}>
              <Svg width={40} height={40} viewBox="0 0 16 16" fill="none">
                <Path
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                  fill="black"
                  stroke={'white'}
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer1}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            onPressIn={() => {
              setFag(new Array(6).fill(false));
              setFag(flag.map((_, x) => x == 0));
            }}
            style={flag[0] ? styles.finput : styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={(e: string) => setName(e.toUpperCase())}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Father's Name</Text>
          <TextInput
            onPressIn={() => {
              setFag(new Array(6).fill(false));
              setFag(flag.map((_, x) => x == 1));
            }}
            style={flag[1] ? styles.finput : styles.input}
            placeholder="Enter father's name"
            value={fatherName}
            onChangeText={(e: string) => setFatherName(e.toUpperCase())}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mother's Name</Text>
          <TextInput
            onPressIn={() => {
              setFag(new Array(6).fill(false));
              setFag(flag.map((_, x) => x == 2));
            }}
            style={flag[2] ? styles.finput : styles.input}
            placeholder="Enter mother's name"
            value={motherName}
            onChangeText={(e: string) => {
              setMotherName(e.toUpperCase());
              setBlur(0.01);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            onPressIn={() => {
              setFag(new Array(6).fill(false));
              setFag(flag.map((_, x) => x == 3));
            }}
            style={flag[3] ? styles.finput : styles.input}
            placeholder="Enter your address"
            value={address}
            onChangeText={(e: string) => setAddress(e.toUpperCase())}
          />
        </View>
        <View
          style={{
            top: -300,
          }}>
          <ButtonAnimation
            onPrssedKey={handleSubmit}
            styles={{
              color: 'white',
              backgroundColor: '#FF762A',
              fontWeight: 'bold',
              fontSize: 20,
              width: width / 1.3,
              borderRadius: 10,
            }}
            text="Save"
          />
        </View>
      </View>
      <Modal
        animationType="fade"
        visible={spin}
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
      <Modal
        animationType="fade"
        visible={confirm}
        transparent={true}
        onRequestClose={() => {
          // setVisible(false);
          setConfirm(false);
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
              Confirm Update?
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  {
                    Update();
                    setConfirm(false);
                    setVisible(false);
                  }
                }}
                style={{
                  width: '40%',
                  height: 50,

                  backgroundColor: '#32AD29',
                  borderRadius: 25,
                  elevation: 32,
                  shadowColor: '#32AD29',
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
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setConfirm(false);
                  setVisible(false);
                }}
                style={{
                  width: '40%',
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
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
              Data Success fully Submited
            </Text>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={{
                width: 200,
                height: 50,

                backgroundColor: '#32AD29',
                borderRadius: 25,
                elevation: 32,
                shadowColor: '#32AD29',
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
      <Modal
        animationType="fade"
        visible={visible2}
        transparent={true}
        onRequestClose={() => {
          setVisible2(false);
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
                color: 'gray',
                fontWeight: '500',
                color: '#4B5563',
                textAlign: 'center',
              }}>
              No changes made
            </Text>
            <TouchableOpacity
              onPress={() => setVisible2(false)}
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
                  color: 'gray',

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
      <Modal
        animationType="fade"
        visible={cameraflag}
        transparent={true}
        onRequestClose={() => {
          // setVisible2(false);
          setCameraflag(false);
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
              flexDirection: 'row',
              borderRadius: 20,
              paddingHorizontal: 30,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                openCamera();
              }}>
              <CameraIcon width={50} height={50} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                openGallary();
              }}>
              <GalleryIcon width={50} height={50} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    top: -140,

    alignItems: 'center',
    marginBottom: 20,
  },
  inputContainer1: {
    top: -140,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    width: 120,
    marginRight: 10,
    color: 'gray',

    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    height: 40,
    color: 'gray',

    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  finput: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#FF762A',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});

export default App;
