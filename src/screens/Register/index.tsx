import React, { useState, useCallback } from 'react';

import { Modal, Text } from 'react-native';

import Button from '../../Componets/Forms/Button';
import Input from '../../Componets/Forms/Input';
import InputCnpjMask from '../../Componets/Forms/InputCnpjMask';
import InputSelect from '../../Componets/Forms/InputSelect';
import { CategorySelect } from '../CategorySelect';

import { Container, Header, Title, Form, Fields } from './styles';

const Register: React.FC = () => {

  const [cnpjValue, setCnpjValue] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

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