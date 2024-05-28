import dotenv from 'dotenv';

dotenv.config();
const NODE_ENV= (process.env.NODE_ENV || 'development') as 'development' | 'production';

const config = {
  PORT: process.env.PORT || '8080',
  NODE_ENV
}

if(Object.values(config).some((v)=>!v))
  throw new Error('환경변수 설정이 잘못되었습니다.');

export default config;
