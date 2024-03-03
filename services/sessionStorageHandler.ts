class SessionStorageHandler {
  save = (item: any, name: string) => {
    try {
      const serializedItem = JSON.stringify(item);
      sessionStorage.setItem(name, serializedItem);
    } catch (error) {
      console.error(error);
    }
  };
  get = (name: string) => {
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
}

export default new SessionStorageHandler();
