export const APP_CONSTANTS = {
  BCRYPT_SALT_ROUNDS: 10,
  INITIAL_USER_BALANCE: 1000,
  TOKEN_EXPIRATION: '1h',
  DEFAULT_PORT: 3000,
} as const;

export const ERROR_MESSAGES = {
  USERNAME_EXISTS: 'Username already exists',
  INVALID_CREDENTIALS: 'Invalid credentials',
  USER_NOT_FOUND: 'User not found',
  SENDER_NOT_FOUND: 'Sender user not found',
  RECEIVER_NOT_FOUND: 'Receiver user not found',
  INSUFFICIENT_BALANCE: 'Insufficient balance',
  INVALID_AMOUNT: 'Amount must be greater than zero',
  SELF_TRANSFER: 'Cannot transfer to yourself',
} as const;

export const INJECTION_TOKENS = {
  USER_REPOSITORY: Symbol('USER_REPOSITORY'),
  TRANSACTION_REPOSITORY: Symbol('TRANSACTION_REPOSITORY'),
} as const;
