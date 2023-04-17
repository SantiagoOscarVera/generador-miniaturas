interface Place {
  title: string;
  description: string;
  imageUrl: string;
  time: number;
}

const places: Place[] = [
  {
    title: 'Productividad y engagement a un solo click',
    description:
      "No necesitas más herramientas pesadas para tu computadora ni pagar software costoso, ahorrate todo eso usando esta web y mejorá en un 55% tu productividad, además ¡las imagenes creadas aquí generan un mejor SEO lo que te da más engagement y likes!",
    imageUrl: process.env.PUBLIC_URL + '/assets/yt7.jpg',
    time: 1500,
  },
  {
    title: '¡Imágenes miniaturas para tu canal de Youtube!',
    description:
      'Aumentá la calidad visual para tu audiencia generando imagenes en miniatura para tus videos y shorts.',
    imageUrl: process.env.PUBLIC_URL + '/assets/yt5.jpg',
    time: 1500,
  },
];

export default places;

