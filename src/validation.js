exports.isNull = function (object) {
  if (object === null) return true;
  return false;
}

exports.isUndefined = function (object) {
  if (typeof (object) === typeof (undefined)) return true;
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

exports.isString = function (object) {
  if (typeof (object) === typeof ('string')) return true;
  return false;
}
