import { CATEGORY } from "./CategoryActions";

const initialState = {
  categoryData: [],
};

const CategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY:
      return {
        ...state,
        categoryData: action.categoryData,
      };
    default:
      return state;
  }
};

export default CategoriesReducer;
