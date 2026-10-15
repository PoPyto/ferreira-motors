# Luxury Motors

Protótipo inicial de uma página para uma loja de carros de luxo. O layout usa uma faixa superior e uma faixa lateral conectadas por um degradê preto e dourado, com pontos de luz dourados na área central.

## Visualizar

Abra `index.html` em um navegador. O protótipo não precisa de instalação nem servidor.

O conteúdo está intencionalmente vazio para definirmos juntos os carros, a identidade visual, a tipografia e os ícones nas próximas etapas.

## Promoções

Coloque as imagens dos veículos em promoção na pasta `promocoes/`. Cadastre cada anúncio no array `promotionCars` em `promotions.js`, informando `name`, `make`, `model`, `year`, `mileage`, `originalPrice` (valor atual antes do desconto), `price` (valor promocional), uma lista `images` (uma foto por ângulo, cada uma com `src` e `alt`) e, opcionalmente, `href` para o botão “Ver veículo”. Exemplo:

```js
const promotionCars = [
  {
    name: 'Nome do veículo',
    make: 'Marca',
    model: 'Modelo',
    year: '2020/2021',
    mileage: '65.000 KM',
    originalPrice: 'R$ 199.900,00',
    price: 'R$ 183.900,00',
    images: [
      { src: './promocoes/carro-frente.jpg', alt: 'Vista frontal do veículo' },
      { src: './promocoes/carro-lateral.jpg', alt: 'Vista lateral do veículo' },
    ],
    href: './detalhes-veiculo.html',
  },
];
```

As setas circulares laterais trocam de veículo quando houver mais de um cadastrado. As setas sobre a foto trocam os ângulos quando o veículo tiver mais de uma imagem. Os indicadores selecionam diretamente cada veículo. O botão “Ver veículo” só é ativado quando `href` estiver preenchido.

## Busca de veículos

A busca no início da página consulta o catálogo `availableCars` em `vehicle-search.js`, separado dos anúncios de promoções. Cadastre cada veículo com `make` (marca) e `model` (modelo). Ao digitar, os resultados mostram a marca e o modelo em colunas e aceitam diferenças entre maiúsculas, minúsculas e acentos.

## Quem somos

A seção “Quem somos” usa as fotos armazenadas em `quem-somos/` como fundo sob o texto, com uma sobreposição escura para manter a leitura. A fachada (`fachada.png`) aparece primeiro; as demais fotos são exibidas automaticamente a cada quatro segundos. Os botões sobre a foto permitem navegar manualmente e aparecem ao passar o mouse ou focar a seção.