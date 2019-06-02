export default {
  createQueryParameterString(params: {[key: string]: string}) {
    return Object.keys(params)
      .map((key: string) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&');
  },

  async fetchJson(url: string): Promise<any> {
    return await fetch(url)
      .then((response: Response) => response.json());
  }
};
