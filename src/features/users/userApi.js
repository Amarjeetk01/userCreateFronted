const BASE_URL =  import.meta.env.VITE_REACT_API_URL;

export function fetchAllUser({
  search,
  domain,
  gender,
  availability,
  pageNumber,
  pageSize = 20,
}) {
  const queryParams = new URLSearchParams({
    search,
    domain,
    gender,
    availability,
    pageNumber,
    pageSize,
  });

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/api/users?${queryParams}`);
      const data = await response.json();
      if (response.ok) {
        resolve({ data });
      } else {
        const errorMessage = data.message;
        reject(errorMessage || "Not found");
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchUserById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/api/users/${id}`);
      const data = await response.json();
      if (response.ok) {
        resolve({ data });
      } else {
        const errorMessage = data.message;
        reject(errorMessage || "Not found");
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function createUser({ first_name,last_name,email,gender,avatar,domain,available}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/api/users`, {
        method: "POST",
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          gender,
          avatar,
          domain,
          available,
        }),
        credentials: 'include',
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        resolve({ data });
      } else {
        const errorMessage = data.message;
        reject(errorMessage || "Failed to create, try again!");
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function updateUserById({ id, info }) {
  return new Promise(async (resolve, reject) => {
    try {
      const { first_name,last_name,email,gender,avatar,domain,available}=info;
      const response = await fetch(`${BASE_URL}/api/users/${id}`, {
        method: "PUT",
        credentials: 'include',
        body: JSON.stringify({ first_name,last_name,email,gender,avatar,domain,available}),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();

      if (response.ok) {
        resolve({ data });
      } else {
        const errorMessage = data.message;
        reject(errorMessage || "Failed to update, try again!");
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function deleteUserById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(id);
      const response = await fetch(`${BASE_URL}/api/users/${id}`, {
        method: "DELETE",
        credentials: 'include',
      });
      const responseData = await response.json();
      if (response.ok) {
        resolve(responseData); // Resolve with response data
      } else {
        const errorMessage = responseData.message || "Try again!";
        reject(errorMessage);
      }
    } catch (error) {
      reject(error);
    }
  });
}


export function fetchAllDomains() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${BASE_URL}/api/users-domains`);
    const data = await response.json();
    resolve({ data });
  });
}
