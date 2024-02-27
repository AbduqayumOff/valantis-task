import { Card, Col } from "antd";
import React from "react";
import { IEntitiy } from "../../models/products/type";

type propsType = {
  item: IEntitiy.Product;
};

const Product = (props: propsType) => {
  const { item } = props;
  return (
    <Col span={12} className="flex justify-center mb-5">
      <Card title={item.id} bordered={true} className="w-[100%] shadow-md mr-5">
        <p>
          <b>Name:</b> {item.product}
        </p>
        <p>
          <b>Price:</b> {item.price}
        </p>
        <p>
          <b>Brand:</b> {item.brand}
        </p>
      </Card>
    </Col>
  );
};

export default Product;
