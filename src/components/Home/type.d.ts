interface ISpecies {
  id: number;
  classification: string;
  classificationImg: string;
}

interface IBroadcast {
  id: number;
  sessionId: string;
  title: string;
  thumbnail: string;
  classificationImgs: string[];
}
