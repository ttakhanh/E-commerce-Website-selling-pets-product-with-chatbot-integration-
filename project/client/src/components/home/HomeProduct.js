import { Link } from 'react-router-dom';
import { useCatProductsQuery } from '../../store/services/homeProducts';
import ProductSkeleton from './ProductSkeleton';
import ProductCard from './ProductCard';

const HomeProduct = ({ category }) => {
  const { data, isFetching } = useCatProductsQuery({
    name: category.name,
    page: '',
  });
  return isFetching ? (
    <ProductSkeleton />
  ) : (
    data?.products?.length > 0 && (
      <>
        <div className="flex justify-between">
          <span className="w-5/6 bg-gradient-to-r from-blue-500 ... text-lg font-bold text-white uppercase">
            {category.name}
          </span>
          <span className="w-1/6 normal-case">
            <Link to={`/cat-products/${category.name}`}>Xem thêm</Link>
          </span>
        </div>
        <div className="flex flex-wrap -mx-5">
          {data?.products.map((item) => (
            <ProductCard product={item} key={item._id} />
          ))}
        </div>
      </>
    )
  );
};

export default HomeProduct;
