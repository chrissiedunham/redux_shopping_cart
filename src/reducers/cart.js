import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
  quantityById: {}
}

const onlyOneLeft = (quantityById, productId) => {
  if (quantityById[productId] === 1) {
    return true
  }
  return false
}

const addedIds = (state = initialState, action) => {
  var addedIds = state.addedIds
  var quantityById = state.quantityById
  switch (action.type) {
    case ADD_TO_CART:
      if (addedIds.indexOf(action.productId) !== -1) {
        return addedIds
      }
      return [ ...addedIds, action.productId ];
    case REMOVE_FROM_CART:
      var index = addedIds.indexOf(action.productId)
      if (index !== -1 && onlyOneLeft(quantityById, action.productId) ) {
        return addedIds.slice(0, index).concat(addedIds.slice(index + 1))
      }
      return addedIds
    default:
      return addedIds
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  const { productId } = action

  switch (action.type) {
    case ADD_TO_CART:
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }
    case REMOVE_FROM_CART:
      if (!state[productId]) {
        return state;
      }
      if (state[productId] === 1) {
        const { [productId]: value, ...newQuantityById } = state;
        return newQuantityById;
      }
      return { ...state,
        [productId]: (state[productId] || 0) - 1
      }
    default:
      return state
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}

export default cart
