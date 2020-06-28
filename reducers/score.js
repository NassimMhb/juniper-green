import { PRINTSCORE} from '../constants/actions';

const initialState = {
    date:  ''
}

export default (state = initialState, action = {}) => {

    switch (action.type) {

        case PRINTSCORE:
            return { ...state, }

        default:
            return { ...state }
    }
}