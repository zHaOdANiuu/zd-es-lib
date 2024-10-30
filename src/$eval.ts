import exe from './exe';

/** 不同于原生的eval,此函数是通过外部命令运行的代码 */
function $eval(stringExpression: string): any
{
      aftereffects && aftereffects.executeScript
            ? aftereffects.executeScript(stringExpression)
            : exe(BridgeTalk.appSpecifier, stringExpression);
}

export default $eval;
