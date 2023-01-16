import {
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  ADMIN_CATEGORY_REQUEST,
  ADMIN_CATEGORY_SUCCESS,
  ADMIN_CATEGORY_FAIL,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  NEW_CATEGORY_RESET,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_RESET,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_RESET,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  BANNER_REQUEST,
  BANNER_SUCCESS,
  BANNER_FAIL,
  NEW_BANNER_REQUEST,
  NEW_BANNER_SUCCESS,
  NEW_BANNER_FAIL,
  NEW_BANNER_RESET,
  UPDATE_BANNER_REQUEST,
  UPDATE_BANNER_SUCCESS,
  UPDATE_BANNER_FAIL,
  UPDATE_BANNER_RESET,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  DELETE_BANNER_FAIL,
  DELETE_BANNER_RESET,
  BANNER_DETAILS_REQUEST,
  BANNER_DETAILS_SUCCESS,
  BANNER_DETAILS_FAIL,
  ADMIN_PRESCRIPTION_REQUEST,
  ADMIN_PRESCRIPTION_SUCCESS,
  ADMIN_PRESCRIPTION_FAIL,
  NEW_PRESCRIPTION_REQUEST,
  NEW_PRESCRIPTION_SUCCESS,
  NEW_PRESCRIPTION_FAIL,
  NEW_PRESCRIPTION_RESET,
  UPDATE_PRESCRIPTION_REQUEST,
  UPDATE_PRESCRIPTION_SUCCESS,
  UPDATE_PRESCRIPTION_FAIL,
  UPDATE_PRESCRIPTION_RESET,
  DELETE_PRESCRIPTION_REQUEST,
  DELETE_PRESCRIPTION_SUCCESS,
  DELETE_PRESCRIPTION_FAIL,
  DELETE_PRESCRIPTION_RESET,
  PRESCRIPTION_DETAILS_REQUEST,
  PRESCRIPTION_DETAILS_SUCCESS,
  PRESCRIPTION_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const categoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case ADMIN_CATEGORY_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ADMIN_CATEGORY_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case ADMIN_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const bannersReducer = (state = { banners: [] }, action) => {
  switch (action.type) {
    case BANNER_REQUEST:
      return {
        loading: true,
        banners: [],
      };
    case BANNER_SUCCESS:
      return {
        loading: false,
        banners: action.payload,
      };
    case BANNER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };

    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newCategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case NEW_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        category: action.payload.category,
      };
    case NEW_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_CATEGORY_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newBannerReducer = (state = { banner: {} }, action) => {
  switch (action.type) {
    case NEW_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_BANNER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        banner: action.payload.banner,
      };
    case NEW_BANNER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_BANNER_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_CATEGORY_REQUEST:
    case DELETE_CATEGORY_REQUEST:
    case UPDATE_BANNER_REQUEST:
    case DELETE_BANNER_REQUEST:
    case UPDATE_PRESCRIPTION_REQUEST:
    case DELETE_PRESCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
    case DELETE_CATEGORY_SUCCESS:
    case DELETE_BANNER_SUCCESS:
    case DELETE_PRESCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PRODUCT_SUCCESS:
    case UPDATE_CATEGORY_SUCCESS:
    case UPDATE_BANNER_SUCCESS:
    case UPDATE_PRESCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
    case DELETE_CATEGORY_FAIL:
    case UPDATE_CATEGORY_FAIL:
    case DELETE_BANNER_FAIL:
    case UPDATE_BANNER_FAIL:
    case UPDATE_PRESCRIPTION_FAIL:
    case DELETE_PRESCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_RESET:
    case DELETE_CATEGORY_RESET:
    case DELETE_BANNER_RESET:
    case DELETE_PRESCRIPTION_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_RESET:
    case UPDATE_CATEGORY_RESET:
    case UPDATE_BANNER_RESET:
    case UPDATE_PRESCRIPTION_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const categoryDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        category: action.payload.category,
      };
    case CATEGORY_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const bannerDetailsReducer = (state = { banner: {} }, action) => {
  switch (action.type) {
    case BANNER_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case BANNER_DETAILS_SUCCESS:
      return {
        loading: false,
        banner: action.payload.banner,
      };
    case BANNER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const prescriptionReducer = (state = { prescriptions: [] }, action) => {
  switch (action.type) {
    case ADMIN_PRESCRIPTION_REQUEST:
      return {
        loading: true,
        prescriptions: [],
      };

    case ADMIN_PRESCRIPTION_SUCCESS:
      return {
        loading: false,
        prescriptions: action.payload,
      };

    case ADMIN_PRESCRIPTION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newPrescriptionsReducer = (
  state = { prescription: {} },
  action
) => {
  switch (action.type) {
    case NEW_PRESCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRESCRIPTION_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        prescription: action.payload.prescription,
      };

    case NEW_PRESCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PRESCRIPTION_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const prescriptionDetailsReducer = (
  state = { prescription: {} },
  action
) => {
  switch (action.type) {
    case PRESCRIPTION_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRESCRIPTION_DETAILS_SUCCESS:
      return {
        loading: false,
        prescription: action.payload.prescription,
      };
    case PRESCRIPTION_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
