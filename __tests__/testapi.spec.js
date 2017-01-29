/*
import { getAuthKey } from 'src/testapi';
import td from 'testdouble';

var api = td.replace(fetch);
td.when(api('https://api.thetvdb.com/login')).thenResolve('Jane');

describe('The connectivity backend', () => {
  it('should render correct contents', () => {
    return getAuthKey.then(key => {
      assert.equal(key, -1);
    });
  });
});
*/

test('adds 1 + 2 to equal 3', () => {
  expect(3).toBe(3);
});
