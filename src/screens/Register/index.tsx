import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Modal, Text, ActionSheetIOS, View, Image, Alert } from 'react-native';

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
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import convertBlobToBase64 from '../../utils/base64toImage';

const Register: React.FC = () => {
  const { user } = useAuth();
  // This hook returns `true` if the screen is focused, `false` otherwise
  const isFocused = useIsFocused();

  const [descricao, setDescricao] = useState('');
  
  const [empresa, setEmpresa] = useState('');
  const [cnpjValue, setCnpjValue] = useState('');

  const [cargaHoraria, setCargaHoraria] = useState('');
  
  const [cnpjIsFull, setCnpjIsFull] = useState(false);
  const [cnpjIsValid, setCnpjIsValid] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [attached, setAttached] = useState(false);
  const [attachedName, setAttachedName] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [currentCertificateObj, setCurrentCertificateObj] = React.useState<any>();
  const [currentPhoto, setCurrentPhoto] = useState<IPhotoCameraProps>({} as IPhotoCameraProps);

  const [lastCertificateImg, setLastCertificateImg] = useState<any>();

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
      setCurrentCertificateObj(result);
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

  const handleCleanForm = useCallback(() => {
    //limpa a img do storage
    const removeImageDataFromStorage = async () => {
      console.log('entrou aqui!');
      try {
        await AsyncStorage.removeItem('@summaLastCertificate')
        console.log('img storage removed!');

        // seta o valor do stado da ultima img para null/empty
        setLastCertificateImg('');
        setDescricao('');
        setAttached(false);
        setAttachedName('');
      } catch(e) {
        // error reading value
        console.log(e);
      }
    }
    //chama a funcao acima
    removeImageDataFromStorage();

  }, []);

  useEffect(() => {
    if(cnpjIsFull) {
      async function loadData() {
        try {
          const response = await axios.get(`https://minhareceita.org/${cnpjValue}`)
          console.log(response.data);
          setCnpjIsValid(true);
          setEmpresa(response.data.nome_fantasia);
        } catch (error) {
          console.log(error);
          Alert.alert('CNPJ inválido! 😢');
          setCnpjIsFull(false);
          setCnpjValue('');
          setCnpjIsValid(false);
        }
      }

      loadData();
    }
  }, [cnpjIsFull]);

  const getImageData = useCallback(async() => {
    try {
      const value = await AsyncStorage.getItem('@summaLastCertificate');
      if(value !== null) {
        // value previously stored
        setLastCertificateImg(JSON.parse(value));
        console.log('img:::::', value)
      } else {
        console.log('n entrou');
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getImageData();
  }, [getImageData]);

  useEffect(() => {
    if (isFocused) {
      alert('entrou na tela de cadastro');
      
    } else {
      alert('saiu: limpar todos os dados do form');
      handleCleanForm();
    }
  }, [isFocused, handleCleanForm]);

  
  const handleSubmitForm = useCallback(async() => {
    const ext = currentCertificateObj.uri.split('.')[1];
    const final = {...currentCertificateObj, name: 'file.' + ext} 
    console.log(final);
    console.log('submit form:');
    console.log(final)

    const formdata = new FormData();
    formdata.append("descricao", descricao);
    formdata.append("empresa", empresa);
    formdata.append("cnpj", cnpjValue);
    formdata.append("carga_horaria_informada", cargaHoraria);
    formdata.append("carga_horaria_integralizada", '');
    formdata.append("justificativa", '');
    formdata.append("certificado", final);
    formdata.append("status", 'em_validação');
    formdata.append("is_active", 'true');
    formdata.append("usuario", String(user.id));
    formdata.append("curso", String(user.curso));
    formdata.append("categoria", String(category.value));

    try {
      const response = await api.post('/api/v1/atividades-complementares/', formdata, {
        headers: {
          "Content-Type": "multipart/form-data;",
        }
      });

      console.log(response.data);
    } catch (error: any) {
      console.log('erro ao submeter atividade!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log(error.response);
    }
  }, [user, empresa, descricao, cnpjValue, cargaHoraria, currentCertificateObj, category.value]);
    
  return (
    <Container>
      <Header colors={['#6e61c6', '#a98ef3']} start={{ x: 0, y: 0}} end={{x: 1, y: 1}}>
        <Title>Cadastrar atividade complementar</Title>
      </Header>
      <KeyboardAwareScrollView extraHeight={150}>
        <Form>
          <Fields>
            <FormControl>
              <Input placeholder="Descrição" onChangeText={(text) => setDescricao(text)} />
            </FormControl>
            <FormControl>
              <InputSelect title={category.display} onPress={handleOpenSelectCategoryModal} />
            </FormControl>
            <FormControl>
              <InputCnpjMask 
                placeholder="CNPJ da empresa" 
                value={cnpjValue}
                setCnpjValue={setCnpjValue} 
                setCnpjIsFull={setCnpjIsFull}
                keyboardType="number-pad"
                maxLength={18} //cnpj length with points
                maskCnpj 
                editable={(cnpjIsFull && cnpjIsValid && cnpjValue.length ===18) ? false : true}
                disabled={(cnpjIsFull && cnpjIsValid && cnpjValue.length ===18) ? true : false}
              />
              {cnpjIsValid && cnpjIsFull && <Feather size={24} color="#36b877" name="check" style={{ position: 'absolute', zIndex: 99999, right: 16 }} />}
            </FormControl>
            <FormControl>
              <Input placeholder="Empresa/Instituição" value={empresa} editable={false} disabled />
            </FormControl>
            <FormControl>
              <Input placeholder="Carga horária (horas)" onChangeText={(text) => setCargaHoraria(text)} keyboardType="number-pad" />
            </FormControl>
            <FormControl>
              <InputDropZone onPress={handleOpenMenu} icon={attached ? 'file' : 'camera'} title={attached ? truncateStrings(attachedName, 60) : ''}>
                {currentCertificateObj && currentCertificateObj.uri.split('.')[1] !== 'pdf' && (
                  <ImageCertificate source={{ uri: currentCertificateObj.uri }} />)
                }
              </InputDropZone>
            </FormControl>
          </Fields>

          <FormControl>
            <Button title="Enviar atividade para análise!" background="primary" onPress={handleSubmitForm} />
          </FormControl>
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
        <Camera setIsOpen={setIsOpen} setCurrentCertificateObj={setCurrentCertificateObj} />
      </Modal>}
    </Container>
  );
}

export default Register;