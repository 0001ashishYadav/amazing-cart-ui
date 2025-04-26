export const baseURL = "https://api.store.inflection.org.in";

export const getProductDetails = async (slug) => {
  return await fetch(`${baseURL}/products/public/s/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
