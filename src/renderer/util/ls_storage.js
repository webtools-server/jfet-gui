/**
 * local_storage
 */

import storage from './storage';

const ls = 'localStorage' in global && global.localStorage ? global.localStorage : storage;

function accessor(key, value) {
  if (arguments.length === 1) {
    return get(key);
  }
  return set(key, value);
}

function get(key) {
  console.log(ls.getItem(key));
  return JSON.parse(ls.getItem(key));
}

function set(key, value) {
  try {
    ls.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

function remove(key) {
  return ls.removeItem(key);
}

function clear() {
  return ls.clear();
}

accessor.set = set;
accessor.get = get;
accessor.remove = remove;
accessor.clear = clear;

export default accessor;
