import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import App from './App';
import userEvent from '@testing-library/user-event';

import axios from 'axios';

jest.mock('axios'); // used to test promises

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    expect(screen.getByText(/Login/)).toBeInTheDocument(); //check to see if login btn is rendered

    expect(screen.getByText(/Queue Management System/)).toBeInTheDocument(); //check to see if title is rendered

    //screen.getByRole(''); // doing it for debug, see the result and so understand which are the accessible roles
    //expect(screen.getByRole('heading')).toBeInTheDocument();
    //expect(screen.getByRole('button')).toBeInTheDocument();

    // queryBy: check if something is (correctly) not present:
    expect(screen.queryByText(/A text that should not be there/)).toBeNull();

    expect(screen.queryByText(/Postepay/)).toBeNull();
    screen.debug(); // used to debug current situation
    // findBy: used to wait for asynchronous event (like fetches)
    //expect(await screen.findByText(/Postepay/)).toBeInTheDocument(); // works only if the promise is triggered immediately when rendering (e.g., .useEffect({...}, []); )
    screen.debug();

    //expect(screen.getAllByText(/Service number:/)).toBeInTheDocument(); // used to find all the elements (not just one)

    screen.debug();
  });

  test('fetch services', async () => {
    const fetchedServices = [
      {
        ID: 1,
        Counter1: 1,
        Counter2: 1,
        Counter3: 1,
        Counter4: 0,
        Name: 'Bank account',
      },
      {
        ID: 2,
        Counter1: 1,
        Counter2: 1,
        Counter3: 0,
        Counter4: 0,
        Name: 'Postepay',
      },
      {
        ID: 3,
        Counter1: 1,
        Counter2: 1,
        Counter3: 0,
        Counter4: 0,
        Name: 'Postal savings',
      },
      {
        ID: 4,
        Counter1: 1,
        Counter2: 1,
        Counter3: 0,
        Counter4: 0,
        Name: 'Funds transfer',
      },
      {
        ID: 5,
        Counter1: 0,
        Counter2: 1,
        Counter3: 1,
        Counter4: 0,
        Name: 'Investments',
      },
      {
        ID: 6,
        Counter1: 0,
        Counter2: 0,
        Counter3: 1,
        Counter4: 1,
        Name: 'Loans',
      },
      {
        ID: 7,
        Counter1: 0,
        Counter2: 0,
        Counter3: 0,
        Counter4: 1,
        Name: 'Help',
      },
    ];

    const promise = Promise.resolve({ data: { hits: fetchedServices } });
    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    await userEvent.click(screen.getByRole('button'));
    await act(() => promise);
  });
});

describe('User', () => {
  test('User Log-in', async () => {
    render(<App />);

    /*fireEvent.change(screen.getByRole('button'), {
              target: { value: 'clicked' },
            }); // better to use userEvent, which is more precisely acting like an user using the browser and pressing keys on keyboard */
    await userEvent.click(screen.getByText(/Login/));
    expect(screen.getByText(/Insert your email/)).toBeInTheDocument();
  });
});
