/**
 * 파충류카페 데이터
 */
export interface ICafe {
  id: number;
  store_name: string;
  address: string;
  tel: string;
  profile_img: string;
  lat: number;
  lng: number;
}

/**
 * 종 목록 데이터
 */
export interface ISpecies {
  classification: string;
  classificationImg: string;
  id: number;
}
