import { Button, Card, Col, Form, Input, Row } from "antd";
import { AxiosError } from "axios";
import { Fragment, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { IEntitiy } from "../../models/products/type";
import ProductService from "../../services/product";
import Error from "../../components/Error";
import Product from "../../components/Product";
import Empty from "../../components/Empty";
import Pagination from "../../components/Pagination";

const Home = () => {
  const [products, setProducts] = useState<IEntitiy.Product[]>([]);
  const [filteredProductsIds, setFilteredProductsIds] = useState<
    IEntitiy.ProductIds[]
  >([]);
  const [params, setParams] = useState<IEntitiy.ParamsType>({
    offset: 0,
    limit: 50,
  });
  const [filters, setFilters] = useState<IEntitiy.FiltersType>({
    brand: "",
    product: "",
    price: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [totalProductLenght, setTotalProductLenght] = useState(0);

  // Get product ids API
  const getProductIds = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await ProductService.getIds(params);
      const result: IEntitiy.ProductIds[] = res?.data?.result;
      setHasNextPage(result.length ? false : true);
      getProductsByIds(result);
      setTotalProductLenght(result.length);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setLoadingSearch(false);
      setError(`Failed on the get ids: ` + error.message);
      console.log("🚀 ~ useEffect ~ error:", error);
    }
  };

  // Get products by ids API
  const getProductsByIds = async (ids: IEntitiy.ProductIds[]) => {
    try {
      setError("");
      const res = await ProductService.getProductsByIds(ids);
      const result = res?.data?.result;
      const uniqueProducts: IEntitiy.Product[] = result.filter(
        (product: any, index: any, self: any) =>
          index === self.findIndex((p: any) => p.id === product.id)
      );
      setProducts(uniqueProducts);
      console.log("🚀 ~ getProductsByIds ~ uniqueProducts:", uniqueProducts);
    } catch (e: unknown) {
      const error = e as AxiosError;
      console.log("🚀 ~ getProductsByIds ~ error:", error);
      setError(`Failed on the get products: ` + error.message);
    } finally {
      setLoading(false);
      setLoadingSearch(false);
    }
  };

  useEffect(() => {
    // Get product ids API
    !filters.brand || !filters.price || !filters.product
      ? getProductIds()
      : getProductsByIds(filteredProductsIds);
  }, [params]);

  const onFinish = async (values: IEntitiy.FiltersType) => {
    setFilters(values);
    try {
      setLoadingSearch(true);
      const res = await ProductService.getProductsByFiltersValue(values);
      const result: IEntitiy.ProductIds[] = res?.data?.result;
      setFilteredProductsIds(result);
      setHasNextPage(result.length ? false : true);
      getProductsByIds(result);
      setTotalProductLenght(result.length);
      console.log("🚀 ~ onFinish ~ res:", res);
    } catch (e: unknown) {
      const error = e as AxiosError;
      console.log("🚀 ~ onFinish ~ error:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const pagingHandler = (
    type: IEntitiy.PagingType.PREVIOUS | IEntitiy.PagingType.NEXT
  ) => {
    setParams({
      ...params,
      offset:
        type === IEntitiy.PagingType.PREVIOUS
          ? (params.offset -= 50)
          : (params.offset += 50),
    });
  };

  return (
    <div className="w-[100%] h-[100vh]">
      <Form
        name="basic"
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="h-[100%]"
      >
        {/* Filter */}
        <Row className="justify-evenly py-5">
          <Col>
            <Form.Item<IEntitiy.FieldType>
              label="Please enter product name"
              name="product"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item<IEntitiy.FieldType>
              label="Please enter product price"
              name="price"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item<IEntitiy.FieldType>
              label="Please enter product brand"
              name="brand"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loadingSearch}>
                Search
              </Button>
            </Form.Item>
          </Col>
        </Row>

        {/* Total product length */}
        <h3>Product length: {totalProductLenght}</h3>

        {/* Products */}
        <Row className="px-5 h-[100%]">
          {loading ? (
            <Loader />
          ) : error ? (
            <Error
              error={error}
              getProductIds={getProductIds}
              getProductsByIds={getProductsByIds}
              filters={filters}
              filteredProductsIds={filteredProductsIds}
            />
          ) : products?.length ? (
            products.map((item) => <Product item={item} key={item.id} />)
          ) : (
            <Empty description="Product not found" />
          )}
          {/* Pagination */}
          {!error && !filters.brand && !filters.price && !filters.product && (
            <Pagination
              pagingHandler={pagingHandler}
              params={params}
              hasNextPage={hasNextPage}
            />
          )}
        </Row>
      </Form>
    </div>
  );
};

export default Home;
