import React, {useState} from 'react';
import {Button, Image, View} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';

const ImageSelect: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchImageLibrary(options, handleResponse);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchCamera(options, handleResponse);
  };

  function handleResponse(response: ImagePickerResponse) {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri =
        response.uri || (response.assets && response.assets[0].uri);
      // console.log('image selected :', response.assets[0].type);

      setSelectedImage(imageUri);
      console.log('started uploading');
      uploadImage(response);
    }
  }

  async function uploadImage(image: ImagePickerResponse) {
    console.log('uploading image');

    const obj: {
      uri?: string;
      name?: string;
      type?: string;
    } = {
      uri: image.assets[0].uri,
      name: 'temp.jpg',
      type: image.assets[0].type,
    };
    console.log('unable to come here');
    console.log('Objects :', obj);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'multipart/form-data');
    const formdata = new FormData();
    formdata.append('image', obj);
    try {
      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };
      const response = await fetch(
        'http://192.168.1.6:4003/imageupload',
        requestOptions,
      );
      console.log('end');
      const result = await response.json();
      console.log(result);
    } catch (error) {
      // console.error(error);
    }
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
      {selectedImage && (
        <Image
          source={{uri: selectedImage}}
          style={{flex: 1, borderRadius: 20}}
          resizeMode="contain"
        />
      )}
      <View style={{marginTop: 20}}>
        <Button title="Choose from Device" onPress={openImagePicker} />
      </View>
      <View style={{marginTop: 20, marginBottom: 50}}>
        <Button title="Open Camera" onPress={handleCameraLaunch} />
      </View>
    </View>
  );
};

export default ImageSelect;
