export function getName(name) {
  if (!localStorage.getItem(name)) {
    name === "currDesk" ? setName(name, null) : setName(name, []);
  }
  return JSON.parse(localStorage.getItem(name));
}

export function setName(name, obj) {
  localStorage.setItem(name, JSON.stringify(obj));  
}

export function getFromStorrage(name, id) {
  let items = getName(name);
  return items.find(el => el.id == id);
}

export function addToStorrage(name, obj) {
  let items = getName(name);
  let item = items.find(item => item.id == obj.id);
  if (!item) {
    items.push(obj);
    setName(name, items);
  }
}

export function deleteFromStorrage(name, id) {
  let items = getName(name);
  let ind = items.findIndex(item => item.id == id);
  items.splice(ind, 1);
  setName(name, items);
}