import { updateData } from "./loadPictures.js";
import addHandlers from "./addHandlers.js";
import { getName, setName } from "./localStorrage.js";
import { className, HTMLText, localStorageNames, imgAlt } from "./textConstants.js";

export function reloadPage() {
  setName(localStorageNames.currDesk, null);
  location.reload();
}

Object.freeze(className);
Object.freeze(HTMLText);
Object.freeze(localStorageNames);
Object.freeze(imgAlt);

addHandlers();
getName(localStorageNames.currDesk);
updateData();