# Salvador Urban Tourism App

Um aplicativo web de turismo urbano para Salvador com roteiros personalizados de acordo com tempo disponível, bairro e estilo de viagem.

## Características

- **Interface simples e intuitiva**: Sem necessidade de login ou cadastro
- **Roteiros personalizados**: Baseados em tempo disponível, região e estilo de viagem
- **Dados hardcoded**: MVP funciona totalmente no front-end, sem banco de dados
- **Mapas integrados**: Visualização das regiões com Google Maps
- **Sugestões gastronômicas**: Recomendações de onde comer de acordo com o horário
- **Bate e volta**: Lista de destinos próximos a Salvador para passeios de um dia

## Funcionalidades

### Telas

1. **Home**: Tela inicial com explicação do app e botões para criar roteiro ou ver bate e volta
2. **Questionário**: Formulário simples com 3 perguntas:
   - Quantas horas você tem?
   - Qual região vai visitar?
   - Qual vibe da viagem?
3. **Resultado do Roteiro**: Exibe o roteiro personalizado com:
   - Lista de lugares em sequência
   - Tempo recomendado para cada lugar
   - Descrição curta
   - Links para Google Maps
   - Mapa interativo da região
   - Sugestão de onde comer
4. **Bate e Volta**: Lista de destinos próximos com informações de como chegar

### Regiões Disponíveis

- Pelourinho
- Carmo
- Rio Vermelho
- Farol da Barra
- Cidade Baixa

### Estilos de Viagem

- Cultural
- Gastronomia
- Fotos / Instagram
- Caminhada leve

## Tecnologias

- **React** com TypeScript
- **Vite** como build tool
- **React Router** para navegação
- **CSS** puro para estilização
- **Google Maps** para visualização de mapas

## Como Executar

### Desenvolvimento

```bash
npm install
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`

### Preview da Build

```bash
npm run preview
```

## Estrutura do Projeto

```
src/
├── data/
│   ├── routes.ts          # Dados dos roteiros
│   └── dayTrips.ts        # Dados dos bate e volta
├── pages/
│   ├── Home.tsx           # Tela inicial
│   ├── Questionnaire.tsx  # Formulário de perguntas
│   ├── RouteResult.tsx    # Resultado do roteiro
│   └── DayTrips.tsx       # Bate e volta
├── types/
│   └── index.ts           # Tipos TypeScript
├── App.tsx                # Componente principal com rotas
├── main.tsx               # Ponto de entrada
└── index.css              # Estilos globais
```

## Estilo Visual

- **Cores principais**:
  - Primária: #1A1A1A (preto)
  - Secundária: #F2B705 (amarelo/dourado)
  - Background: #FFFFFF (branco)
- **Fonte**: Inter

## Licença

MIT
