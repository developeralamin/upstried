class Api {
  static isResponseSuccess = (status: number) => {
    if (!status) return;
    return status >= 200 || status < 300 ? true : false;
  };

  mapEndpoint = (endpoint: string, value: any, needle: string) => {
    return endpoint.replace(needle, value);
  };
}

export default Api;
