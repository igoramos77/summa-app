import React from 'react';
import { FlatList } from 'react-native';

import Button from '../../Componets/Forms/Button';

import {
  Container,
  Header,
  Title,
  Category,
  Name,
  Separator,
  Footer,
} from './styles';

interface Category {
  value: number | string;
  label: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({category, setCategory, closeSelectCategory} : Props ){

  function handleCategorySelect(category: Category){
    setCategory(category);
  }

  const categories: Category[] = [
    {
      value: 1,
      label: "Atividades Culturais e Esportivas na Universidade"
    },
    {
      value: 2,
      label: "Atividades em instituições de Ensino"
    },
    {
      value: 3,
      label: "Atividades Nacionais de Cidadania"
    },
    {
      value: 4,
      label: "Evento de Cidadania e Direitos Humanos"
    },
    {
      value: 5,
      label: "Prestação de Serviços à Comunidade"
    },
    {
      value: 6,
      label: "Presidente do DCE"
    },
    {
      value: 7,
      label: "Presidente do Centro Acadêmico"
    },
    {
      value: 8,
      label: "Ações Sócios Ambientais"
    },
    {
      value: 9,
      label: "Trote Solidário"
    },
    {
      value: 10,
      label: "Cursos livres"
    },
    {
      value: 11,
      label: "Disiplinas Extracurriculares"
    },
    {
      value: 12,
      label: "Enade Entrega da Prova"
    },
    {
      value: 13,
      label: "Enade Simulados Presenciais"
    },
    {
      value: 14,
      label: "Eventos Acadêmicos Científicos"
    },
    {
      value: 15,
      label: "Grupo de Estudos"
    },
    {
      value: 16,
      label: "Iniciação Científica"
    },
    {
      value: 17,
      label: "Intercâmbio"
    },
    {
      value: 18,
      label: "Monitoria"
    },
    {
      value: 19,
      label: "Nivelamentos"
    },
    {
      value: 20,
      label: "Núcleos de Práticas Acadêmicas"
    },
    {
      value: 21,
      label: "Oficinas Acadêmicas"
    },
    {
      value: 22,
      label: "Palestras Presenciais"
    },
    {
      value: 23,
      label: "Projeto Boas- Vindas"
    },
    {
      value: 24,
      label: "Projeto de Extensão Universitária"
    },
    {
      value: 25,
      label: "Semana Acadêmica, Jornada Severino Sombra e ENIC"
    },
    {
      value: 26,
      label: "Trabalho Extraclasse"
    },
    {
      value: 27,
      label: "Atividades de Empreendedorismo e Inovação"
    },
    {
      value: 28,
      label: "Atividades de Capacitação Profissional"
    },
    {
      value: 29,
      label: "Atividades Nacionais de Empreendedorismo e Inovação"
    },
    {
      value: 30,
      label: "Atividades Nacionais de Capacitação Profissional"
    },
    {
      value: 31,
      label: "Auxílio na Organização de Eventos"
    },
    {
      value: 32,
      label: "Desafio Inovação"
    },
    {
      value: 33,
      label: "Encontro com Egressos"
    },
    {
      value: 34,
      label: "Nto de empreendedorismo e inovação"
    },
    {
      value: 35,
      label: "Olimpíadas e concursos"
    },
    {
      value: 36,
      label: "Representante de Turma"
    },
    {
      value: 37,
      label: "Consu/ Consepe"
    },
    {
      value: 38,
      label: "Viagens de Excursões Acadêmicas"
    },
    {
      value: 39,
      label: "Visitas técnicas"
    },
    {
      value: 40,
      label: "Eventos Acadêmico-Científicos"
    },
    {
      value: 41,
      label: "Certificações na Área do Curso"
    },
    {
      value: 42,
      label: "Trabalho Publicado/Premiado"
    },
    {
      value: 43,
      label: "Trabalho Publicado/Premiado"
    },
    {
      value: 44,
      label: "Apresentação de Trabalho em Evento Acadêmico-Científico"
    },
    {
      value: 45,
      label: "Eventos Culturais Externos"
    },
    {
      value: 46,
      label: "Vivência Profissional na Área do Curso"
    },
    {
      value: 47,
      label: "Cursos Online e Presenciais"
    },
    {
      value: 48,
      label: "Trabalho Voluntário"
    },
    {
      value: 49,
      label: "Palestras Externas"
    },
    {
      value: 50,
      label: "Competições Universitárias Nacionais e Internacionais"
    },
    {
      value: 51,
      label: "Intercâmbio ou Visita Técnica Fora do Estado do Rio de"
    },
    {
      value: 52,
      label: "Eventos Étnicos Raciais"
    },
    {
      value: 53,
      label: "Projeto Rondon"
    }
  ];

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%'}}
        keyExtractor={(item: Category) => String(item.value)}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.value === item.value}
          >
            <Name>{item.label}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button
          background="primary"
          title="Selecionar Categoria"
          onPress={closeSelectCategory}
        />
      </Footer>
    </Container>
  )
}