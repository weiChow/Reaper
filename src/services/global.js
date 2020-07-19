'use strict'
/**
 * Created by weiChow on 2020/06/30
 * global service
 */

import { request } from '@/providers/http'

/**
 * 通过组织机构代码获取组织机构信息
 * @param orgCode
 * @returns {Promise}
 */
export function getOrgInfoByOrgCode(orgCode) {
  return request('http://171.220.244.49:8883/metaData/getOrgInfoByOrgCode', {
    method: 'get',
    data: { orgCode }
  })
}
