import { Button } from "antd";
import React from "react";
import { IEntitiy } from "../../models/products/type";

type propsType = {
  pagingHandler: (
    type: IEntitiy.PagingType.PREVIOUS | IEntitiy.PagingType.NEXT
  ) => void;
  params: IEntitiy.ParamsType;
  hasNextPage: boolean;
};

const Pagination = (props: propsType) => {
  const { pagingHandler, params, hasNextPage } = props;
  return (
    <div className="flex justify-center w-[100%]">
      <Button
        onClick={() => pagingHandler(IEntitiy.PagingType.PREVIOUS)}
        disabled={params.offset === 0 ? true : false}
        className="mr-3"
      >
        Previous page
      </Button>
      <Button
        onClick={() => pagingHandler(IEntitiy.PagingType.NEXT)}
        disabled={hasNextPage}
      >
        Next page
      </Button>
    </div>
  );
};

export default Pagination;
