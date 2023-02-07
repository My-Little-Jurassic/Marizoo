/**
 * 요청 기본 결과 폼
 */
export interface IResponse {
  code: number;
  message?: string;
  data?: any;
}

/**
 * 요청 기본 결과 폼
 */
export interface ISearchStores {
  storename?: string;
  classification?: string;
}
