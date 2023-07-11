import { getPictures } from "./loadPictures.js";
import addHandlers from "./addHandlers.js";
import { setName } from "./localStorrage.js";
import { className, HTMLText, localStorageNames, imgAlt } from "./textConstants.js";

Object.freeze(className);
Object.freeze(HTMLText);
Object.freeze(localStorageNames);
Object.freeze(imgAlt);

addHandlers();
setName(localStorageNames.currDesk, null);
getPictures();