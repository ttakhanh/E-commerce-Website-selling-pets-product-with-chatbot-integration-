import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import currency from 'currency-formatter';
import Nav from '../../components/home/Nav';
import Header from '../../components/home/Header';
import AccountList from '../../components/home/AccountList';
import Spinner from '../../components/Spinner';
import {
  useGetOrdersQuery,
  useReceivedOrderMutation,
} from '../../store/services/userOrdersService';
import { discount } from '../../utils/discount';
import Pagination from '../../components/Pagination';

const UserOrders = () => {
  let { page } = useParams();
  page = page ? page : 1;
  const { user } = useSelector((state) => state.authReducer);
  const { data, isFetching } = useGetOrdersQuery({ page, userId: user.id });
  const [updateOrder, response] = useReceivedOrderMutation();
  const orderReceived = (id) => {
    updateOrder(id);
  };
  return (
    <>
      <Nav />
      <div className="mt-[70px]">
        <Header>Đơn mua</Header>
        <div className="my-container mt-[40px]">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full md:w-4/12 p-6">
              <AccountList />
            </div>
            <div className="w-full md:w-8/12 p-6">
              <h1 className="heading mb-6">Đặt hàng</h1>
              {!isFetching ? (
                data?.orders?.length > 0 ? (
                  <>
                    <div className="table-container border">
                      <table className="w-full">
                        <thead>
                          <tr className="thead-tr">
                            <th className="th">Hình ảnh</th>
                            <th className="th">Tên sản phẩm</th>
                            <th className="th">Tổng</th>
                            <th className="th">Chi tiết</th>
                            <th className="th">Đã nhận</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.orders.map((item) => {
                            const total = currency.format(
                              discount(
                                item.productId.price,
                                item.productId.discount
                              ) * item.quantities,
                              {
                                code: 'VND',
                              }
                            );
                            return (
                              <tr className="even:bg-gray-50" key={item._id}>
                                <td className="td">
                                  <img
                                    src={`/images/${item.productId.image1}`}
                                    alt={item.productId.title}
                                    className="w-12 h-12 object-cover rounded-full"
                                  />
                                </td>
                                <td className=" td font-medium">
                                  {item.productId.title}
                                </td>
                                <td className="td font-bold ">{total}</td>
                                <td className="td">
                                  <Link
                                    to={`/user-order-details/${item._id}`}
                                    className="btn btn-indigo"
                                  >
                                    Chi tiết
                                  </Link>
                                </td>
                                <td className="td">
                                  {item.status ? (
                                    item.received ? (
                                      <span className="capitalize font-medium text-emerald-600">
                                        Đã nhận
                                      </span>
                                    ) : (
                                      <button
                                        className="btn btn-indigo"
                                        onClick={() => orderReceived(item._id)}
                                      >
                                        Đã nhận ?
                                      </button>
                                    )
                                  ) : (
                                    <span className="capitalize font-medium text-rose-600">
                                      Trong quá trình xử lý
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <Pagination
                      page={parseInt(page)}
                      perPage={data.perPage}
                      count={data.count}
                      path={`orders`}
                      theme="light"
                    />
                  </>
                ) : (
                  <div className="bg-indigo-50 border border-indigo-100 rounded px-4 py-2.5 capitalize text-indigo-900 text-sm font-medium">
                    Không có đơn
                  </div>
                )
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrders;
