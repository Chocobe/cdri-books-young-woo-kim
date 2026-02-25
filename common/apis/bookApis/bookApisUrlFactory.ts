const bookApisUrlFactory = (function () {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/book`;

  return {
    retrieveBooksApi() {
      return `${BASE_URL}` as const;
    },
  };
}());

export default bookApisUrlFactory;
