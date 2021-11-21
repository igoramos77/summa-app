import React, { useState, useEffect, useCallback } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const Send: React.FC = () => {
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleImportImage = useCallback(async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }, []);

  const handleImportPdf = useCallback(async() => {
    let result = await DocumentPicker.getDocumentAsync();

    console.log(result);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Seleciona foto do certificado" onPress={handleImportImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      <Button title="Selecionar pdf" onPress={handleImportPdf} />
    </View>
  );
}

export default Send;