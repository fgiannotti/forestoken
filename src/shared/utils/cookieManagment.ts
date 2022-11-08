export const deleteCookie = (name: string, context = document) => {
  context.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 2050 00:00:01 GMT;';
};
