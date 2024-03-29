/**
 * api function
 */
import baseUrl from './api.config'
export default {
  reportInfo: `${baseUrl.stat}/queryUserStat`, // 平台报表用户统计

  reportPlayer: `${baseUrl.stat}/queryPlayerStat`, // 平台报表用户所属玩家统计

  calcUserStat: `${baseUrl.stat}/calcUserStat`, // 总报表（下级所有代理）

  calcPlayerStat: `${baseUrl.stat}/calcPlayerStat`, // 总报表（下级玩家数据）

  getChildrenList: `${baseUrl.stat}/agent/children/list`, // 创建玩家获取下级代理商

  addPlayer: `${baseUrl.stat}/agent/player/create`, // 创建玩家

  addAgent: `${baseUrl.stat}/agentNew`, // 创建代理

  chipList : `${baseUrl.stat}/agent/chip`, // 获取限红

  agentLogin: `${baseUrl.stat}/agentLogin`, // 所有用户登录接口

  bills: `${baseUrl.stat}/bills`, // 获取用户个人信息

  points: `${baseUrl.stat}/points`, // 存提点（暂时不用）

  forzen: `${baseUrl.stat}/player/forzen`, // 冻结、解冻

  take: `${baseUrl.stat}/agent/player/take`, // 玩家提点

  deposit: `${baseUrl.stat}/agent/player/deposit`, // 玩家存点

  billTransfer: `${baseUrl.stat}/billTransfer`, // 代理对代理存取点

  password: `${baseUrl.stat}/agent/player/password` // 修改密码
}
