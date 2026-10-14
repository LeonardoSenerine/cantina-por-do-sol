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

// Nas refeições, crianças de 6 a 9 anos pagam metade.
export const KIDS = 'Crianças de 6 a 9 anos pagam metade'

// Experiências com reserva (o painel de reserva e o servidor usam estas regras).
// weekdays: 0 = domingo ... 6 = sábado. prices: valor por pessoa em cada dia.
export const CAFE = {
  id: 'cafe',
  name: 'Café colonial',
  days: 'Aos domingos',
  hours: '8h às 10h30 e 15h às 18h',
  weekdays: [0],
  slots: ['08:00', '08:30', '09:00', '09:30', '15:00', '15:30', '16:00', '16:30', '17:00'],
  slot: '09:00',
  prices: [{ label: 'Domingo', on: 'no domingo', weekdays: [0], price: 'R$ 59,90' }],
}

export const ALMOCO = {
  id: 'almoco',
  name: 'Almoço',
  days: 'Aos domingos',
  hours: '11h às 14h30',
  weekdays: [0],
  slots: ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30'],
  slot: '12:00',
  prices: [{ label: 'Domingo', on: 'no domingo', weekdays: [0], price: 'R$ 69,90' }],
}

export const PIZZA = {
  id: 'pizza',
  name: 'Rodízio de pizzas',
  days: 'De quinta a sábado',
  hours: '18h30 à meia-noite',
  weekdays: [4, 5, 6],
  slots: ['18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'],
  slot: '19:30',
  prices: [
    { label: 'Quinta e sexta', on: 'na quinta e na sexta', weekdays: [4, 5], price: 'R$ 90,00' },
    { label: 'Sábado', on: 'no sábado', weekdays: [6], price: 'R$ 100,00' },
  ],
}

export const EXPERIENCES = [CAFE, ALMOCO, PIZZA]

// valor da experiência num dia da semana (ou undefined se ela não acontece nesse dia)
export const priceOn = (exp, weekday) => exp.prices.find((p) => p.weekdays.includes(weekday))

// O domingo, na ordem do dia
export const SUNDAY = [
  {
    exp: CAFE,
    name: 'Café colonial da manhã',
    from: '8h',
    to: '10h30',
    text: 'A mesa posta logo cedo, com pão caseiro ainda morno, cucas, geleias da casa e café fresquinho para começar o domingo devagar.',
  },
  {
    exp: ALMOCO,
    name: 'Almoço',
    from: '11h',
    to: '14h30',
    text: 'Comida quente feita na cozinha da casa, com tempero de família e a calma de quem almoça olhando para o vale.',
  },
  {
    exp: CAFE,
    name: 'Café colonial da tarde',
    from: '15h',
    to: '18h',
    text: 'A mesa se enche de novo para a tarde: bolos, cucas, empadas e frios, até o sol começar a baixar no horizonte.',
  },
]

// o que vai à mesa do café colonial
export const MESA = ['Cucas', 'Pão caseiro', 'Empadas', 'Geleias', 'Bolos', 'Frios e salames', 'Bruschettas', 'Frutas']

export const VISITA = {
  name: 'Visitação',
  price: 'R$ 20,00',
  text: 'Quer só conhecer a casa, caminhar pelo jardim e ver o vale do alto? A visitação é por pessoa e pode ser combinada pelo WhatsApp.',
}

// resumo de horários usado no topo, no menu e no rodapé
export const HOURS = [
  { label: PIZZA.name, when: `${PIZZA.days}, ${PIZZA.hours}` },
  { label: 'Café colonial e almoço', when: 'Domingos, 8h às 18h' },
]

export const FAQ = [
  {
    q: 'Preciso reservar?',
    a: 'Recomendamos. A reserva é feita pelo WhatsApp: escolha a experiência, o dia e quantas pessoas vêm, e a gente confirma por lá.',
  },
  {
    q: 'Quanto custa?',
    a: `Aos domingos, o café colonial custa ${CAFE.prices[0].price} e o almoço ${ALMOCO.prices[0].price} por pessoa. O rodízio de pizzas custa ${PIZZA.prices[0].price} na quinta e na sexta e ${PIZZA.prices[1].price} no sábado. ${KIDS}. A visitação custa ${VISITA.price} por pessoa.`,
  },
  {
    q: 'Quais são os horários?',
    a: 'Rodízio de pizzas de quinta a sábado, das 18h30 à meia-noite. Aos domingos: café colonial das 8h às 10h30, almoço das 11h às 14h30 e café colonial de novo das 15h às 18h.',
  },
  {
    q: 'O que é servido no café colonial?',
    a: 'Uma experiência completa e farta, com pães, cucas, empadas, bolos, geleias, frutas e frios. Cerca de 95% dos nossos produtos são de fabricação própria.',
  },
  {
    q: 'Posso ir só para conhecer?',
    a: `Pode. A visitação custa ${VISITA.price} por pessoa. Mande uma mensagem pelo WhatsApp para combinar o melhor horário.`,
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
