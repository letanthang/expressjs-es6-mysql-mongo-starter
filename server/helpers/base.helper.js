export const bindingObjectFromArray = (objSource, data, keys) => {
  if (data instanceof Object) {
    keys.forEach((prop) => {
      if (Object.prototype.hasOwnProperty.call(data, prop)) {
        objSource[prop] = data[prop];
      }
    });
  }
  return objSource;
};
export const deleteAttributeInObject = (objSource, keys) => {
  if (objSource instanceof Object) {
    keys.forEach((prop) => {
      if (Object.prototype.hasOwnProperty.call(objSource, prop)) {
        delete objSource[prop];
      }
    });
  }
  return objSource;
};
