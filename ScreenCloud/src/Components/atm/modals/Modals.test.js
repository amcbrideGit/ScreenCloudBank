import React from 'react';
import ReactDOM from 'react-dom';
import { act } from "react-dom/test-utils";
import WithdrawModal from './WithdrawModal';
import NotANoteModal from './NotANoteModal';
import WouldRunOutModal from './WouldRunOutModal';
import NoNotesModal from './NoNotesModal';
import OverDrawnModal from './OverDrawnModal';
import PrintStatementModal from "./PrintStatementModal"
import { unmountComponentAtNode } from "react-dom"
import Atm from "../Atm";
import { exportAllDeclaration } from '@babel/types';
import { getStackTraceLines } from 'jest-message-util';
import SignOutModal from './SignOutModal';

let container = null;
let state = null;

beforeEach(()=>{
    state ={
        visible: false,
        notes:  {
            fives: 4,
            tens: 15,
            twenties: 7,
        },
        balance: 220,
        overdrawn: false,
        pastLimit: false,
        noNotes: false
    }
    // setup a DOM element as a render target
    container = document.createElement("div");
    // container *must* be attached to document so events work correctly.
    document.body.appendChild(container);
})

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    state = null;
  });

it('renders without crashing', () => {
  ReactDOM.render(<WithdrawModal state={state}/>, container);
  ReactDOM.render(<NotANoteModal state={state}/>, container);
  ReactDOM.render(<WouldRunOutModal state={state}/>, container);
  ReactDOM.render(<NoNotesModal state={state}/>, container);
  ReactDOM.render(<OverDrawnModal state={state}/>, container);
  ReactDOM.unmountComponentAtNode(container);
});

