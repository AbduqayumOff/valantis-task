import instance from "../configs/axios";
import { FILTER, GET_IDS, GET_ITEMS } from "../constants";
import { IEntitiy } from "../models/products/type";

const ProductService = {
  async getIds(params: IEntitiy.ParamsType) {
    const requestBody = {
      action: GET_IDS,
      params: {
        offset: params.offset,
        limit: params.limit,
      },
    };
    return instance({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(requestBody),
    });
  },
  async getProductsByIds(ids: IEntitiy.ProductIds[]) {
    const requestBody = {
      action: GET_ITEMS,
      params: {
        ids: ids,
      },
    };

    return instance({
      method: "POST",
      data: requestBody,
    });
  },
  async getProductsByFiltersValue(params: IEntitiy.FiltersType) {
    const requestBody = {
      action: FILTER,
      params,
    };

    return instance({
      method: "POST",
      data: requestBody,
    });
  },
};

export default ProductService;
