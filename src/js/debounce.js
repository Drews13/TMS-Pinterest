export function debounce(callback) {
    let timeout;
    return function (arg) {
      clearTimeout(timeout);
      timeout = setTimeout(callback, 300, arg);
    };
  }