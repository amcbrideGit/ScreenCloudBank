import React from "react"
const withdraw= require('./withdraw');

class WithdrawForm extends React.Component {
    
    constructor() {
        super();
        this.state={};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    handleSubmit(event, state) {
        event.preventDefault();
        let newState= withdraw(event.target.value, state);
        console.log(newState);
        // this.setState({
        //     visible : false,
        //     withdrawvisible: false,
        //     notes: newState[4].notes,
        //     balance: (this.state.balance - newState[3])
        // });
    }
    render(){
        return(
            <form className="withdraw-form " onSubmit={()=> this.handleSubmit(this.props.state)}>
                <div className="form-group">
                    <label htmlFor="withdrawAmount">Amount</label>
                    <input type="text" className="form-control" id="withdrawAmount" aria-describedby="emailHelp" placeholder="Enter Amount" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

export default WithdrawForm;