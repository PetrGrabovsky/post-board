const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const getUrl = () => {
  const url = new URL(API_URL);
  url.searchParams.append('_sort', '-publishedAt');

  return url;
};
