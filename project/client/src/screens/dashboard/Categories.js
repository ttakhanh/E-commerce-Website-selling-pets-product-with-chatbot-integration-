import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../components/ScreenHeader';
import Wrapper from './Wrapper';
import { clearMessage, setSuccess } from '../../store/reducers/globalReducer';
import {
  useGetQuery,
  useDeleteCategoryMutation,
} from '../../store/services/categoryService';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';

const Categories = () => {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const { success } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const { data = [], isFetching } = useGetQuery(page ? page : 1);
  const [removeCategory, response] = useDeleteCategoryMutation();
  console.log(data);

  const deleteCat = (id) => {
    if (window.confirm('Are you really want to delete the category?')) {
      removeCategory(id);
    }
  };

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(setSuccess(response?.data?.message));
    }
  }, [response?.data?.message]);

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, []);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/create-category" className="btn btn-danger">
          Thêm sản phẩm <i className="bi bi-plus"></i>
        </Link>
      </ScreenHeader>
      {success && <div className="alert-success">{success}</div>}
      {!isFetching ? (
        data?.categories?.length > 0 && (
          <>
            <div>
              <table className="w-full bg-white rounded-md">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="p-3 uppercase text-sm font-medium text-black">
                      loại sản phẩm
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
                  {data?.categories?.map((category) => (
                    <tr key={category._id} className="odd:bg-gray-100">
                      <td className="p-3 capitalize text-sm font-normal text-black">
                        {category.name}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-black">
                        <Link
                          to={`/dashboard/update-category/${category._id}`}
                          className="btn btn-warning"
                        >
                          Chỉnh sửa
                        </Link>
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteCat(category._id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path="dashboard/categories"
            />
          </>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Categories;
