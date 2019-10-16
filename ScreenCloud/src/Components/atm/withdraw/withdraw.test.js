import React from 'react';
import ReactDOM from 'react-dom';
import { act } from "react-dom/test-utils";
import { exportAllDeclaration, isTSAnyKeyword } from '@babel/types';
import { getStackTraceLines } from 'jest-message-util';
import { unmountComponentAtNode } from "react-dom"
import withdraw from "./withdraw";

let container = null;
let state = {};

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

it("withdraws the correct amount,", ()=>{

    let withdrawState = withdraw(5, state);
    expect(withdrawState.balance).toBe(215);

    withdrawState = withdraw(10, state);
    expect(withdrawState.balance).toBe(210);

    withdrawState = withdraw(20, state);
    expect(withdrawState.balance).toBe(200);

    withdrawState = withdraw(55, state);
    expect(withdrawState.balance).toBe(165);
})

it("will not withdraw past overdraft", ()=>{

    state.notes =   {
        fives: 10000,
        tens: 10000,
        twenties: 10000,
    }
    let withdrawState = withdraw(400, state);

    expect(withdrawState.balance).toBe(state.balance);
    expect(withdrawState.pastLimit).toBe(true);

})

it("will not withdraw more money than available", ()=>{

    state.balance = 1000000;
    let withdrawState = withdraw(400, state);

    expect(withdrawState.balance).toBe(state.balance);
    expect(withdrawState.wouldRunOut).toBe(true);

})

it("will set state of nonotes to true when there are no notes left", ()=> {
    state.balance = 100000;
    state.notes =   {
        fives: 1,
        tens: 1,
        twenties: 1,
    }

    let withdrawState = withdraw(35, state);
    expect(withdrawState.balance).toBe(state.balance - 35);
    expect(withdrawState.noNotes).toBe(true);
})

it("will only accept withdrawals in multiples of five", ()=> {
    
    let withdrawState = withdraw(33, state);
    expect(withdrawState.balance).toBe(state.balance);
    expect(withdrawState.notANote).toBe(true);
})

it("will withdraw notes as evenly as possible", ()=>{

    state.notes = {
        fives: 5,
        tens: 50,
        twenties: 5,
    }

    let withdrawState = withdraw(100, state);
    expect(withdrawState.notes.fives).toBe(5);
    expect(withdrawState.notes.tens).toBe(40);
    expect(withdrawState.notes.twenties).toBe(5);

    state.notes = {
        fives: 5,
        tens: 5,
        twenties: 5,
    }
    withdrawState = withdraw(100, state);
    expect(withdrawState.notes.fives).toBe(3);
    expect(withdrawState.notes.tens).toBe(2);
    expect(withdrawState.notes.twenties).toBe(2);

    state.notes = {
        fives: 100,
        tens: 5,
        twenties: 5,
    }
    withdrawState = withdraw(100, state);
    expect(withdrawState.notes.fives).toBe(80);

    state.notes = {
        fives: 50,
        tens: 50,
        twenties: 50,
    }
    state.balance = 100000
    withdrawState = withdraw(700, state);
    expect(withdrawState.notes.fives).toBe(30);
    expect(withdrawState.notes.tens).toBe(30);
    expect(withdrawState.notes.twenties).toBe(30);
})

it("will not withdraw if the withdrawal amount can't be reached with given notes", ()=>{
    
    state.notes = {
        fives: 0,
        tens: 5,
        twenties: 5,
    }
    let withdrawState = withdraw(35, state);
    expect(withdrawState.balance).toBe(220);

    state.notes = {
        fives: 1,
        tens: 0,
        twenties: 5,
    }
    withdrawState = withdraw(70, state);
    expect(withdrawState.balance).toBe(220);
})