const save = (name: string, item: any) => {
  try {
    sessionStorage.setItem(name, JSON.stringify(item));
  } catch (error) {
    console.error(error);
  }
};
const get = (name: string) => {
  try {
    const serializedItem = sessionStorage.getItem(name);
    if (serializedItem === null) {
      return undefined;
    }
    return JSON.parse(serializedItem);
  } catch (error) {
    console.error(error);
  }
};

const remove = (name: string) => {
  try {
    sessionStorage.removeItem(name);
  } catch (error) {
    console.error(error);
  }
}

export default {
  save,
  get,
  remove
}