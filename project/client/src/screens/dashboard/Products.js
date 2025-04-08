import { useEffect } from 'react';
import Wrapper from './Wrapper';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { clearMessage } from '../../store/reducers/globalReducer';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from '../../store/services/productService';
import ScreenHeader from '../../components/ScreenHeader';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';

const Products = () => {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const { data = [], isFetching } = useGetProductsQuery(page);
  console.log(data);
  const { success } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    return () => {
      dispatch(clearMessage());
    };
  }, []);

  const [delProduct, response] = useDeleteProductMutation();

  const deleteProduct = (id) => {
    if (window.confirm('Bạn có muốn xóa đi sảm phẩm này?')) {
      delProduct(id);
    }
  };

  return (
    <>
      <Wrapper>
        <ScreenHeader>
          <Link
            to="/dashboard/create-product"
            className="btn btn-danger"
            role="button"
          >
            Tạo sản phẩm <i class="bi bi-plus-circle"> </i>
          </Link>
          <Toaster position="top-right" />
        </ScreenHeader>
        {!isFetching ? (
          data?.products?.length > 0 ? (
            <div>
              <table className="w-full bg-white rounded-md">
                <thead>
                  <tr className="border-b border-white text-left">
                    <th className="p-3 uppercase text-sm font-medium text-black">
                      Tên sản phẩm
                    </th>
                    <th className="p-3 uppercase text-sm font-medium text-black">
                      Giá
                    </th>
                    <th className="p-3 uppercase text-sm font-medium text-black">
                      Kho
                    </th>
                    <th className="p-3 uppercase text-sm font-medium text-black">
                      Hình ảnh
                    </th>
                    <th className="p-3 uppercase text-sm font-medium text-black">
                      Chỉnh sửa
                    </th>
                    <th className="p-3 uppercase text-sm font-medium text-black">
                      Xóa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products?.map((product) => (
                    <tr className="odd:bg-gray-100" key={product._id}>
                      <td className="p-3 capitalize text-sm font-normal text-black">
                        {product.title}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-black">
                        {product.price}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-black">
                        {product.stock}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-black">
                        <img
                          src={`/images/${product.image1}`}
                          alt="Tên của hình ảnh"
                          className="w-20 h-20 rounded-md object-cover"
                        />
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <Link
                          to={`/dashboard/edit-product/${product._id}`}
                          className="btn btn-warning"
                        >
                          Chỉnh sửa
                        </Link>
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <span
                          className="btn btn-danger cursor-pointer"
                          onClick={() => deleteProduct(product._id)}
                        >
                          Xóa
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                page={parseInt(page)}
                perPage={data.perPage}
                count={data.count}
                path="dashboard/products"
              />
            </div>
          ) : (
            'No products!'
          )
        ) : (
          <Spinner />
        )}
      </Wrapper>
    </>
  );
};

export default Products;
