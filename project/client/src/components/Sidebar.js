import { Link } from 'react-router-dom';
const Sidebar = ({ side, closeSidebar }) => {
  return (
    <div
      className={`fixed top-0 ${side} sm:left-0 w-64 h-screen bg-white z-10 transition-all`}
    >
      <i
        className="bi bi-x-lg absolute top-4 right-4 sm:hidden block cursor-pointer text-lg"
        onClick={closeSidebar}
      ></i>
      <div className="bg-white p-4">
        <img src="/logoweb3b.jpg" alt="logo" />
      </div>
      <ul>
        <li className="px-4 cursor-pointer transition-all py-3 text-black flex items-center hover:bg-gray-200">
          <i class="bi bi-card-list mr-2 inline-block text-lg"></i>
          <Link to="/dashboard/products" className="text-base capitalize">
            Sản phẩm
          </Link>
        </li>

        <li className="px-4 cursor-pointer transition-all py-3 text-black flex items-center hover:bg-gray-200">
          <i className="bi bi-bag-check mr-2 inline-block text-lg"></i>{' '}
          <Link to="/dashboard/orders" className="text-base capitalize">
            Đặt hàng
          </Link>
        </li>

        <li className="px-4 cursor-pointer transition-all py-3 text-black flex items-center hover:bg-gray-200">
          <i className="bi bi-people-fill mr-2 inline-block text-lg"></i>{' '}
          <Link to="/dashboard/products" className="text-base capitalize">
            Thông tin khách hàng
          </Link>
        </li>

        <li className="px-4 cursor-pointer transition-all py-3 text-black flex items-center hover:bg-gray-200">
          <i className="bi bi-bar-chart mr-2 inline-block text-lg"></i>{' '}
          <Link to="/dashboard/categories" className="text-base capitalize">
            Loại sản phẩm
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
