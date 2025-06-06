import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import currency from 'currency-formatter';
import { BsTrash } from 'react-icons/bs';
import { motion } from 'framer-motion';
import Nav from '../../components/home/Nav';
import { discount } from '../../utils/discount';
import Quantity from '../../components/home/Quantity';
import {
  incQuantity,
  decQuantity,
  removeItem,
} from '../../store/reducers/cartReducer';
import { Link } from 'react-router-dom';
import { useSendPaymentMutation } from '../../store/services/paymentService';

const Cart = () => {
  const { cart, total } = useSelector((state) => state.cartReducer);
  const { userToken, user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const inc = (id) => {
    dispatch(incQuantity(id));
  };
  const dec = (id) => {
    dispatch(decQuantity(id));
  };
  const remove = (id) => {
    // verify user that you are really want to delete the project or item
    if (
      window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')
    ) {
      dispatch(removeItem(id));
    }
  };

  const navigate = useNavigate();
  const [doPayment, response] = useSendPaymentMutation();

  console.log('payment response', response);
  console.log(user);

  const pay = () => {
    if (userToken) {
      doPayment({ cart, id: user.id });
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (response?.isSuccess) {
      window.location.href = response?.data?.url;
    }
  }, [response]);

  return (
    <>
      <Nav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="my-container mt-28"
      >
        {cart.length > 0 ? (
          <>
            <div className="table-container">
              <table className="w-full">
                <thead>
                  <tr className="thead-tr">
                    <th className="th">Hình ảnh</th>
                    <th className="th">Tên sản phẩm</th>
                    <th className="th">Màu sắc</th>
                    <th className="th">Kích cỡ</th>
                    <th className="th">Giá tiền</th>
                    <th className="th">Số lượng</th>
                    <th className="th">Tổng tiền</th>
                    <th className="th">Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const total = currency.format(
                      discount(item.price, item.discount) * item.quantity,
                      {
                        code: 'VND',
                      }
                    );
                    return (
                      <tr className="even:bg-gray-50" key={item._id}>
                        <td className="td">
                          <img
                            src={`/images/${item.image1}`}
                            alt={item.title}
                            className="w-12 h-12 object-cover"
                          />
                        </td>
                        <td className=" td font-medium">{item.title}</td>
                        <td className="td">
                          <span
                            className="block w-[15px] h-[15px] rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></span>
                        </td>
                        <td className="td">
                          <span className="font-semibold">{item.size}</span>
                        </td>
                        <td className="td font-bold text-gray-900">
                          {currency.format(
                            discount(item.price, item.discount),
                            {
                              code: 'VND',
                            }
                          )}
                        </td>
                        <td className="td">
                          <Quantity
                            quantity={item.quantity}
                            inc={() => inc(item._id)}
                            dec={() => dec(item._id)}
                            theme="indigo"
                          />
                        </td>
                        <td className="td font-bold ">{total}</td>
                        <td className="td">
                          <span
                            className="cursor-pointer"
                            onClick={() => remove(item._id)}
                          >
                            <BsTrash className="text-rose-600" size={20} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-indigo-50 p-4 flex justify-end mt-5 rounded-md">
              <div>
                <span className="text-lg font-semibold text-indigo-800 mr-10">
                  {currency.format(total, { code: 'VND' })}
                </span>
                <button
                  className="btn bg-indigo-600 text-sm font-medium py-2.5"
                  onClick={pay}
                >
                  {response.isLoading ? 'Loading...' : 'Thanh toán'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-md text-sm font-medium text-indigo-800">
            Giỏ hàng rỗng!
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Cart;
