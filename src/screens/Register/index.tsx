import React, { useState, useRef, useCallback } from 'react';

import * as DocumentPicker from 'expo-document-picker';

import { Modal, Text, ActionSheetIOS, View } from 'react-native';

import Button from '../../Componets/Forms/Button';
import Input from '../../Componets/Forms/Input';
import InputCnpjMask from '../../Componets/Forms/InputCnpjMask';
import InputSelect from '../../Componets/Forms/InputSelect';
import InputDropZone from '../../Componets/InputDropZone';
import { CategorySelect } from '../CategorySelect';

import { Container, Header, Title, Form, Fields } from './styles';
import truncateStrings from '../../utils/truncateStrings';

const Register: React.FC = () => {

  const [cnpjValue, setCnpjValue] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [attached, setAttached] = useState(false);
  const [attachedName, setAttachedName] = useState('');

  const [category, setCategory] = useState({
    value: Number,
    label: 'Categoria'
  });

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  const scannerRef = useRef();

  const handleImportImage = useCallback(async() => {
    alert('a');
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

  const handleOpenMenu = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Tirar foto', 'Anexar pdf', 'Cancelar'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 3,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // Anexar img
          handleImportImage();
        } else if (buttonIndex === 1) {
          // Anexar pdf
          handleImportPdf();
        } else if (buttonIndex === 2) {
          // cancel action
        }
      }
    );
    
  return (
    <Container>
      <Header colors={['#6e61c6', '#a98ef3']} start={{ x: 0, y: 0}} end={{x: 1, y: 1}}>
        <Title>Cadastrar atividade complementar</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Descrição" />
          <InputSelect title={category.label} onPress={handleOpenSelectCategoryModal} />
          <InputCnpjMask placeholder="CNPJ da empresa" keyboardType="number-pad" setCnpjValue={setCnpjValue} maskCnpj />
          <Input placeholder="Empresa/Instituição" editable={false} disabled />
          <Input placeholder="Carga horária (horas)" keyboardType="number-pad" />
          <InputDropZone onPress={handleOpenMenu} icon={attached ? 'file' : 'camera'} title={attached ? truncateStrings(attachedName, 60) : ''} />
        </Fields>

        <Button title="Enviar certificado para análise!" background="primary" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          //@ts-ignore
          category={category}
          //@ts-ignore
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}

export default Register;