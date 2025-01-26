const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const getUrl = (searchParameters?: string) => {
  const url = new URL(API_URL);

  if (searchParameters) {
    url.searchParams.append('q', searchParameters);
  }

  url.searchParams.append('_sort', 'publishedAt');
  url.searchParams.append('_order', 'desc');

  return url;
};
