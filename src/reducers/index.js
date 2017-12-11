import { combineReducers } from 'redux'


import barcodeReducer from './barcodeReducer'

export default combineReducers({

  //Barcode Reducer
  barcode: barcodeReducer,

});