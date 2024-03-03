const save = (name: string, item: any) => {
  try {
    const serializedItem = JSON.stringify(item);
    localStorage.setItem(name, serializedItem);
  } catch (error) {
    console.error(error);
  }
};
const get = (name: string) => {
  try {
    const serializedItem = localStorage.getItem(name);
    if (serializedItem === null) {
      return undefined;
    }
    return JSON.parse(serializedItem);
  } catch (error) {
    console.error(error);
  }
};

export default {
  save,
  get
}