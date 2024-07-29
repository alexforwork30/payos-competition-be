import { config } from 'dotenv';
config();

export const {
  UI_BASE_URL,
  PAY_OS_CLIENT_ID,
  PAY_OS_API_KEY,
  PAY_OS_CHECK_SUM_KEY,
} = process.env;
