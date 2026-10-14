// export const api = <T>(url: string, init?: RequestInit): Promise<T> => {
//   return fetch(url, init)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.statusText)
//       }
//       return response.json() as Promise<T>
//     })
// }

export const api = <T>(url: string, init?: RequestInit): Promise<T> => {
  return fetch(url, init)
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.message || "Something went wrong!";
        throw new Error(errorMessage);
      }

      return data as T;
    })
    .catch((error) => {
      throw error;
    });
};
