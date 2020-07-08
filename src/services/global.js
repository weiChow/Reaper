'use strict'

import { get } from '../providers/http'

export function getOrgInfoByOrgCode() {
  return get('http://171.220.244.49:8883/metaData/getOrgInfoByOrgCode', {
    params: {
      orgCode: '510100000000'
    }
  })
}
