function isNull (object) {
  if (object === null) return true;
  return false;
}

function isUndefined (object) {
  if (typeof (object) === typeof (undefined)) return true;
  return false;
}

exports.isEmpty = function (object) {
  if (isNull(object) || isUndefined(object)) return true;
  return false;
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
  const dateFormat = /\d{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/gm;
  if (isString (object)) {
    //Stop if the string is not in YYYY-MM-DD or fails a simple date check (e.g. MM > 12, DD > 31)
    if (isNull(dateFormat.exec(object))) {
      return false;
    } 
    return true;
  }
  return false;
}

exports.isNull = isNull;
exports.isUndefined = isUndefined;
exports.isString = isString;