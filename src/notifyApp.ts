import forOwn from './util/forOwn'

/**
 * 给指定程序发送代码字符串并执行
 * @param appSpecifier 程序名
 * @param stringExpression 代码字符串
 * @param callback 回调bridgeTalk
 */
function notifyApp(appSpecifier: string, stringExpression: string, callback?: (br: any) => void) {
  const bridgeTalk = new BridgeTalk()
  bridgeTalk.target = appSpecifier
  bridgeTalk.body = stringExpression
  bridgeTalk.onError = function (e: any) {
    const err: string[] = []
    forOwn(e, (v, k) => {
      if (k === 'headers') return
      err.push(k + ': ' + v + '\n')
    })
    alert(err.join(''))
  }
  if (callback) {
    callback(bridgeTalk)
  }
  bridgeTalk.send()
}

export default notifyApp
