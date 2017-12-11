import {GET_BARCODE_DATA, GET_BARCODE_LABEL_TYPE, GET_BARCODE_SOURCE, GET_ENUMERATED_SCANNERS} from '../actions/types';
import initialState from './InitialState';

export default function authReducer (state = initialState.barcode, action) {
  switch (action.type) {
    case GET_BARCODE_DATA:
      return {
        ...state,
        barcodeData: action.payload
      };
    case GET_BARCODE_LABEL_TYPE:
      return {
        ...state,
        barcodeLabelType: action.payload
      };
    case GET_BARCODE_SOURCE:
      return {
        ...state,
        barcodeSource: action.payload
      };
    case GET_ENUMERATED_SCANNERS:
      return {
        ...state,
        enumeratedScanners: action.payload
      };
    default:
      return state;
  }
}