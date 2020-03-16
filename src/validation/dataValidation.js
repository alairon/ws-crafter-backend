function isNull (object) {
  if (object === null) return true;
  return false;
}

function isUndefined (object) {
  if (typeof (object) === typeof (undefined)) return true;
  return false;
}

function isEmpty (object) {
  if (isNull(object) || isUndefined(object)) return true;
  return false;
}

function getYear (dateString) {
  const yearRegex = /^\d{4}/gm;
  const yearString = dateString.match(yearRegex);

  if(!(isNull(yearString))) {
    return parseInt(yearString);
  } 

  return null;
}

function getMonth (dateString) {
  const monthRegex = /-(0[1-9]|1[012])-/gm;
  const monthString = dateString.match(monthRegex);

  if (!(isNull(monthString))) {
    return (parseInt(monthString) * (-1)); //Lazy removal of the dash after casting
  }
}

function getDay (dateString) {
  const dayRegex = /\d{2}$/gm;
  const dayString = dateString.match(dayRegex);

  if (!(isNull(dayString))) {
    return parseInt(dayString);
  }

  return null;
}

function isLeapYear (year) {
  if ((year % 4) != 0) {
    return false;
  }
  else if (year % 100 == 0) {
    if (year % 400 != 0) {
      return false;
    }
  }
  return true;
}

exports.isObject = function (object) {
  if (typeof (object) === typeof ({})) return true;
  return false;
}

exports.isNumber = function (object) {
  if (isNaN(object) === true) return false;
  if (typeof (object) === typeof (2)) return true;
  return false;
}

exports.isBoolean = function (object) {
  if (typeof (object) === typeof (true)) return true;
  return false;
}

function isString (object) {
  if (typeof (object) === typeof ('string')) return true;
  return false;
}

exports.isValidDate = function (object) {
  const dateFormat = /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01]))$/gm;
  const thirtyDays = [4, 6, 9, 11];

  if (isEmpty (object)) {
    return false;
  }

  if (isString (object)) {
    //Stop if the string is not in YYYY-MM-DD or fails a simple date check (e.g. MM > 12, DD > 31)
    if (isNull(dateFormat.exec(object))) {
      return false;
    } 
    const year = getYear(object);
    const month = getMonth(object)
    const day = getDay(object);
    //Check if the year is a leap year, skip if it is not February
    if (month == 2) {
      if (isLeapYear(year)) {
        if (day < 30) return true;
      }
      else {
        if (day > 28) return false;
      }
    }
    //Check if the month is Apr, Jun, Sept or Nov and has 31 days assigned
    else if (thirtyDays.includes(month)) {
      if (day > 30) return false;
    }
    else {
      return true;
    }
  }
  return false;
}

exports.isNull = isNull;
exports.isUndefined = isUndefined;
exports.isEmpty = isEmpty;
exports.isString = isString;