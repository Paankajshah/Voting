import { SET_CANDIDATE_DATA , SET_VOTER_DATA} from '../actionTypes';

export const DEFAULT_STATE = {
    candidates: [],
    voters:[]
};

export default (state = DEFAULT_STATE , action) => {
    switch(action.type){
        case  SET_CANDIDATE_DATA: 
            return { ...state , candidates:action.data}
        case  SET_VOTER_DATA: 
            return { ...state , voters:action.data}
        default : return state;
    }
}