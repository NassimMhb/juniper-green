import { SELECT, PLAY, RESET } from '../constants/actions';

const initialState = {
    choices: [],
    number: '',
    computerChoices: [],
    userChoices: [],
    lastChoice:'',
    computerNumber:'',
    errorMsg: false,
    errorPresentNumber: false,
    tour: 0,
    tableOfValidResponses:[],
    end: false,
    userWin:'',
    computerWin:'',
}

const computerPlay = (tableRespValid) => {
    let value = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    let resultat = '';
    if(value % 2){
       return resultat = tableRespValid[tableRespValid.length - 1];
    }
    else {
        return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    }
}

const possibleMultiple = (num, tableOfValidResponses, tableauChoices) => {
    let tableau = [];
    let j = 2;
    let candidat = j;

    while (candidat < 100) {
      candidat = j * num;
      if (tableOfValidResponses.indexOf(candidat) == -1 && candidat <= 100 && tableauChoices.indexOf(candidat) == -1)  tableau.push(candidat);

      j++;
    }

    return tableau;
  }

const possibleDivisor = (num,tableOfValidResponses, tableauChoices) => {
    let divisors = [];
    let d = 2;

    while (d <= num) {
      if (num % d == 0 && tableOfValidResponses.indexOf(d) == -1 && tableauChoices.indexOf(d) == -1) {
        divisors.push(d);
      }
      d++;
    }
    return divisors;
}

export default (state = initialState, action = {}) => {

    switch (action.type) {

        case SELECT:
            const number = action.payload;

            if (Number.isNaN(number) === true) number = '';

            return { ...state,                 
                number: number,
                lastChoice: number
            } 

        case PLAY:

            if (Number.isNaN(state.number) === true){
                state.number = '';
                state.errorMsg = true;
                state.errorPresentNumber = false;
            } else if(parseInt(state.number) > 0 && parseInt(state.number) <= 100){
                state.errorMsg = false;
                // pour savoir si le choix est bon 
                let flag = state.choices.indexOf(parseInt(state.number)) == -1 ? false : true;
                console.log(state.choices)
                console.log(flag)
                if(flag == false){
                    
                    state.errorPresentNumber = false;
                    if(state.tour == 0){
                        state.tableOfValidResponses=[];
                        state.tableOfValidResponses = possibleDivisor(parseInt(state.number), state.tableOfValidResponses, state.choices).concat(possibleMultiple(parseInt(state.number), state.tableOfValidResponses, state.choices));
                    }else if(state.tour > 0){
                        if(state.tableOfValidResponses.indexOf(parseInt(state.number)) == -1){
                            state.end = true;
                            state.userWin = false;
                            state.computerWin = true;
                        } else {
                            state.tableOfValidResponses=[];
                            state.tableOfValidResponses = possibleDivisor(parseInt(state.number), state.tableOfValidResponses, state.choices).concat(possibleMultiple(parseInt(state.number), state.tableOfValidResponses, state.choices)); 
                        }
                    }
                    state.choices.push(parseInt(state.number));
                    state.userChoices.push(parseInt(state.number));

                    if(state.end != true){
                        let randomNumb = computerPlay(state.tableOfValidResponses);
                        let flagComputer = state.choices.indexOf(randomNumb) == -1 ? false : true;
                        while (flagComputer == true) {
                            randomNumb = computerPlay(state.tableOfValidResponses);
                        }
                        state.computerNumber = randomNumb;
                        state.computerChoices.push(state.computerNumber);
                        state.choices.push(state.computerNumber);
                        console.log("------state computer number :")
                        console.log(state.computerNumber)
                        if(state.tableOfValidResponses.indexOf(state.computerNumber) == -1){
                            state.end = true;
                            state.computerWin = false;
                            state.userWin = true;
                        }
                        state.tableOfValidResponses=[];
                        state.tableOfValidResponses = possibleDivisor(parseInt(state.computerNumber), state.tableOfValidResponses, state.choices).concat(possibleMultiple(parseInt(state.computerNumber), state.tableOfValidResponses, state.choices));
                    }
                } else{
                    state.errorPresentNumber = true;
                }
                state.tour = state.tour+1;
                console.log("nb tour : "+state.tour);
                console.log("WIIIN computer : " +state.computerWin);
                console.log("WIIIN user : " +state.userWin);
                console.log("END: " +state.end);
                console.log("------NOUVELLES table valid responses :")
                console.log(state.tableOfValidResponses)

            } else {
                state.number = '';
                state.errorMsg = true;
                state.errorPresentNumber = false;
            }

            return { ...state,                 
                choices: state.choices,
                userChoices: state.userChoices,
                number: '',
                computerNumber: state.computerNumber,
                errorMsg:state.errorMsg,
                errorPresentNumber:state.errorPresentNumber,
                end: state.end
        }   
        
        case RESET:

            return { ...state,     
                choices: [],
                number: '',
                computerChoices: [],
                userChoices: [],
                lastChoice:'',
                computerNumber:'',
                errorMsg: false,
                errorPresentNumber: false,
                tour: 0,
                tableOfValidResponses:[],
                end: false,
                userWin:'',
                computerWin:'', }

        default:
            return { ...state }
    }
}