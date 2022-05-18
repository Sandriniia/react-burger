
const register = async (
  url: string,
  method: 'POST',
  headers: { [name: string]: string },
  body: BodyInit,
) => {
  const response = await fetch(url, {
    method,
    headers,
    body,
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return Promise.reject(new Error(`Ошибка ${response.status}`));
};

const login = async (url: string,
  method: 'POST',
  headers: { [name: string]: string },
  body: BodyInit,) => {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return Promise.reject(new Error(`Ошибка ${response.status}`));
}

const recoverPassword = async (url: string,
  method: 'POST',
  headers: { [name: string]: string },
  body: BodyInit) => {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return Promise.reject(new Error(`Ошибка ${response.status}`));
}

const resetPassword = async (url: string,
  method: 'POST',
  headers: { [name: string]: string },
  body: BodyInit) => {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return Promise.reject(new Error(`Ошибка ${response.status}`));
}

const getUserData = async (url: string,
  method: 'GET',
  headers: { [name: string]: string } | undefined,
  ) => {
    const response = await fetch(url, {
      method,
      headers,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return Promise.reject(new Error(`Ошибка ${response.status}`));
}

const changeUserData = async (url: string,
  method: 'PATCH',
  headers: { [name: string]: string } | undefined,
  body: BodyInit) => {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return Promise.reject(new Error(`Ошибка ${response.status}`));
}

const refreshToken = async (url: string,
  method: 'POST',
  headers: { [name: string]: string },
  body: BodyInit) => {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return Promise.reject(new Error(`Ошибка ${response.status}`));
}

const logout = async (url: string,
  method: 'POST',
  headers: { [name: string]: string },
  body: BodyInit) => {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return Promise.reject(new Error(`Ошибка ${response.status}`));
}

export {
  register,
  login,
  recoverPassword,
  resetPassword,
  getUserData,
  changeUserData,
  refreshToken,
  logout,
};
