import { registerEnumType } from '@nestjs/graphql';

export enum RestaurantCategory {
  BRASILEIRO = 'BRASILEIRO',
  BISTRO = 'BISTRÔ',
  BUFFET = 'BUFFET',
  CAFETERIA = 'CAFETERIA',
  CANTINA = 'CANTINA',
  CLASSICO = 'CLÁSSICO',
  COMFORT = 'COMFORT FOOD',
  AUTORAL = 'AUTORAL',
  FASTFOOD = 'FAST FOOD',
  GRILL = 'GRILL',
  JAPONESA = 'JAPONESA',
  HAMBURGUERIA = 'HAMBURGUERIA',
  PIZZARIA = 'PIZZARIA',
  JANTARFINO = 'JANTAR FINO',
  POPULAR = 'POPULAR',
  POPUP = 'POPUP',
  PUB = 'PUB',
  REDESDERESTAURANTE = 'REDES DE RESTAURANTE',
  MEXICANO = 'MEXICANO',
  ITALIANO = 'ITALIANO',
  CHINES = 'CHINÊS',
  ESPANHOL = 'ESPANHOL',
  PORTUGUES = 'PORTUGUÊS',
  INGLES = 'INGLÊS',
  ARGENTINO = 'ARGENTINO',
  FRUTOSDOMAR = 'FRUTOS DO MAR',
  STEAKHOUSE = 'STEAKHOUSE',
}

registerEnumType(RestaurantCategory, { name: 'RestaurantCategory' });