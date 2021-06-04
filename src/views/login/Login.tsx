import UserForm from '@Components/UserForm';
import Auth from '@Services/auth';

const Login = () => {
  return (
    <div className=" w-full h-full bg-red-600">
      <UserForm mutation={Auth.loginUser} typeForm="login" />
    </div>
  );
};

export default Login;
