import { 
    SELECT,
    PLAY,
    RESET,
    PRINTSCORE
} from '../constants/actions';

export const select = payload => {

    return {
        type: SELECT, payload
    }
}

export const play = () => {

    return {
        type: PLAY
    }
}

export const reset = () => {

    return {
        type: RESET
    }
}

export const printscore = () => {

    return {
        type: PRINTSCORE
    }
}
