export const getProductId = (products: any[]) => {
  const data = products.map(({ kidzieId }: any, index: number) => {
    return kidzieId;
  });

  return data;
};
