import authInstance from "../instance/AuthInstance";

const registerSubCatClicks = async (catId, userId) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return;
  }

  try {
    const payload = {
      subCatId: catId,
      userId: userId,
    };

    const response = await authInstance.put(
      "/api/category/register_clicks_subcat",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data, "popular subcategory");
  } catch (error) {
    console.error(error, "popular subcategory error");
  }
};

export default registerSubCatClicks;
