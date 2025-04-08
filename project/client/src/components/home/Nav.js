import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { BsCart } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Search from './Search';
import { IoHome } from 'react-icons/io5';
import { toggleSearchBar } from '../../store/reducers/globalReducer';

const Nav = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);
  const { searchBar } = useSelector((state) => state.globalReducer);
  const { items, total } = useSelector((state) => state.cartReducer);
  // const total = useSelector((state) => state.cartReducer);
  //console.log(total);
  const dispatch = useDispatch();

  return (
    <>
      <nav className="nav">
        <div className="my-container">
          <div className="flex justify-between items-center">
            <Link to="/">
              <img
                src="/logoweb3b.jpg"
                className="h-full object-cover"
                alt="logo"
              />
            </Link>

            <ul className="flex items-center">
              <li className="nav-li">
                <Link
                  to="/"
                  className="block text-lg py-2 px-3 text-gray-900 uppercase rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <IoHome />
                </Link>
              </li>

              <li className="nav-li">
                <Link
                  to="/service"
                  className="block py-2 px-3 text-gray-900 uppercase rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Dịch vụ
                </Link>
              </li>

              <li className="nav-li">
                <Link
                  to="/knowlege"
                  className="block py-2 px-3 text-gray-900 uppercase rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Kiến thức
                </Link>
              </li>

              <li className="nav-li">
                <Link
                  to="/information"
                  className="block py-2 px-3 text-gray-900 uppercase rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Tin tức
                </Link>
              </li>

              <li className="nav-li">
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-gray-900 uppercase rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>

            <ul className="flex items-center">
              <li className="nav-li cursor-pointer">
                <FiSearch
                  size={22}
                  onClick={() => dispatch(toggleSearchBar())}
                />
              </li>

              {userToken ? (
                <li className="nav-li">
                  <Link to="/user" className="nav-link">
                    {user?.name}
                  </Link>
                </li>
              ) : (
                <li className="nav-li">
                  <button className="py-2 px-4 bg-cyan-400 text-white rounded-md capitalize">
                    <Link to="/login" className="nav-link">
                      Đăng nhập
                    </Link>
                  </button>
                </li>
              )}

              <li className="nav-li relative">
                <Link to="/cart">
                  <BsCart size={20} />
                  <span className="nav-circle">{items}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Search />
    </>
  );
};
export default Nav;
