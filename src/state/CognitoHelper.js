import axios from 'axios';

const apiEndpoint = 'https://evdfbs5cqj.execute-api.ca-central-1.amazonaws.com/Prod/v1/auth/user';

export const signUp = async (email, password) => {
  try {
    const response = await axios.post(apiEndpoint, {
      operation: 'signup',
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(apiEndpoint, {
      operation: 'login',
      username,
      password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const forgotPassword = async (username) => {
  try {
    const response = await axios.post(apiEndpoint, {
      operation: 'forgotPassword',
      username,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (session, user, oldPassword, newPassword) => {
  try {
    const response = await axios.post(apiEndpoint, {
      operation: 'changePassword',
      AccessToken: session.AccessToken,
      previousPassword: oldPassword,
      newPassword,
      user
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};