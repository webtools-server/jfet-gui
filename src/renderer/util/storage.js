/**
 * storage
 */

let storage = {};

function getItem(key) {
  return key in storage ? storage[key] : null;
}

function setItem(key, value) {
  storage[key] = value;
  return true;
}

function removeItem(key) {
  const found = key in storage;
  if (found) {
    return delete storage[key];
  }
  return false;
}

function clear() {
  storage = {};
  return true;
}

export default {
  getItem,
  setItem,
  removeItem,
  clear
};
