/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    REACT_APP_BFF_URL: string
  }
}
