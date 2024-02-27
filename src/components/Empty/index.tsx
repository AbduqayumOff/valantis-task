import { Col, Empty as EmptyAntd } from "antd";
import React from "react";

type propsType = {
  description: string;
};

const Empty = (props: propsType) => {
  const { description } = props;

  return (
    <Col className="flex justify-center items-center" span={24}>
      <EmptyAntd description={description} />;
    </Col>
  );
};

export default Empty;
