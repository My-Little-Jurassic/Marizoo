interface ISpecies {
  id: number;
  classification: string;
  classificationImg: string;
  classificationIcon: string;
}

interface IBroadcast {
  id: number;
  sessionId: string;
  title: string;
  thumbnail: string;
  classificationImgs: string[];
}