it('loads withdraw modal and closes withdraw modal on click close', () =>{

    const onChange = jest.fn(()=>{
        state= {
            visible : false,
            withdrawvisible: false,
            notes: state.notes,
            balance: state.balance,
            pastLimit: false,
            noNotes: false
        };
    })

    expect(document.querySelector(".modal")).toBe(null);

    act(()=>{
        ReactDOM.render(<WithdrawModal state={state} value={0} show={state.visible} onHide={onChange}/>, container)
    })
    expect(document.querySelector(".modal")).toBe(null);

    state.visible = true;
    act(()=>{
        ReactDOM.render(<WithdrawModal state={state} value={0} show={state.visible} onHide={onChange}/>, container)
    })
    expect(document.querySelector(".modal-body").innerHTML).toBe("<form class=\"withdraw-form\"><div class=\"form-group\"><label for=\"withdrawAmount\">Amount</label><input type=\"text\" class=\"form-control\" id=\"withdrawAmount\" aria-describedby=\"emailHelp\" placeholder=\"Enter Amount\"></div><button type=\"submit\" class=\"btn btn-primary\">Submit</button></form>")

    const button = document.querySelector(".close");
    act(()=>{
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(state.visible).toBe(false);
})

it('loads overdrawn modal and closes overdrawn modal on click close', () =>{

    const onChange = jest.fn(()=>{
        state= {
            visible : false,
            withdrawvisible: false,
            notes: state.notes,
            balance: state.balance,
            pastLimit: false,
            noNotes: false
        };
    })

    expect(document.querySelector(".modal")).toBe(null)

    act(()=>{
        ReactDOM.render(<OverDrawnModal state={state} show={state.pastLimit} onHide={onChange}/>, container)
    })
    expect(document.querySelector(".modal")).toBe(null)

    state.pastLimit = true;
    act(()=>{
        ReactDOM.render(<OverDrawnModal state={state} show={state.pastLimit} onHide={onChange}/>, container)
    })
    expect(document.querySelector(".modal-body").innerHTML).toBe("<p>This withdrawal would put you over your overdraw limit of £100. Please withdraw £320 or less.</p>")

    const button = document.querySelector(".close");
    act(()=>{
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(state.pastLimit).toBe(false);
})

it('loads notanote modal and closes notanote modal on click close', () =>{

    const onChange = jest.fn(()=>{
        state= {
            visible : false,
            withdrawvisible: false,
            notANoteVisible: false,
            notes: state.notes,
            balance: state.balance,
            pastLimit: false,
            noNotes: false
        };
    })

    expect(document.querySelector(".modal")).toBe(null);

    act(()=>{
        ReactDOM.render(<NotANoteModal show={state.notANoteVisible} onHide={onChange}/>, container)
    })
    expect(document.querySelector(".modal")).toBe(null);

    state.notANoteVisible = true;
    act(()=>{
        ReactDOM.render(<NotANoteModal show={state.notANoteVisible} onHide={onChange}/>, container)
    })
    expect(document.querySelector(".modal-body").innerHTML).toBe("Please enter a multiple of £5.");

    const button = document.querySelector(".close");
    act(()=>{
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(state.pastLimit).toBe(false);
})

it('loads nonotes modal and closes nonotes modal on click close', () =>{

    const onChange = jest.fn(()=>{
        state= {
            visible : false,
            withdrawvisible: false,
            notANoteVisible: false,
            notes: state.notes,
            balance: state.balance,
            pastLimit: false,
            noNotes: false
        };
    })

    expect(document.querySelector(".modal")).toBe(null);

    act(()=>{
        ReactDOM.render(<NoNotesModal show={state.noNotes} onHide={onChange}/>, container)
    })
    expect(document.querySelector(".modal")).toBe(null);

    state.noNotes = true;
    act(()=>{
        ReactDOM.render(<NoNotesModal show={state.noNotes} onHide={onChange}/>, container)
    })
    expect(document.querySelector(".modal-body").innerHTML).toBe("We're sorry, but this machine has run out of notes. We apologise for the inconvenience.");

    const button = document.querySelector(".close");
    act(()=>{
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(state.noNotes).toBe(false);
})

it('loads wouldrunout modal and closes wouldrunout modal on click close', () =>{

    const onChange = jest.fn(()=>{
        state= {
            visible : false,
            withdrawvisible: false,
            notANoteVisible: false,
            wouldRunOutVisible: false,
            notes: state.notes,
            balance: state.balance,
            pastLimit: false,
            noNotes: false
        };
    })

    expect(document.querySelector(".modal")).toBe(null);
    act(()=>{
        ReactDOM.render(<WouldRunOutModal show={state.wouldRunOutVisible} onHide={onChange}/>, container)
    })
    expect(document.querySelector(".modal")).toBe(null);

    state.wouldRunOutVisible = true;
    act(()=>{
        ReactDOM.render(<WouldRunOutModal show={state.wouldRunOutVisible} onHide={onChange}/>, container)
    })
    expect(document.querySelector(".modal-body").innerHTML).toBe("We're sorry, but we do not have the funds to process that withdrawal. Please withdraw a smaller amount.");

    const button = document.querySelector(".close");
    act(()=>{
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(state.wouldRunOutVisible).toBe(false);
})

it("should sign out when clicking sign out", ()=>{
    const onChange = jest.fn(()=>{
        state= {
            visible : false,
            withdrawvisible: false,
            notANoteVisible: false,
            wouldRunOutVisible: false,
            notes: state.notes,
            balance: state.balance,
            pastLimit: false,
            noNotes: false
        };
    })

    expect(document.querySelector(".modal")).toBe(null);
    act(()=>{
        ReactDOM.render(<SignOutModal show={state.visible} onHide={onChange} onClickNo={onChange}/>, container)
    })
    expect(document.querySelector(".modal")).toBe(null);

    state.visible = true;
    act(()=>{
        ReactDOM.render(<SignOutModal show={state.visible} onHide={onChange} onClickNo={onChange}/>, container)
    })
    expect(document.querySelector(".modal-title").innerHTML).toBe("Are you sure you want to sign out?");

    let button = document.querySelector(".close");
    act(()=>{
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(state.visible).toBe(false);

    state.visible = true;
    act(()=>{
        ReactDOM.render(<SignOutModal show={state.visible} onHide={onChange} onClickNo={onChange}/>, container)
    })
    const noButton = document.querySelector("#noButton");
    act(()=>{
        noButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(state.visible).toBe(false);
})

it("loads PrintStatement modal and closes printstatement modal on click close", ()=>{
    const onChange = jest.fn(()=>{
        state= {
            visible : false,
            withdrawvisible: false,
            notANoteVisible: false,
            printStatementVisible: false,
            wouldRunOutVisible: false,
            notes: state.notes,
            balance: state.balance,
            pastLimit: false,
            noNotes: false
        };
    })

    expect(document.querySelector(".modal")).toBe(null);
    act(()=>{
        ReactDOM.render(<PrintStatementModal show={state.printStatementVisible} onHide={onChange}/>, container)
    })
    expect(document.querySelector(".modal")).toBe(null);

    state.wouldRunOutVisible = true;
    act(()=>{
        ReactDOM.render(<PrintStatementModal show={state.wouldRunOutVisible} onHide={onChange}/>, container)
    })
    expect(document.querySelector(".modal-title").innerHTML).toBe("Statement for ");
    const button = document.querySelector(".close");
    act(()=>{
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(state.printStatementVisible).toBe(false);
})
