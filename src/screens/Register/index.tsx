import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Modal, Text, ActionSheetIOS, View, Image } from 'react-native';

import Feather from '@expo/vector-icons/build/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Button from '../../Componets/Forms/Button';
import Input from '../../Componets/Forms/Input';
import InputCnpjMask from '../../Componets/Forms/InputCnpjMask';
import InputSelect from '../../Componets/Forms/InputSelect';
import InputDropZone from '../../Componets/InputDropZone';
import { CategorySelect } from '../CategorySelect';
import Camera from '../../Componets/Camera';

import truncateStrings from '../../utils/truncateStrings';

export interface IPhotoCameraProps {
  height: number;
  uri: string;
  width: number;
}

import { Container, Header, Title, Form, FormControl, Fields, TitleHeader, CloseModalButton, ImageCertificate } from './styles';

const Register: React.FC = () => {

  const [cnpjValue, setCnpjValue] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [attached, setAttached] = useState(false);
  const [attachedName, setAttachedName] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<IPhotoCameraProps>({} as IPhotoCameraProps);

  const [lastCertificateImg, setLastCertificateImg] = useState('');

  const [category, setCategory] = useState({
    value: Number,
    display: 'Categoria'
  });

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  const scannerRef = useRef();

  const handleImportImage = useCallback(async() => {
    setIsOpen(true);
  }, []);

  const handleImportPdf = useCallback(async () => {
    let result = await DocumentPicker.getDocumentAsync();

    if(result.type === 'success') {
      console.log(result);
      setAttached(true);
      setAttachedName(result.name);
    } else {
      console.log(result);
      console.log('Não foi possível anexar o pdf');
    }

  }, []);

  const handleOpenMenu = () => ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ['Tirar foto', 'Anexar pdf', 'Cancelar'],
      destructiveButtonIndex: 2,
      cancelButtonIndex: 3,
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        // Abrir camera (tirar foto)
        handleImportImage();
      } else if (buttonIndex === 1) {
        // Anexar pdf
        handleImportPdf();
      } else if (buttonIndex === 2) {
        // cancel action
      }
    }
  );

  const getImageData = async () => {
    console.log('entrou');
    try {
      const value = await AsyncStorage.getItem('@summaLastCertificate')
      if(value !== null) {
        // value previously stored
        setLastCertificateImg(value);
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }

  useEffect(() => {
    getImageData();
  }, [getImageData]);
    
  return (
    <Container>
      <Header colors={['#6e61c6', '#a98ef3']} start={{ x: 0, y: 0}} end={{x: 1, y: 1}}>
        <Title>Cadastrar atividade complementar</Title>
      </Header>
      <KeyboardAwareScrollView extraHeight={150}>
        <Form>
          <Fields>
            <FormControl>
              <Input placeholder="Descrição" />
            </FormControl>
            <FormControl>
              <InputSelect title={category.display} onPress={handleOpenSelectCategoryModal} />
            </FormControl>
            <FormControl>
              <InputCnpjMask placeholder="CNPJ da empresa" keyboardType="number-pad" setCnpjValue={setCnpjValue} maskCnpj />
            </FormControl>
            <FormControl>
              <Input placeholder="Empresa/Instituição" editable={false} disabled />
            </FormControl>
            <FormControl>
              <Input placeholder="Carga horária (horas)" keyboardType="number-pad" />
            </FormControl>
            <FormControl>
              <Text>uri :::::: {currentPhoto.uri}</Text>
              <InputDropZone onPress={handleOpenMenu} icon={attached ? 'file' : 'camera'} title={attached ? truncateStrings(attachedName, 60) : ''}>
                {lastCertificateImg && <ImageCertificate source={{ uri: lastCertificateImg }} />}
              </InputDropZone>
            </FormControl>
          </Fields>

          <Button title="Enviar certificado para análise!" background="primary" />
        </Form>
      </KeyboardAwareScrollView>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          //@ts-ignore
          category={category}
          //@ts-ignore
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>

      {isOpen && <Modal visible={isOpen}>
        <Header colors={['#6e61c6', '#a98ef3']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <TitleHeader>Anexar certificado</TitleHeader>
        </Header>
        <CloseModalButton onPress={() => {setIsOpen(false)}}><Feather size={22} color="#fff" name="x" /></CloseModalButton>
        <Camera setIsOpen={setIsOpen} />
      </Modal>}
    </Container>
  );
}

export default Register;