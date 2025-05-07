// user authentication ...............................

export const login = async (payload) => {
  return await fetch(`${baseURL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const signup = async (payload) => {
  return await fetch(`${baseURL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const resetPassword = async (payload, token) => {
  return await fetch(`${baseURL}/users/reset_password/${token}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

// product fetching ....................................

export const baseURL = "https://api.store.inflection.org.in";

export const getProductDetails = async (slug) => {
  return await fetch(`${baseURL}/products/public/s/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
