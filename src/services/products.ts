import { base } from "./axios";

const getProductsById = async (id: number) => {
  try {
    const res = await base.get(`/products/${id}`);
    return [null, res.data];
  } catch (error) {
    return [[error.response?.data], null];
  }
};

const editProduct = async (data: any) => {
  try {
    const res = await base.put("/products/edit", data);
    return [null, res.data];
  } catch (error) {
    return [[error.response?.data], null];
  }
};

const filterProducts = async (data: any) => {
  try {
    console.log("hello");
    const res = await base.post("/products/filter", data);
    return [null, res.data];
  } catch (error) {
    return [[error.response?.data], null];
  }
};

export { getProductsById, editProduct, filterProducts };
