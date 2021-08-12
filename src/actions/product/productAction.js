import { 
  PRODUCT_LIST,
  PRODUCT_DETAILS,
  PRODUCT_BY_ORDER_ID,
  PRODUCT_CREATE,
  PRODUCT_UPDATE,
  PRODUCT_DELETE
} from './actions-types';
import { 
  getAllProducts, 
  getOneProduct, 
  getProductsByOrderId, 
  saveProduct, 
  updateOneProduct,
  deleteOneProduct
} from '../../api/product';

export const loadProducts = () => async dispatch => {
  try {
    const res = await getAllProducts();
    if(res.status === 200) {
      dispatch({
        type: PRODUCT_LIST,
        payload: res.products
      })
    } else {
      throw new Error(res.msg)
    }

  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_LIST,
      payload: error.message
    })
  }
}

export const loadProductDetails = id => async dispatch => {
  try {
    const res = await getOneProduct(id);
    if(res.status === 200) {
      dispatch({
        type: PRODUCT_DETAILS,
        payload: res.product
      })

    } else {
      throw new Error(res.msg)
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS,
      payload: error.message
    })
  }
}

export const loadProductsByOrderId = id => async dispatch => {
  try {
    const res = await getProductsByOrderId(id);
    if(res.status === 200) {
      dispatch({
        type: PRODUCT_BY_ORDER_ID,
        payload: res.productsByOrderId
      })
    } else {
      throw new Error(res.msg)
    }

  } catch (error) {
    dispatch({
      type: PRODUCT_BY_ORDER_ID,
      payload: error.message
    })
  }
}

export const createProduct = data => async dispatch => {
  try {
    const response = await saveProduct(data);
    if(response.status === 201) {
      dispatch({
        type: PRODUCT_CREATE,
        payload: response
      })

    } else {
      throw new Error(response.msg)
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE,
      payload: error.message
    })
  }
}

export const editProduct = (data, id) => async dispatch => {
  try {
    const response = await updateOneProduct(data, id);
    if(response.status === 200) {
      dispatch({
        type: PRODUCT_UPDATE,
        payload: response
      })

    } else {
      throw new Error(response.msg)
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE,
      payload: error.message
    })
  }
}

export const deleteProduct = id => async dispatch => {
  try {
    const res = await deleteOneProduct(id);
    if(res.status === 200) {
      dispatch({
        type: PRODUCT_DELETE,
        payload: null
      })

    } else {
      throw new Error(res.msg)
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE,
      payload: error.message
    })
  }
}
