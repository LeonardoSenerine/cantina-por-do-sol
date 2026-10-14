// Conteúdo do site num lugar só. Para mudar horário, preço ou telefone, edite aqui.

export const WHATSAPP = '5549988637476'
export const PHONE_LABEL = '(49) 98863-7476'

export const ADDRESS = {
  line: 'Linha Santin, interior',
  city: 'Lajeado Grande – SC',
  cep: '89828-000',
  lat: -26.843514,
  lng: -52.5701725,
  placeId: 'ChIJVZyqfinR5JQR6HClEceIFrg',
  maps: 'https://www.google.com/maps/search/?api=1&query=Cantina+por+do+sol&query_place_id=ChIJVZyqfinR5JQR6HClEceIFrg',
  route: 'https://www.google.com/maps/dir/?api=1&destination=-26.843514,-52.5701725&destination_place_id=ChIJVZyqfinR5JQR6HClEceIFrg',
  embed: 'https://maps.google.com/maps?q=Cantina%20por%20do%20sol%2C%20Linha%20Santin%2C%20Lajeado%20Grande%20-%20SC&ll=-26.843514,-52.5701725&z=13&output=embed',
}

// fotos têm duas versões: 1440px e 800px (sufixo -800)
export const srcSet = (src) => `${src.replace('.webp', '-800.webp')} 800w, ${src} 1440w`

export const SOCIAL = {
  instagram: 'https://www.instagram.com/cantina_pordosol/',
  instagramLabel: '@cantina_pordosol',
  facebook: 'https://www.facebook.com/cantinapordosol.gmail.com.br',
}

export const PRICE = {
  from: 'R$ 80',
  kids: 'Crianças de 6 a 9 anos pagam metade',
}

// weekdays: 0 = domingo ... 6 = sábado
export const EXPERIENCES = [
  {
    id: 'cafe',
    name: 'Café colonial',
    tag: 'Exclusivo aos domingos',
    days: 'Domingos',
    hours: '8h às 18h',
    weekdays: [0],
    slots: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
    text: 'Uma experiência completa e farta, resgatando a tradição e o acolhimento do interior com uma vista privilegiada.',
    notes: ['cuca', 'pão caseiro', 'empadas', 'geleias', 'frios da casa'],
    media: { type: 'image', src: './img/buffet-palmas.webp', alt: 'Mesa do café colonial com folhagens, palmas douradas, cucas, pães e empadas' },
  },
  {
    id: 'pizza',
    name: 'Rodízio de pizzas',
    tag: 'O clássico continua',
    days: 'Quinta a sábado',
    hours: '18h30 à meia-noite',
    weekdays: [4, 5, 6],
    slots: ['18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'],
    text: 'A combinação perfeita de massas artesanais bem preparadas e uma ampla variedade de sabores para encerrar o dia de forma memorável.',
    notes: ['massa de 24h', 'forno a lenha', 'à vontade'],
    media: { type: 'image', src: './img/salao-noite.webp', alt: 'Salão de madeira à noite, com mesas postas e lâmpadas acesas' },
  },
  {
    id: 'vista',
    name: 'O pôr do sol',
    tag: 'O que dá nome à casa',
    days: 'Todo fim de tarde',
    hours: 'chegue cedo',
    text: 'Do salão de cima, o horizonte se contempla em sua plenitude. Um cenário espetacular que inspira brindes, registros marcantes e momentos especiais em boa companhia.',
    notes: ['janela para o vale', 'hora dourada'],
    media: { type: 'video', src: './video/salao-de-cima.mp4', poster: './video/salao-de-cima.jpg', alt: 'O salão de cima, com mesas postas e janelas abertas para o vale' },
  },
]

export const FAQ = [
  {
    q: 'Preciso reservar?',
    a: 'Recomendamos. A reserva é feita pelo WhatsApp: escolha a experiência, o dia e quantas pessoas vêm, e a gente confirma por lá.',
  },
  {
    q: 'Quanto custa?',
    a: `A partir de ${PRICE.from} por pessoa. ${PRICE.kids}.`,
  },
  {
    q: 'Quais são os horários?',
    a: 'Rodízio de pizza de quinta a sábado, das 18h30 à meia-noite. Café colonial aos domingos, das 8h às 18h.',
  },
  {
    q: 'O que é servido no café colonial?',
    a: 'Uma experiência completa e farta, com pães, cucas, empadas, bolos, geleias, frutas e frios. Cerca de 95% dos nossos produtos são de fabricação própria.',
  },
  {
    q: 'Como é a pizza?',
    a: 'Massa artesanal maturada por 24 horas, ingredientes frescos e forno a lenha, com uma ampla variedade de sabores passando à vontade.',
  },
  {
    q: 'Onde fica?',
    a: `${ADDRESS.line}, ${ADDRESS.city}. O mapa logo acima abre a rota no Google Maps.`,
  },
]
