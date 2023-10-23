const general = require('../general');

describe('Testing general logic', () => {
  it('Check addParameterToStr (bad param)', () => {
    const text = general.addParameterToStr(null, null, 'test');
    expect(text).toEqual('test');
  });

  it('Check generateUpdateSqlStr (bad param)', () => {
    const text = general.generateUpdateSqlStr('123', 'fstName', 'lstName', 'bthDate', null);
    const result = 'UPDATE users SET firstName = \'fstName\', lastName = \'lstName\', dateOfBirth = \'bthDate\' WHERE userId = 123';
    expect(text).toEqual(result);
  });
});
