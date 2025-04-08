import Nav from '../../components/home/Nav';
import { useParams } from 'react-router-dom';
import Header from '../../components/home/Header';
import { useCatProductsQuery } from '../../store/services/homeProducts';
import ProductCard from '../../components/home/ProductCard';
import Pagination from '../../components/Pagination';
import ProductSkeleton from '../../components/home/ProductSkeleton';
// import Skeleton from '../../components/skeleton/Skeleton';
// import Thumbnail from '../../components/skeleton/Thumbnail';
// import Text from '../../components/skeleton/Text';
// import currency from 'currency-formatter';

const CatProducts = () => {
  const { name, page = 1 } = useParams();
  const { data, isFetching } = useCatProductsQuery({
    name,
    page: parseInt(page),
  });
  return (
    <>
      <Nav />
      <div className="mt-[70px]">
        <Header>{name}</Header>
      </div>
      <div className="my-container my-10">
        {isFetching ? (
          <ProductSkeleton />
        ) : data.count > 0 ? (
          <>
            <p className="text-base font-medium text-gray-700">
              {data.count} sản phẩm được tìm thấy với loại sản phẩm {name}
            </p>
            <div className="flex flex-wrap -mx-5">
              {data.products.map((product) => {
                return <ProductCard product={product} key={product._id} />;
              })}
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path={`cat-products/${name}`}
              theme="light"
            />
          </>
        ) : (
          <div>Không tìm thấy sản phẩm {name}</div>
        )}
      </div>
    </>
  );
};

export default CatProducts;
