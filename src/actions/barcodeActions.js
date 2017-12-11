import { GET_BARCODE_DATA, GET_BARCODE_LABEL_TYPE, GET_BARCODE_SOURCE, GET_ENUMERATED_SCANNERS } from './types';

export function getBarcodeData(barcodeData) {
  return {
    type: GET_BARCODE_DATA,
    payload: barcodeData
  }
}

export function getBarcodeLabelType(barcodeLabelType) {
  return {
    type: GET_BARCODE_LABEL_TYPE,
    payload: barcodeLabelType
  }
}

export function getBarcodeSource(barcodeSource) {
  return {
    type: GET_BARCODE_SOURCE,
    payload: barcodeSource
  }
}

export function getEnumeratedScanners(enumeratedScanners) {
  return {
    type: GET_ENUMERATED_SCANNERS,
    payload: enumeratedScanners
  }
}