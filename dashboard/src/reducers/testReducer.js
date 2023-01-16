import {
    ADMIN_TEST_REQUEST,
    ADMIN_TEST_SUCCESS,
    ADMIN_TEST_FAIL,

    NEW_TEST_REQUEST,
    NEW_TEST_SUCCESS,
    NEW_TEST_FAIL,
    NEW_TEST_RESET,

    UPDATE_TEST_REQUEST,
    UPDATE_TEST_SUCCESS,
    UPDATE_TEST_FAIL,
    UPDATE_TEST_RESET,

    DELETE_TEST_REQUEST,
    DELETE_TEST_SUCCESS,
    DELETE_TEST_FAIL,
    DELETE_TEST_RESET,

    TEST_DETAILS_REQUEST,
    TEST_DETAILS_SUCCESS,
    TEST_DETAILS_FAIL,

    ADMIN_PACKAGE_REQUEST,
    ADMIN_PACKAGE_SUCCESS,
    ADMIN_PACKAGE_FAIL,

    NEW_PACKAGE_REQUEST,
    NEW_PACKAGE_SUCCESS,
    NEW_PACKAGE_FAIL,
    NEW_PACKAGE_RESET,

    UPDATE_PACKAGE_REQUEST,
    UPDATE_PACKAGE_SUCCESS,
    UPDATE_PACKAGE_FAIL,
    UPDATE_PACKAGE_RESET,


    DELETE_PACKAGE_REQUEST,
    DELETE_PACKAGE_SUCCESS,
    DELETE_PACKAGE_FAIL,
    DELETE_PACKAGE_RESET,

    PACKAGE_DETAILS_REQUEST,
    PACKAGE_DETAILS_SUCCESS,
    PACKAGE_DETAILS_FAIL,

    ALL_PACKAGE_REVIEW_REQUEST,
    ALL_PACKAGE_REVIEW_SUCCESS,
    ALL_PACKAGE_REVIEW_FAIL,

    DELETE_PACKAGE_REVIEW_REQUEST,
    DELETE_PACKAGE_REVIEW_SUCCESS,
    DELETE_PACKAGE_REVIEW_FAIL,
    DELETE_PACKAGE_REVIEW_RESET,

    ADMIN_LABCATEGORY_REQUEST,
    ADMIN_LABCATEGORY_SUCCESS,
    ADMIN_LABCATEGORY_FAIL,

    NEW_LABCATEGORY_REQUEST,
    NEW_LABCATEGORY_SUCCESS,
    NEW_LABCATEGORY_FAIL,
    NEW_LABCATEGORY_RESET,

    UPDATE_LABCATEGORY_REQUEST,
    UPDATE_LABCATEGORY_SUCCESS,
    UPDATE_LABCATEGORY_FAIL,
    UPDATE_LABCATEGORY_RESET,

    DELETE_LABCATEGORY_REQUEST,
    DELETE_LABCATEGORY_SUCCESS,
    DELETE_LABCATEGORY_FAIL,
    DELETE_LABCATEGORY_RESET,

    LABCATEGORY_DETAILS_REQUEST,
    LABCATEGORY_DETAILS_SUCCESS,
    LABCATEGORY_DETAILS_FAIL,

    SAMPLE_REQUEST,
    SAMPLE_SUCCESS,
    SAMPLE_FAIL,

    NEW_SAMPLE_REQUEST,
    NEW_SAMPLE_SUCCESS,
    NEW_SAMPLE_FAIL,
    NEW_SAMPLE_RESET,

    UPDATE_SAMPLE_REQUEST,
    UPDATE_SAMPLE_SUCCESS,
    UPDATE_SAMPLE_FAIL,
    UPDATE_SAMPLE_RESET,

    DELETE_SAMPLE_REQUEST,
    DELETE_SAMPLE_SUCCESS,
    DELETE_SAMPLE_FAIL,
    DELETE_SAMPLE_RESET,

    SAMPLE_DETAILS_REQUEST,
    SAMPLE_DETAILS_SUCCESS,
    SAMPLE_DETAILS_FAIL,

    CLEAR_ERRORS,
  } from "../constants/testConstants";
  
  export const testsReducer = (state = { tests: [] }, action) => {
    switch (action.type) {
      case ADMIN_TEST_REQUEST:
        return {
          loading: true,
          tests: [],
        };
  
      case ADMIN_TEST_SUCCESS:
        return {
          loading: false,
          tests: action.payload,
        };
  
      case ADMIN_TEST_FAIL:
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

  export const packageReducer = (state = { packages: [] }, action) => {
    switch (action.type) {
      case ADMIN_PACKAGE_REQUEST:
        return {
          loading: true,
          packages: [],
        };
  
      case ADMIN_PACKAGE_SUCCESS:
        return {
          loading: false,
          packages: action.payload,
        };
  
      case ADMIN_PACKAGE_FAIL:
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
  
  export const labCategoriesReducer = (state = { labCategories: [] }, action) => {
    switch (action.type) {
      case ADMIN_LABCATEGORY_REQUEST:
        return {
          loading: true,
          labcategories: [],
        };
      case ADMIN_LABCATEGORY_SUCCESS:
        return {
          loading: false,
          labCategories: action.payload,
        };
      case ADMIN_LABCATEGORY_FAIL:
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


  
  export const samplesReducer = (state = { samples: [] }, action) => {
    switch (action.type) {
      case SAMPLE_REQUEST:
        return {
          loading: true,
          samples: [],
        };
  
      case SAMPLE_SUCCESS:
        return {
          loading: false,
          samples: action.payload,
        };
  
      case SAMPLE_FAIL:
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
  
 
  
  export const newTestReducer = (state = { test: {} }, action) => {
    switch (action.type) {
      case NEW_TEST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_TEST_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          test: action.payload.test,
        };
  
      case NEW_TEST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_TEST_RESET:
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

  export const newPackageReducer = (state = { package: {} }, action) => {
    switch (action.type) {
      case NEW_PACKAGE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_PACKAGE_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          package: action.payload.package,
        };
  
      case NEW_PACKAGE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_PACKAGE_RESET:
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
  
  export const newLabCategoryReducer = (state = { labcategory: {} }, action) => {
    switch (action.type) {
      case NEW_LABCATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case NEW_LABCATEGORY_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          labcategory: action.payload.labcategory,
        };
      case NEW_LABCATEGORY_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_LABCATEGORY_RESET:
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
  
  export const newSampleReducer = (state = { sample: {} }, action) => {
    switch (action.type) {
      case NEW_SAMPLE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_SAMPLE_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          sample: action.payload.sample,
        };
  
      case NEW_SAMPLE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_SAMPLE_RESET:
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
  
  
  export const testPackageReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_TEST_REQUEST:
        case DELETE_TEST_REQUEST:
        case UPDATE_PACKAGE_REQUEST:
        case DELETE_PACKAGE_REQUEST:
        case UPDATE_LABCATEGORY_REQUEST:
        case DELETE_LABCATEGORY_REQUEST:
          case UPDATE_SAMPLE_REQUEST :
          case DELETE_SAMPLE_REQUEST :
        return {
          ...state,
          loading: true,
        };
      case DELETE_TEST_SUCCESS:
      case DELETE_PACKAGE_SUCCESS:
      case DELETE_LABCATEGORY_SUCCESS:
      case DELETE_SAMPLE_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_TEST_SUCCESS:
      case UPDATE_PACKAGE_SUCCESS:
      case UPDATE_LABCATEGORY_SUCCESS:
      case UPDATE_SAMPLE_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_TEST_FAIL:
      case UPDATE_TEST_FAIL:
      case UPDATE_PACKAGE_FAIL:
      case DELETE_PACKAGE_FAIL:
      case DELETE_LABCATEGORY_FAIL:
      case UPDATE_LABCATEGORY_FAIL:
      case UPDATE_SAMPLE_FAIL:
      case DELETE_SAMPLE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_TEST_RESET:
      case DELETE_PACKAGE_RESET:
      case DELETE_LABCATEGORY_RESET:
      case DELETE_SAMPLE_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_TEST_RESET:
      case UPDATE_PACKAGE_RESET:
      case UPDATE_LABCATEGORY_RESET:
      case UPDATE_SAMPLE_RESET:
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
  
  export const testDetailsReducer = (state = { test: {} }, action) => {
    switch (action.type) {
      case TEST_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case TEST_DETAILS_SUCCESS:
        return {
          loading: false,
          test: action.payload.test,
        };
      case TEST_DETAILS_FAIL:
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

  export const PackageDetailsReducer = (state = { testPackage: {} }, action) => {
    switch (action.type) {
      case PACKAGE_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case PACKAGE_DETAILS_SUCCESS:
        return {
          loading: false,
          testPackage: action.payload.package,
        };
      case PACKAGE_DETAILS_FAIL:
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

  export const labCategoryDetailsReducer = (state = { labCategory: {} }, action) => {
    switch (action.type) {
      case LABCATEGORY_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
  
      case LABCATEGORY_DETAILS_SUCCESS:
        return {
          loading: false,
          labCategory: action.payload.labCategory,
        };
      case LABCATEGORY_DETAILS_FAIL:
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

  export const sampleDetailsReducer = (state = { sample: {} }, action) => {
    switch (action.type) {
      case SAMPLE_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case SAMPLE_DETAILS_SUCCESS:
        return {
          loading: false,
          sample: action.payload.sample,
        };
      case SAMPLE_DETAILS_FAIL:
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
  
  export const packageReviewsReducer = (state = { packageReviews: [] }, action) => {
    switch (action.type) {
      case ALL_PACKAGE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_PACKAGE_REVIEW_SUCCESS:
        return {
          loading: false,
          reviews: action.payload,
        };
      case ALL_PACKAGE_REVIEW_FAIL:
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
  
  export const reviewPackageReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_PACKAGE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_PACKAGE_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_PACKAGE_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_PACKAGE_REVIEW_RESET:
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
  