module.exports = general = {
  createUserValid: (body) => {
    if (
      body.firstName == null ||
            body.lastName == null ||
            body.birthDate == null
    ) {
      return false;
    }
    return true;
  },
  updateUserValid: (body) => {
    if (
      body.userId == null || (
        body.firstName == null &&
                body.lastName == null &&
                body.birthDate == null &&
                body.isActive == null
      )
    ) {
      return false;
    }
    return true;
  },
  generateUpdateSqlStr: (id, fstName, lstName, bthDate, isAct) => {
    let valuesStr = '';

    valuesStr = general.addParameterToStr(fstName, 'firstName', valuesStr);
    valuesStr = general.addParameterToStr(lstName, 'lastName', valuesStr);
    valuesStr = general.addParameterToStr(bthDate, 'dateOfBirth', valuesStr);

    if (isAct != null && isAct == true) {
      valuesStr = general.addComaAtTheEnd(valuesStr);
      valuesStr += `isActive = '1', deactivationDateTime = NULL`;
    } else if (isAct != null && isAct == false) {
      valuesStr = general.addComaAtTheEnd(valuesStr);
      valuesStr += `isActive = '0', deactivationDateTime = NOW()`;
    }
    const res = `UPDATE users SET ${valuesStr} WHERE userId = ${id}`;

    return res;
  },
  addParameterToStr: (param, paramName, str) => {
    if (param != null) {
      str = general.addComaAtTheEnd(str);
      str += `${paramName} = '${param}'`;
    }
    return str;
  },
  addComaAtTheEnd: (str) => {
    if (str.length > 0) {
      str += ', ';
    }

    return str;
  },
};
