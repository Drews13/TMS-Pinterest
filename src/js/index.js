import { getPictures } from "./loadPictures.js";
import addHandlers from "./addHandlers.js";
import { setName } from "./localStorrage.js";

addHandlers();
setName("currDesk", null);
getPictures();