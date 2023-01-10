export const CATEGORY = "CATEGORY";

export const categoriesAction = () => {
  return async (dispatch) => {
    try {
      const fetchResp = await fetch(
        "https://dmapi.ipaypro.co/app_task/categories"
      );
      const resp = await fetchResp.json();
      dispatch({ type: CATEGORY, categoryData: resp.result });
    } catch (error) {
      console.log(error);
    }
  };
};
