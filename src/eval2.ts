import notifyApp from './notifyApp'

/** 不同于原生的eval,此函数是通过外部命令运行的代码 */
function eval2(stringExpression: string): any {
  notifyApp(BridgeTalk.appSpecifier, stringExpression)
}

export default eval2
