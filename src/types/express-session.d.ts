import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      [key: string]: any
    };
    // 필요에 따라 추가적인 세션 데이터 속성을 정의할 수 있습니다
  }
}
