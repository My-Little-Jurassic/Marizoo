interface ISpecies {
  id: number;
  classification: string;
  classificationImg: string;
}

interface IBroadcast {
  id: number;
  title: string;
  thumbnail: string;
  classificationImgs: string[];
}
