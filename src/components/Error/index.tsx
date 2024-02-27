import { Button, Col, Result } from "antd";
import React from "react";
import { IEntitiy } from "../../models/products/type";

type propsType = {
  error: string | null;
  getProductIds: () => {};
  getProductsByIds: (ids: IEntitiy.ProductIds[]) => {};
  filters: IEntitiy.FiltersType;
  filteredProductsIds: IEntitiy.ProductIds[];
};

const Error = (props: propsType) => {
  const {
    error,
    filters,
    filteredProductsIds,
    getProductIds,
    getProductsByIds,
  } = props;
  return (
    <Col className="flex justify-center items-center" span={24}>
      <Result
        status="warning"
        title={error}
        extra={
          <Button
            type="primary"
            onClick={() =>
              filters.brand || filters.price || filters.product
                ? getProductsByIds(filteredProductsIds)
                : getProductIds
            }
          >
            Retry
          </Button>
        }
      />
    </Col>
  );
};

export default Error;
