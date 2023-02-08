/**
 * 종 정보
 */
export interface ISpecies {
  id: number;
  classification: string;
  classificationImg: string;
}
/**
 * 동물 정보
 */
export interface IAinmal {
  id: number;
  name: string;
  gender: string;
  img: string;
}
/**
 * 종 세부 정보
 */
export interface ISpeciesDetail {
  speciesInfo: {
    habitat: string;
    classification: string;
    lifeSpan: number;
    info: string;
  };
  feeds: {
    name: string;
    img: string;
  }[];
}
