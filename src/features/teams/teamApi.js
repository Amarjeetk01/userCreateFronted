const BASE_URL =  import.meta.env.VITE_REACT_API_URL;

export function fetchTeamById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/api/team/${id}`, {
        method: "GET",
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch team: ${response.status}`);
      }
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


export function addToTeam( userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/api/team`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(userId ),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        resolve({ data });
      } else {
        const errorMessage = data.message;
        reject(errorMessage || "Failed to add");
      }
    } catch (error) {
      reject(error);
    }
  });
}
