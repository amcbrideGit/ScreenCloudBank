import React from 'react';
import ReactDOM from 'react-dom';
import { unmountComponentAtNode } from "react-dom"
import ATMNav from './ATMNav';
import { act } from "react-dom/test-utils";
import Container from "react-bootstrap/Container"

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
  const div = document.createElement('div');
  ReactDOM.render(<ATMNav name="Andrew"/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('loads signout modal when clicking logout', ()=>{
    
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

    const logout = jest.fn(()=>{
        state= {
            visible : true,
            withdrawvisible: false,
            notANoteVisible: false,
            notes: state.notes,
            balance: state.balance,
            pastLimit: false,
            noNotes: false
        };
    })

    expect(document.querySelector("#headNav")).toBe(null);

    act(()=>{        
        ReactDOM.render(<ATMNav name="Andrew" show={state.visible} onClickLogout={logout} onHide={onChange} onClickNo={onChange}/>, container)
    })

    expect(document.querySelector("#headNav").innerHTML.slice(-23,-4)).toBe("ScreenCloud Banking");
    
    let button = document.querySelector(".logoutButton");
    act(()=>{
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    act(()=>{
        ReactDOM.render(<ATMNav name="Andrew" show={state.visible} onClickLogout={logout} onHide={onChange} onClickNo={onChange}/>, container)
    })

    expect(logout).toHaveBeenCalledTimes(1);
    expect(state.visible).toBe(true);
    expect(document.querySelector(".modal-title").innerHTML).toBe("Are you sure you want to sign out?")

    button = document.querySelector(".close");
    act(()=>{
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    act(()=>{
        ReactDOM.render(<ATMNav name="Andrew" show={state.visible} onClickLogout={logout} onHide={onChange} onClickNo={onChange}/>, container)
    })
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(state.visible).toBe(false)
    
})

it('signs out when clicking \"yes\" on signout modal', ()=>{
    
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

    const logout = jest.fn(()=>{
        state= {
            visible : true,
            withdrawvisible: false,
            notANoteVisible: false,
            notes: state.notes,
            balance: state.balance,
            pastLimit: false,
            noNotes: false
        };
    })

    let store = {
        loggedIn: true
    }

    const signout = jest.fn(()=>{
        store.loggedIn=false;
    })

    expect(document.querySelector("#headNav")).toBe(null);

    act(()=>{        
        ReactDOM.render(<ATMNav name="Andrew" show={state.visible} onClickLogout={logout} onHide={onChange} onClickYes={signout} onClickNo={onChange}/>, container)
    })

    expect(document.querySelector("#headNav").innerHTML.slice(-23,-4)).toBe("ScreenCloud Banking");
    
    let button = document.querySelector(".logoutButton");
    act(()=>{
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    act(()=>{
        ReactDOM.render(<ATMNav name="Andrew" show={state.visible} onClickLogout={logout} onHide={onChange} onClickYes={signout} onClickNo={onChange}/>, container)
    })

    expect(logout).toHaveBeenCalledTimes(1);
    expect(state.visible).toBe(true);
    expect(document.querySelector(".modal-title").innerHTML).toBe("Are you sure you want to sign out?")

    expect(store.loggedIn).toBe(true);

    button = document.querySelector("#yesButton");
    act(()=>{
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    act(()=>{
        ReactDOM.render(<ATMNav name="Andrew" show={state.visible} onClickLogout={logout} onHide={onChange} onClickYes={signout} onClickNo={onChange}/>, container)
    })
    expect(signout).toHaveBeenCalledTimes(1);
    expect(store.loggedIn).toBe(false);
    
})