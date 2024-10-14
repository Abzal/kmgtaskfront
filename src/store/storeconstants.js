/**auth*/
export const LOGIN_ACTION = '[actions] login';
export const LOGOUT_ACTION = '[actions] logout';
export const GET_USER_GETTER = '[getter] get user';
export const GET_TOKEN_GETTER = '[getter] get token';
export const SET_USER_MUTATION = '[mutation] set user';
export const SET_TOKEN_MUTATION = '[mutation] set token';
export const IS_USER_IDENTIFIED_GETTER = '[getter] check user consists';

/**wells*/
export const GET_WELLS_GETTER = '[getter] get wells';
export const SET_WELLS_MUTATION = '[mutation] set wells';
export const SET_UPDATED_WELLS_ROW_MUTATION = '[mutation] set updated wells row';
export const GET_UPDATED_WELLS_ROW_GETTER = '[getter] get updated wells row';
export const FETCH_WELLS_ACTION = '[action] fetch all wells';
export const MULTIPLE_UPDATE_WELLS_ACTION = '[action] multiple update wells';
export const TOGGLE_WELLS_SAVE_STATUS_ACTION = '[action] toggle save status';

export const FETCH_WELL_NUMBERS_ACTION = '[action] well numbers by saved status';
export const SET_WELL_NUMBERS_MUTATION = '[mutation] set well numbers';
export const GET_WELL_NUMBERS_GETTER = '[getter] get well numbers';

export const GET_SELECTED_MATCH_GETTER = '[getter] get selected match';
export const SET_SELECTED_MATCH_MUTATION = '[mutation] set selected match';

/**handbook*/
export const FETCH_HANDBOOK_ACTION = '[action] fetch handbook';
export const GET_HANDBOOK_GETTER = '[getter] get handbook';
export const SET_HANDBOOK_MUTATION = '[mutation] set handbook';
