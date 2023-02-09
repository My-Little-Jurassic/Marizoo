// /**
//  * 요청 기본 결과 폼
//  */
// export interface IResponse {
//   code: number;
//   message?: string;
//   data?: any;
// }

/**
 * 가게 검색요청
 */
export interface ISearchStores {
  storename?: string | null;
  classification?: string | null;
}
