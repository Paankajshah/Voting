import { SET_CANDIDATE_DATA, SET_VOTER_DATA } from "../actionTypes";
import {addError , removeError} from './error';

import api from "../../services/api";

export const setCandidate = (data) => ({
  type: SET_CANDIDATE_DATA,
  data,
});

export const setVoter = (data) => ({
  type: SET_VOTER_DATA,
  data,
});

export const candidateData = () => {
  return async (dispatch) => {
    try {
      let {...data} = await api.candidateData();
      console.log("candidate data", data);
      dispatch(setCandidate(data.data));
      dispatch(removeError());
    } catch (err) {
      console.log("error ", err.message);
      dispatch(addError(err.message));
    }
  };
};

export const voterData = () => {
  return async (dispatch) => {
    try {
      const { ...data } = await api.voterData();
      console.log("voter data", data);
      dispatch(setVoter(data.data));
      dispatch(removeError());
    } catch (err) {
      console.log("error ", err.message);
      dispatch(addError(err.message));
    }
  };
};
