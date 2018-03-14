/**
 * api function
 */
import baseUrl from './api.config'
export default {
  reportInfo: `${baseUrl.stat}/queryUserStat`, // 平台报表用户统计

  reportPlayer: `${baseUrl.stat}/queryPlayerStat`, // 平台报表用户所属玩家统计

  calcUserStat: `${baseUrl.stat}/calcUserStat`, // 报表用户时间查询

  calcPlayerStat: `${baseUrl.stat}/calcPlayerStat` // 报表玩家时间查询
}
