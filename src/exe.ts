function exe(appSpecifier: string, stringExpression: string, callback?: (br: any) => void)
{
      const bridgeTalk = new BridgeTalk();
      bridgeTalk.target = appSpecifier;
      bridgeTalk.body = stringExpression;
      bridgeTalk.onError = function(e: any){ throw e; };
      callback && callback(bridgeTalk);
      bridgeTalk.send();
}

export default exe;
