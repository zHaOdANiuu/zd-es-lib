type Include = (key: keyof typeof AE_EXPRESSION_LIB) => string

const AE_EXPRESSION_LIB = {
  /** 作用到图层的蒙版上 */
  createAlphaRectanglePath:
    'var r=thisLayer,n=r.width,t=r.height,o=n/2,u=t/2;function e(r){return r<.5?.5:r}function f(r){return[o,e(r)]}function i(r){return[e(r),u]}function m(n,t,o,u){for(var e,f,i=-1,m=n;m-i>.3;)f=(m+i)/2,(e=r.sampleImage(t(f),o(f),!0,time))[0]+e[1]+e[2]+e[3]===0?i=f:m=f;return m<0||m===n?0:(2*m|0)+(u?1:0)}var c=m(t,function(r){return[o,r]},f,!0),a=m(n,function(r){return[r,u]},i,!0),p=n-m(n-a,function(r){return[n-r,u]},i,!1),h=t-m(t-c,function(r){return[o,t-r]},f,!1);createPath([[a,c],[p,c],[p,h],[a,h]]);'
}

export function writeAeExpression(body: Property, callback: (include: Include) => string) {
  body.expression = callback(k => AE_EXPRESSION_LIB[k])
}

export function clearAeExpression(body: Property) {
  body.expression = ''
  body.expressionEnabled = false
}
