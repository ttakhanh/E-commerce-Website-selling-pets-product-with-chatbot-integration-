import { useState, useEffect } from 'react';
import { useAuthLoginMutation } from '../../store/services/authService';
import { setAdminToken } from '../../store/reducers/authReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [login, response] = useAuthLoginMutation();
  console.log('my response', response);
  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];

  const adminLoginFunction = (e) => {
    e.preventDefault();
    login(state);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem('admin-token', response?.data?.token);
      dispatch(setAdminToken(response?.data?.token));
      navigate('/dashboard/products');
    }
  }, [response.isSuccess]);

  return (
    <div className="bg-neutral-300 h-screen flex justify-center items-center">
      <form
        className="bg-white p-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-3/12 rounded"
        onSubmit={adminLoginFunction}
      >
        <h3 className="mb-4 text-black capitalize font-semibold text-lg">
          Đăng nhập
        </h3>

        {errors.length > 0 &&
          errors.map((error, key) => (
            <div key={key}>
              <p className="bg-red-100 text-red-700 p-3 mb-2 rounded-sm text-sm font-medium">
                {error.msg}
              </p>
            </div>
          ))}

        <div className="mb-4 mt-4">
          <input
            type="email"
            name="email"
            className="w-full bg-slate-50 p-4 rounded outline-none text-black"
            placeholder="Nhập email..."
            onChange={handleInputs}
            value={state.email}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            className="w-full bg-slate-50 p-4 rounded outline-none text-black"
            placeholder="Nhập mật khẩu..."
            onChange={handleInputs}
            value={state.password}
          />
        </div>
        <div>
          <input
            type="submit"
            value={response.isLoading ? 'Loading...' : 'sign in'}
            className="bg-indigo-600 w-full p-4 rounded text-white uppercase font-semibold cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
