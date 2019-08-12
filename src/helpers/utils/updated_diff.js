/**
 * https://github.com/mattphillips/deep-object-diff
 * MIT License

Copyright(c) 2016 - present Matt Phillips < mattphillips >

  Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files(the "Software"), to deal
  in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 *
 */

export const isDate = d => d instanceof Date;
export const isEmpty = o => Object.keys(o).length === 0;
export const isObject = o => o != null && typeof o === 'object';
export const properObject = o => isObject(o) && !o.hasOwnProperty ? { ...o } : o;


const updatedDiff = (lhs, rhs) => {

  if (lhs === rhs) return {};

  if (!isObject(lhs) || !isObject(rhs)) return rhs;

  const l = properObject(lhs);
  const r = properObject(rhs);

  if (isDate(l) || isDate(r)) {
    if (l.valueOf() == r.valueOf()) return {};
    return r;
  }

  return Object.keys(r).reduce((acc, key) => {

    if (l.hasOwnProperty(key)) {
      const difference = updatedDiff(l[key], r[key]);

      if (isObject(difference) && isEmpty(difference) && !isDate(difference)) return acc;

      return { ...acc, [key]: difference };
    }

    return acc;
  }, {});
};

export default updatedDiff;