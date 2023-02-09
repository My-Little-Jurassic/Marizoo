/**
 * 회원가입 요청 폼
 */
export interface IRegistBody {
  uid: string;
  pwd: string;
  nickname: string;
  phoneNumber: string;
  email: string;
}

/**
 * 아이디 중복 확인 파라미터
 */
export interface ICheckUidParams {
  uid: string;
}

/**
 * 닉네임 중복 확인 파라미터
 */
export interface ICheckNicknameParams {
  nickname: string;
}

/**
 * 로그인 폼
 */
export interface ILoginBody {
  uid: string;
  pwd: string;
}

/**
 * 아이디 찾기 파라미터
 */
export interface IFindUidParams {
  email: string;
}

/**
 * 비밀번호 찾기 파라미터
 */
export interface IFindPwdParams {
  uid: string;
  email: string;
}

/**
 * 유저정보 요청 폼
 */
export interface IGetUserBody {
  pwd: string;
}

/**
 * 유저정보 수정 폼
 */
export interface IModifyUserBody {
  nickname: string;
  phoneNumber: string;
  email: string;
}

/**
 * 비밀번호 변경 폼
 */
export interface IModifyUserPwdBody {
  pastPwd: string;
  changedPwd: string;
}
