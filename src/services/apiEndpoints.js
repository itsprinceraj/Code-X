const BASE_URL = "https://code-x-ashen.vercel.app/api/v1";
const AUTH = "/auth";
const PROJECT = "/project";

//  AUTH ENDPOINTS;

export const authEndpoints = {
  SIGNUP_URL: BASE_URL + AUTH + "/signup",
  LOGIN_URL: BASE_URL + AUTH + "/login",
  GET_USER_URL: BASE_URL + AUTH + "/getUser",
};

// PROJECT ENDPOINTS;

export const projectEndpoints = {
  CREATE_PROJ_URL: BASE_URL + PROJECT + "/createProj",
  UPDATE_PROJ_URL: BASE_URL + PROJECT + "/updateProj",
  DELETE_PROJ_URL: BASE_URL + PROJECT + "/deleteProj",
  GET_ALL_PROJ_URL: BASE_URL + PROJECT + "/getAllProj",
  GET_PROJ_URL: BASE_URL + PROJECT + "/getProj",
};
