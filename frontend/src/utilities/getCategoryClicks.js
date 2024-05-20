import authInstance from "../instance/AuthInstance";

const registerClicks = async (catId, userId) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return;
  }

  try {
    const payload = {
      categoryId: catId,
      userId: userId,
    };

    const response = await authInstance.put(
      "/api/category/register_clicks",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data, "popular category");
  } catch (error) {
    console.error(error, "popular category error");
  }
};

export default registerClicks;
