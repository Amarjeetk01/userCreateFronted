const BASE_URL =  import.meta.env.VITE_REACT_API_URL;

export function login(authData) {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = authData;
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
       
      });
      const data = await response.json();
      if (response.ok) {
        resolve({ data });
      } else {
        const errorMessage = data.message;
        reject(errorMessage || "Something went wrong!");
      }
    } catch (error) {
      reject(error);
    }
  });
}


export function register(userData) {
    return new Promise(async (resolve, reject) => {
      try {
        const { first_name, last_name, email, password }=userData
        const response = await fetch(`${BASE_URL}/api/register`, {
          method: "POST",
          credentials: 'include',
          body: JSON.stringify({ first_name, last_name, email, password }),
          headers: { "content-type": "application/json" },
        });
        const data = await response.json();
        if (response.ok) {
          resolve({ data });
        } else {
          const errorMessage = data.message;
          reject(errorMessage || "Something went wrong!");
        }
        return
      } catch (error) {
        reject(error);
      }
    });
}

export async function logout() {
  try {
    await fetch(`${BASE_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

export function fetchAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/api/me`, {
        method: "GET",
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        resolve({ data });
      } else {
        if (response.status === 401) {
          reject(new Error('Unauthorized or token expired'));
        } else {
          reject(new Error(data.message || 'Something went wrong!'));
        }
      }
    } catch (error) {
      reject(error);
    }
  });
}



