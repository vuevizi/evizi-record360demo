import React, {useCallback, useEffect} from 'react';
import {Button, Form, Input, Modal} from 'antd';
import './style.css';
import {gql, useMutation} from '@apollo/client';
import {LoginParams} from '../../interfaces/interfaces';
import {useNavigate} from 'react-router-dom';
import {RoutesPath} from '../../constants/RoutesPath';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getLoginState, loginSuccess} from '../../features/login/login.slice';

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($username: String!, $password: String!) {
    authenticate(username: $username, password: $password) {
      errors {
        message
        path
      }
      user {
        email
        id
      }
      token
    }
  }
`;
const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(getLoginState);
  const formRef = React.useRef(null);
  const [login, {loading}] = useMutation(LOGIN_MUTATION);

  const onFinishForm = useCallback((values: LoginParams) => {
    login({
      variables: {
        username: values.username,
        password: values.password
      },
      onCompleted: (data) => {
        localStorage.setItem('access-token', data?.authenticate.token);
        dispatch(loginSuccess(data.authenticate.user));
        Modal.success({
          content: 'Login Success...Move to dashboard',
          onOk: () => {
            navigate(RoutesPath.DASHBOARD);
          }
        });
      },
      onError: (error) => {
        Modal.error({
          content: 'Login Fail...Try again',
          onOk: () => {
            // @ts-ignore
            formRef.current.resetFields();
          }
        });
      }
    });
  }, []);

  const onFinishFormFailed = useCallback((errorInfo: any) => {
    Modal.error({
      content: 'Login Fail...Try again',
      onOk: () => {
        // @ts-ignore
        formRef.current.resetFields();
      }
    });
  }, []);
  useEffect(() => {
    if (user !== null) {
      Modal.error({
        content: 'You are login...Go Back !!!',
        onOk: () => {
          navigate(RoutesPath.DASHBOARD);
        }
      });
    }
  }, []);
  return (
    <div className="login__container">
      <div className="login__form">
        <Form
          ref={formRef}
          name="basic"
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          initialValues={{remember: true}}
          onFinish={onFinishForm}
          onFinishFailed={onFinishFormFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="username"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please input your email!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
