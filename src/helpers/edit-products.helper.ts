export const editProducts = (products: any[]) => {
  const data = products.map((product: any) => {
    return {
      kidzieId: product.kidzie_id,
      key: product.kidzie_id,
      details: {
        imageUrl: product.image_url,
        brand: product.brand,
        description: product.description,
      },
      onSale: product.on_sale,
      saleStarts: product.sale_starts,
      saleEnds: product.sale_ends,
      salePercentage: product.sale_percentage,
    };
  });

  return data;
};
