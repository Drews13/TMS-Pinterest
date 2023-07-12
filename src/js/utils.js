import { className } from "./textConstants.js";

export function debounce(callback, timeout) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, timeout)
  };
}

export function showPreloader() {
  let preloader = document.querySelector('.' + className.preloaderWrapper);
  preloader.style.display = "block";
}

export function hidePreloader(timeout) {
  let preloader = document.querySelector('.' + className.preloaderWrapper);
  setTimeout(()=> preloader.style.display = "none", timeout);
}