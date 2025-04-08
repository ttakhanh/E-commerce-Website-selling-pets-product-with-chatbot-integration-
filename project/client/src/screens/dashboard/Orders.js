import { useParams, Link } from 'react-router-dom';
import ScreenHeader from '../../components/ScreenHeader';
import Wrapper from './Wrapper';
import { useGetOrdersQuery } from '../../store/services/orderService';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';

const Orders = () => {
  let { page } = useParams();
  page = page ? page : 1;
  const { data, isFetching } = useGetOrdersQuery(page);
  console.log(data);

  return (
    <Wrapper>
      <ScreenHeader>Đặt hàng</ScreenHeader>
      {!isFetching ? (
        data?.orders?.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table
                className="table-fixed bg-white rounded-md"
                style={{ width: '1150px' }}
              >
                <thead>
                  <tr className="dashboard-tr">
                    <th className="dashboard-th">Tên sản phẩm</th>
                    <th className="dashboard-th">Số lượng</th>
                    <th className="dashboard-th">Hình ảnh</th>
                    <th className="dashboard-th">Trạng thái</th>
                    <th className="dashboard-th">Giao hàng</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.orders?.map((order) => (
                    <tr key={order._id}>
                      <td className="dashboard-td">{order.productId.title}</td>
                      <td className="dashboard-td text-center">
                        {order.quantities}
                      </td>
                      <td className="dashboard-td">
                        <img
                          src={`/images/${order.productId.image1}`}
                          alt="Hình ảnh"
                          className=""
                        />
                      </td>
                      <td className="dashboard-td text-center">
                        {order.received
                          ? 'Đã nhận hàng'
                          : 'Chưa nhận được hàng'}
                      </td>
                      <td className="dashboard-td text-center">
                        {order.status
                          ? 'Đang trên đường vận chuyển'
                          : 'Chưa vận chuyển'}
                      </td>
                      <td className="dashboard-td">
                        <Link
                          to={`/dashboard/order-details/${order._id}`}
                          className="btn bg-indigo-600 text-xs font-bold "
                        >
                          Chi tiết
                        </Link>
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
              path="dashboard/orders"
            />
          </>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Orders;
