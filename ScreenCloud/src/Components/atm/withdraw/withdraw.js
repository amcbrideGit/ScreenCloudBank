module.exports = function withdraw(amountToWithdraw, state) {
    let amountWithdrawn= 0;
    let totalCash = (state.notes.fives * 5) + (state.notes.tens * 10) + (state.notes.twenties * 20); //Make sure we handle running out of money
    let stateSnapshot = state;

    if(amountToWithdraw%5 != 0) {
        return {
            notes: {
                fives: state.notes.fives,
                tens: state.notes.tens,
                twenties: state.notes.twenties
            },
            balance: state.balance,
            withdrawn: amountWithdrawn,
            pastLimit: state.pastLimit,
            notANote: true
        }
    }

    if(amountToWithdraw > totalCash){
        return {
            notes: {
                fives: state.notes.fives,
                tens: state.notes.tens,
                twenties: state.notes.twenties
            },
            balance: state.balance,
            withdrawn: amountWithdrawn,
            pastLimit: state.pastLimit,
            wouldRunOut: true
        }
    }

    if((state.balance - amountToWithdraw) <-100){
        return {
            notes:{
                fives: state.notes.fives,
                tens: state.notes.tens,
                twenties: state.notes.twenties
            },
            balance: state.balance,
            withdrawn: amountWithdrawn,
            pastLimit: true,
            noNotes: state.noNotes
        };
    }

    while(amountToWithdraw !== 0) {
        if(totalCash <=0) break;
        else if(state.balance <= -100) break;
        else if(amountToWithdraw -20 >= 0 && state.notes.twenties >= state.notes.fives && state.notes.twenties >= state.notes.tens && state.notes.twenties >0 && amountToWithdraw!=5){
            state = {
                notes: {
                    fives: state.notes.fives,
                    tens: state.notes.tens,
                    twenties: state.notes.twenties -1
                },
                balance: state.balance - 20,
                withdrawn: state.withdrawn,
                pastLimit: state.pastLimit,
                noNotes: state.noNotes
            }
            amountToWithdraw = amountToWithdraw -20
            amountWithdrawn = amountWithdrawn + 20;
        }

        else if(state.notes.tens >= state.notes.fives && state.notes.tens >0  && amountToWithdraw!=5){
                if(amountToWithdraw -10 >=0){
                    state = {
                        notes: {
                            fives: state.notes.fives,
                            tens: state.notes.tens -1,
                            twenties: state.notes.twenties
                        },
                        balance: state.balance - 10,
                        withdrawn: state.withdrawn,
                        pastLimit: state.pastLimit,
                        noNotes: state.noNotes
                    }
                    amountToWithdraw = amountToWithdraw -10
                    amountWithdrawn = amountWithdrawn + 10;
                }
        }

        else if(state.notes.fives >0 && amountToWithdraw - 5 >= 0){
            state = {
                notes: {
                    fives: state.notes.fives -1,
                    tens: state.notes.tens,
                    twenties: state.notes.twenties
                },
                balance: state.balance - 5,
                withdrawn: state.withdrawn,
                pastLimit: state.pastLimit,
                noNotes: state.noNotes
            }
            amountToWithdraw = amountToWithdraw -5
            amountWithdrawn = amountWithdrawn + 5;
        }
        
        //We don't have the appropriate notes to make this withdrawal. Return original state.
        else {
            stateSnapshot.cannotProvideNotes = true
            return stateSnapshot;
        }
        
    }
    if(state.notes.fives==0 && state.notes.tens==0 && state.notes.twenties==0){
        return {
            notes: {
                fives: state.notes.fives,
                tens: state.notes.tens,
                twenties: state.notes.twenties
            },
            balance: state.balance,
            withdrawn: amountWithdrawn,
            pastLimit: false,
            noNotes: true
        };
    }

    else return{
        notes: {
            fives: state.notes.fives,
            tens: state.notes.tens,
            twenties: state.notes.twenties
        },
        balance: state.balance,
        withdrawn: amountWithdrawn,
        pastLimit: false,
        noNotes: false
    };
            
    
}
