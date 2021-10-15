import API from '../API';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

describe('Login', () => {
  it('invalid email', async () => {
    fetch.mockResponseOnce();
    const onResponse = jest.fn();
    const onError = jest.fn();
    return API.login({
      email: 's286329studentu.polito.it',
      password: 'teamSE04',
    })
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
      });
  });

  it('wrong password', async () => {
    fetch.mockResponseOnce();
    const onResponse = jest.fn();
    const onError = jest.fn();
    return API.login({
      email: 's286329@studenti.polito.it',
      password: 'teamSE04dfdsafs',
    })
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
      });
  });

  it('invalid password', async () => {
    fetch.mockResponseOnce();
    const onResponse = jest.fn();
    const onError = jest.fn();
    return API.login({
      email: 's286329@studenti.polito.it',
      password: 'teams',
    })
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
      });
  });

  it('right values , no officer', async () => {
    fetch.mockResponseOnce();
    const onResponse = jest.fn();
    const onError = jest.fn();
    return API.login({
      email: 's2863292@studenti.polito.it',
      password: 'teamSE04',
    })
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
      });
  });

  it('right values , officer found', async () => {
    fetch.mockResponseOnce(JSON.stringify('Mattia'));
    const email = 's286329@studenti.polito.it';
    const password = 'teamSE04';
    const credentials = { email, password };

    const name = await API.login(credentials);

    expect(name).toEqual('Mattia');
  });
});
