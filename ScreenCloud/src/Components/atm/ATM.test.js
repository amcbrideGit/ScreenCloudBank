import React from 'react';
import ReactDOM from 'react-dom';
import Atm from './ATM';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Atm/>, div);
  ReactDOM.unmountComponentAtNode(div);
});