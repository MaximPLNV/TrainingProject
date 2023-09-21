module.exports = {
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

    valuesStr = addParameterToStr(fstName, 'firstName', valuesStr);
    valuesStr = addParameterToStr(lstName, 'lastName', valuesStr);
    valuesStr = addParameterToStr(bthDate, 'birthDate', valuesStr);

    if (isAct != null && isAct == true) {
      valuesStr += addComaAtTheEnd(valuesStr);
      valuesStr += `isActive = '${isAct}', deactivationDateTime = NULL`;
    } else if (isAct != null && isAct == false) {
      valuesStr += addComaAtTheEnd(valuesStr);
      valuesStr += `isActive = '${isAct}', deactivationDateTime = NOW()`;
    }

    const res = `UPDATE users SET ${valuesStr} WHERE userId = ${id}`;

    return res;
  },
  addParameterToStr: (param, paramName, str) => {
    if (param != null) {
      str += addComaAtTheEnd(str);
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
