import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native';
import {StatusBar} from 'expo-status-bar';

import {Camera} from 'expo-camera';
import Feather from '@expo/vector-icons/build/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

let camera: Camera;

interface IAppProps {
  setIsOpen(value: boolean): any;
}

export default function App({setIsOpen}: IAppProps) {
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState<any>(null);
  const [cameraType, setCameraType] = React.useState<'back' | 'front'>(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = React.useState<'off' | 'on' | 'auto'>('on');

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    console.log(status);

    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert('Acesso negado!');
    }
  }

  const __takePicture = async () => {
    const photo: any = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    //setStartCamera(false);
    setCapturedImage(photo);
  }

  const __savePhoto = (e: any) => {
    console.log(e);
  }

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  }

  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off');
    } else if (flashMode === 'off') {
      setFlashMode('on');
    } else {
      setFlashMode('auto');
    }
  }

  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front');
    } else {
      setCameraType('back');
    }
  }

  return (
    <View style={styles.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} setIsOpen={setIsOpen} />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{flex: 1}}
              ref={(r: Camera) => {camera = r}}>
              <View style={{flex: 1,width: '100%',backgroundColor: 'transparent',flexDirection: 'row'}}>
                <View style={{position: 'absolute', left: '4%', top: '4%', flexDirection: 'column', justifyContent: 'space-between'}}>
                  {/* @ts-ignore */}
                  <TouchableOpacity onPress={__handleFlashMode} style={{backgroundColor: '#00000030', padding: 8, borderRadius: '50%'}}>
                    {flashMode === 'off' ? 
                      <Feather size={25} color="#fff" name="zap-off" /> 
                    :
                      <Feather size={25} color="#fff" name="zap" /> 
                    }
                  </TouchableOpacity>
              {/* <TouchableOpacity
                    onPress={__switchCamera}
                    style={{marginTop: 20, borderRadius: '50%', height: 25, width: 25}}>
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      {cameraType === 'front' ? '🤳' : '📷'}
                    </Text>
                  </TouchableOpacity> */}
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 66,
                        height: 66,
                        bottom: -60,
                        borderRadius: 50,
                        backgroundColor: '#0000002b',
                      }}
                    />
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 60,
                        height: 60,
                        bottom: 3,
                        borderRadius: 50,
                        backgroundColor: '#ff0000'
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 200,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Escanear Certificado
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const CameraPreview = ({photo, retakePicture, savePhoto, setIsOpen}: any) => {
  console.log('photo: ', photo);

  const storeImageData = async (photo: string) => {
    try {
      await AsyncStorage.setItem('@summaLastCertificate', photo);
      console.log('Last uri certificate save in storage!');
      setIsOpen(false);
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  return (
    <View
      style={{backgroundColor: 'transparent', flex: 1, width: '100%', height: '100%'}}>
      <ImageBackground source={{uri: photo && photo.uri}} style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'column', padding: 0, justifyContent: 'flex-end'}}>
          <View
            style={{flexDirection: 'row',justifyContent: 'space-between',backgroundColor: '#00000050',paddingBottom: 20,paddingTop: 20}}>
            <TouchableOpacity onPress={retakePicture} style={{width: '50%', height: 40, alignItems: 'center'}}>
              <Text style={{ color: '#fff', fontSize: 20 }}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {console.log('photo>>>> ', photo.uri); storeImageData(photo.uri) }} style={{ width: '50%', height: 40, alignItems: 'center'}}>
              <Text style={{ color: '#fff', fontSize: 20 }}>
                Usar foto
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}