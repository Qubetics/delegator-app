/*eslint-disable*/
export const NODE_NAME = process.env.REACT_APP_SOCKET_HOST;
export const BASE_URL_EXPLORER_NEW = process.env.REACT_APP_BASE_URL_NOMINATOR;
export const BASE_URL_EXPLORER =
  process.env.REACT_APP_BASE_URL_EXPLORER_API_LINKS;
export const BASE_URL_EXPLORER_LINKS_TESTNET =
  process.env.REACT_APP_EXPLORER_NAVIGATION_LINK;
export const DECIMAL_VALUE = process.env.REACT_APP_DECIMAL_VALUE;
export const SWAGGER_URL=process.env.REACT_APP_SWAGGER_API;
export const PAGE_LIMIT = 10;

export const ERA_TIME = process.env.REACT_APP_ERA_TIME;
export const CREATE_WALLET = process.env.REACT_APP_CREATE_WALLET;
export const APP_NAME = process.env.REACT_APP_NAME;
export const CURRENCY = process.env.REACT_APP_CURRENCY;
export const MINIMUM_BOND_AMOUNT = 1;
export const MINIMUM_BOND_MORE_AMOUNT = 1;
export const FEE = process.env.REACT_APP_FEE_DEDUCTION || 0.00001;

export const VALIDATOR_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  DEACTIVATING: "deactivating",
};

export const DENOM = "tics";
export const PREFIX = "qubetics";
export const DEFAULT_TABLE_LIMIT = 10;

export const typesOfTransaction = {
  BOND_MORE: "BOND_MORE",
  UNBOND: "UNBOND_FUNDS",
  REDELEGATE: "RE_DELEGATE",
  DELEGATE: "DELEGATE",
};

export const msg = {
  tooltip: {
    marketCap: " Total value of all the coins issued",
    totalSupply: "Total coins issued by the system",
  },
};

export const EXPLORER_CURRENCY_NAME = "Tics"
