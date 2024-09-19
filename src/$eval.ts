import exe from './exe';

function $eval(stringExpression: string): any
{
      aftereffects && aftereffects.executeScript
            ? aftereffects.executeScript(stringExpression)
            : exe(BridgeTalk.appSpecifier, stringExpression);
}

export default $eval;
