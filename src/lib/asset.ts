// Le jeu vit sous /journey dans le portfolio : les images de public/ doivent porter ce préfixe
export const BASE_PATH = '/journey';

export const asset = (path: string) => `${BASE_PATH}${path}`;
