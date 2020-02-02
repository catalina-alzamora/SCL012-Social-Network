// importamos la funcion que vamos a testear
/* import { myFunction } from "../src/lib/index";

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
}); */

import { emailLogin /* ,googleSignIn, register, observer, uploadImgAndText, */ } from '../src/app.js';

describe('emailLogin', () => {
  it('debería ser una función', () => {
    expect(typeof emailLogin).toBe('function');
  });
});
