// ID
/**
 * 아이디는 8글자 이상 16글자 이하
 */
export function validateIdLength(value: string): boolean {
  return value.length >= 8 && value.length <= 16;
}

/**
 * 영문 소문자와 숫자로만 이루어져야 함
 */
export function validateIdChar(value: string): boolean {
  const regExp = /^[a-z0-9] */g;
  return regExp.test(value);
}

// PW
/**
 * 8글자 이상
 */
export function validatePWLength(value: string): boolean {
  return value.length >= 8;
}

/**
 * 영문, 숫자, 특수문자 모두 포함
 */
export function validatePWChar(value: string): boolean {
  const regExp = /^(?=.*[a-zA-z])(?=.*\d)(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]) */;
  return regExp.test(value);
}
/**
 * 이메일 양식 체크
 */
export function validateEmail(value: string): boolean {
  const regExp =
    /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(value);
}

/**
 * 전화번호 양식 체크
 */
export function validatePhoneNumber(value: string): boolean {
  const regExp = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
  return regExp.test(value);
}
