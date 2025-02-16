/**
 * Fetches a paginated list of items from the API.
 *
 * @param {Object} params - The parameters for the API call.
 * @param {number} [params.page=1] - The page number for pagination (defaults to 1).
 * @returns {Promise<Array>} A promise that resolves to an array of products.
 */
export const fetchItemsApi = ({ page = 1 } = {}) => {
  const limit = 10; // items to fetch per page
  const skip = (page - 1) * limit; // offset based on the page number

  return fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
    .then((response) => response.json())
    .then((data) => data.products)
    .catch((error) => {
      throw new Error(error.message);
    });
};
