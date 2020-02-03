// importamos la funcion que vamos a testear
/* import { myFunction } from "../src/lib/index";

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
}); */
import mockFb from '../_mocks_/firebase-mock.js'

global.firebase = mockFb();
import {
  savePost
} from '../src/app.js';

/* const test = require('firebase-functions-test')();
const key = functions.config().stripe.key; */

describe('savePost', () => {
  it('debería ser una función', () => {
    expect(typeof savePost).toBe('function');
  });
});

describe('savePost', () => {
  it('debería de poder agregar un post', () => {
    return savePost('algun post').then((data) => {
      expect(data).toBe('algun post');
    });
  });
});

/* describe('emailLogin', () => {
  it('debería ser una función', () => {
    expect(typeof emailLogin).toBe('function');
  });
});

describe('googleSignIn', () => {
  it('debería ser una función', () => {
    expect(typeof googleSignIn).toBe('function');
  });
});

describe('register', () => {
  it('debería ser una función', () => {
    expect(typeof register).toBe('function');
  });
});

describe('uploadImgAndText', () => {
  it('debería ser una función', () => {
    expect(typeof uploadImgAndText).toBe('function');
  });
}); */
