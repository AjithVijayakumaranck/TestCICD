
import authInstance from "../instance/AuthInstance";

const registerClicks = async (catId, userId) => {
  try {
    const payload = {
      categoryId: catId,
      userId: userId,
    };

    const response = await authInstance.put(
      "/api/category/register_clicks",
      payload
    );
    console.log(response.data, "popular category");
  } catch (error) {
    console.error(error, "popular category error");
  }
};
 export default registerClicks ;