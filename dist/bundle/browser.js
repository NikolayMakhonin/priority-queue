!function(t){"use strict";var e=function(){
function t(t,e){
this._branch=null,this.order=t,this.parent=e}
return Object.defineProperty(t.prototype,"branch",{
get:function(){if(!this._branch){
for(var t=[this.order],e=this.parent;null!=e;)t.push(e.order),
e=e.parent;this._branch=t}return this._branch},
enumerable:!1,configurable:!0}),t}()
;function r(t,r){
return null==t?null==r?null:r:new e(t,r)}
function n(t,e){
for(var r=t&&t.branch,n=e&&e.branch,o=r?r.length:0,i=n?n.length:0,s=o>i?o:i,l=0;l<s;l++){
var c=l>=o?0:r[o-1-l],u=l>=i?0:n[i-1-l]
;if(c!==u)return c>u?1:-1}return 0}
function o(t,e,r,n){
return new(r||(r=Promise))((function(o,i){
function s(t){try{c(n.next(t))}catch(t){i(t)}}
function l(t){try{c(n.throw(t))}catch(t){i(t)}}
function c(t){var e
;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){
t(e)}))).then(s,l)}c((n=n.apply(t,e||[])).next())
}))}function i(t,e){var r,n,o,i,s={label:0,
sent:function(){if(1&o[0])throw o[1];return o[1]},
trys:[],ops:[]};return i={next:l(0),throw:l(1),
return:l(2)
},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){
return this}),i;function l(i){return function(l){
return function(i){
if(r)throw new TypeError("Generator is already executing.")
;for(;s;)try{
if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),
0):n.next)&&!(o=o.call(n,i[1])).done)return o
;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:
case 1:o=i;break;case 4:return s.label++,{
value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0]
;continue;case 7:i=s.ops.pop(),s.trys.pop()
;continue;default:
if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){
s=0;continue}
if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){
s.label=i[1];break}if(6===i[0]&&s.label<o[1]){
s.label=o[1],o=i;break}if(o&&s.label<o[2]){
s.label=o[2],s.ops.push(i);break}
o[2]&&s.ops.pop(),s.trys.pop();continue}
i=e.call(t,s)}catch(t){i=[6,t],n=0}finally{r=o=0}
if(5&i[0])throw i[1];return{
value:i[0]?i[1]:void 0,done:!0}}([i,l])}}}
function s(t,e){return t<e}class l{
constructor({objectPool:t,lessThanFunc:e}={}){
this._size=0,this._root=null,this.merge=c,
this.collapse=u,this._objectPool=t,this._lessThanFunc=e||s
}clear(){this._root=null,this._size=0}get size(){
return this._size}add(t){
let e=null!=this._objectPool?this._objectPool.get():null
;return null==e?e={child:null,next:null,prev:null,
item:t
}:e.item=t,this._size++,this._root=c(this._root,e,this._lessThanFunc),e
}getMin(){const{_root:t}=this
;return null==t?void 0:t.item}getMinNode(){
return this._root}deleteMin(){const{_root:t}=this
;if(null==t)return;const e=t.item
;return this.delete(t),e}delete(t){var e
;if(t===this._root)this._root=u(t.child,this._lessThanFunc);else{
if(null==t.prev){
if(this._objectPool)throw new Error("The node is already deleted. Don't use the objectPool to prevent this error.")
;return}
t.prev.child===t?t.prev.child=t.next:t.prev.next=t.next,null!=t.next&&(t.next.prev=t.prev),
this._root=c(this._root,u(t.child,this._lessThanFunc),this._lessThanFunc)
}
t.child=null,t.prev=null,t.next=null,t.item=void 0,null===(e=this._objectPool)||void 0===e||e.release(t),
this._size--}decreaseKey(t){
t!==this._root&&(t.prev.child===t?t.prev.child=t.next:t.prev.next=t.next,
null!=t.next&&(t.next.prev=t.prev),
this._root=c(this._root,t,this._lessThanFunc))}
get isEmpty(){return null==this._root}
[Symbol.iterator](){return this._iterate(!1)}
nodes(){return{
[Symbol.iterator]:()=>this._iterate(!0)}}
_iterate(t){const e=this._lessThanFunc
;return function*r(n){
n&&(t?yield n:yield n.item,n.child&&(null!=n.child.next&&(n.child=u(n.child,e),
n.child.prev=n),yield*r(n.child)))}(this._root)}}
function c(t,e,r){let n,o
;return null==t?e:null==e||t===e?t:(r(e.item,t.item)?(n=e,
o=t):(n=t,o=e),o.next=n.child,
null!=n.child&&(n.child.prev=o),o.prev=n,n.child=o,
n.next=null,n.prev=null,n)}function u(t,e){
let r,n,o,i,s;if(null==t)return null
;for(i=t,r=null;null!=i;){
if(n=i,o=n.next,null==o){n.prev=r,r=n;break}
i=o.next,s=c(n,o,e),s.prev=r,r=s}
for(s=null;null!=r;)i=r.prev,s=c(s,r,e),r=i
;return s}function a(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}function h(t,e,r){try{const n=e?e(t):t
;r._resolve(n)}catch(t){r._reject(t)}}
function f(t,e,r){e||r._reject(t);try{const n=e(t)
;r._resolve(n)}catch(t){r._reject(t)}}
const d=function(){};class b{constructor(t){
this.status="pending",this.value=void 0,
this.reason=void 0,this._handlers=null
;const e=this._resolve,r=this._reject,n=this._resolveAsync,o=this._rejectAsync,i=this
;this._resolve=function(t){e.call(i,t)
},this._reject=function(t){r.call(i,t)
},this._resolveAsync=function(t){n.call(i,t)
},this._rejectAsync=function(t){o.call(i,t)
},t(this._resolve,this._reject)}_resolve(t){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(t))}_resolveAsync(t){
a(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
}_resolveSync(t){const e=this._handlers
;if(this.value=t,null!=e){this._handlers=null
;for(let r=0,n=e.length;r<n;r++){const[n,,o]=e[r]
;h(t,n,o)}}}_reject(t){
"pending"===this.status&&this._rejectAsync(t)}
_rejectAsync(t){
this.status="rejected",a(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
}_rejectSync(t){const e=this._handlers
;if(this.reason=t,null!=e){this._handlers=null
;for(let r=0,n=e.length;r<n;r++){const[,n,o]=e[r]
;f(t,n,o)}}}then(t,e){const r=new b(d)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([t,e,r])):"fulfilled"===this.status?h(this.value,t,r):f(this.reason,e,r),
r}catch(t){return this.then(void 0,t)}finally(t){
const e=t&&function(e){return t(),e
},r=t&&function(e){throw t(),e}
;return this.then(e,r)}static resolve(t){
const e=new b(d);return e._resolve(t),e}
static reject(t){const e=new b(d)
;return e._reject(t),e}get[Symbol.toStringTag](){
return"Promise"}}const _=function(){};class v{
constructor(t){
if(t&&t.aborted)this.promise=b.reject(t.reason),this.resolve=_,this.reject=_;else{
let e,r;if(this.promise=new Promise((function(t){
e=t,r=function(e){!function(t,e){t(function(t){
return{then(e,r){r(t)}}}(e))}(t,e)}})),t){
const n=t.subscribe((function(t){r(t)}))
;this.resolve=function(t){n(),e(t)
},this.reject=function(t){n(),r(t)}
}else this.resolve=e,this.reject=r}}}
var p={},y={},g={}
;Object.defineProperty(g,"__esModule",{value:!0})
;class j extends Error{constructor(t,e){
super(t),Object.setPrototypeOf(this,j.prototype),
this.reason=e,this.name="AbortError",
this._internal=!1}}
g.AbortError=j,Object.defineProperty(y,"__esModule",{
value:!0});var A=g
;y.toAbortController=function(t,e){
return t.signal.subscribe((t=>{
t instanceof A.AbortError&&t._internal&&(t=t.reason),
e.abort(t)})),e
},y.toAbortControllerFast=function(t,e){
return t.signal.addEventListener("abort",(function(){
e.abort(this.reason)})),e
},y.toAbortSignal=function(t,e){
return t.subscribe((t=>{e.abort(t)})),e.signal
},y.toAbortSignalFast=function(t,e){
return t.addEventListener("abort",(function(t){
e.abort(t)})),e.signal};var w={},m={}
;Object.defineProperty(m,"__esModule",{value:!0})
;const S=()=>{};m.AbortSignalFast=class{
constructor(){
this.aborted=!1,this.reason=void 0,this._callbacks=void 0
}subscribe(t){var e
;if(null===(e=this._callbacks)||void 0===e?void 0:e.has(t))throw new Error("Already subscribed: "+t)
;return this.aborted?(t.call(this,this.reason),
S):(this._callbacks||(this._callbacks=new Set),
this._callbacks.add(t),()=>{var e
;null===(e=this._callbacks)||void 0===e||e.delete(t)
})}abort(t){var e
;this.aborted=!0,this.reason=t,null===(e=this._callbacks)||void 0===e||e.forEach((t=>{
t.call(this,this.reason)})),this._callbacks=void 0
}throwIfAborted(){
if(this.aborted)throw this.reason}
},Object.defineProperty(w,"__esModule",{value:!0})
;var x=m,P=g;w.AbortControllerFast=class{
constructor(){this.signal=new x.AbortSignalFast}
abort(t){
this.signal.aborted||(void 0===t&&((t=new P.AbortError("Aborted with no reason",t))._internal=!0),
this.signal.abort(t))}
},Object.defineProperty(p,"__esModule",{value:!0})
;var F=y,T=w,E=g;function k(t,e){
return n(t.priority,e.priority)<0}
p.toAbortController=F.toAbortController,p.toAbortControllerFast=F.toAbortControllerFast,
p.toAbortSignal=F.toAbortSignal,
p.toAbortSignalFast=F.toAbortSignalFast,p.AbortControllerFast=T.AbortControllerFast,
p.AbortError=E.AbortError;var C=1,M=function(){
function t(){this._queue=new l({lessThanFunc:k})}
return t.prototype.run=function(t,e,r){
return this._run(!1,t,e,r)
},t.prototype.runTask=function(t,e,r){
return this._run(!0,t,e,r)
},t.prototype._run=function(t,e,n,o){
var i=new v(o),s={priority:r(C++,n),func:e,
abortSignal:o,resolve:i.resolve,reject:i.reject,
readyToRun:!t};if(this._queue.add(s),t){var l=this
;return{result:i.promise,
setReadyToRun:function(t){
s.readyToRun=t,t&&!l._inProcess&&(l._inProcess=!0,l._process())
}}}
return this._inProcess||(this._inProcess=!0,this._process()),i.promise
},t.prototype._process=function(){
return o(this,void 0,void 0,(function(){
var t,e,r,n,o,s,l,c,u,a
;return i(this,(function(i){switch(i.label){
case 0:t=this._queue,i.label=1;case 1:return[4,0]
;case 2:
if(i.sent(),t.isEmpty)return this._inProcess=!1,[3,8]
;if((e=t.getMin()).readyToRun)t.deleteMin();else{
r=void 0;try{for(u=void 0,n=function(t){
var e="function"==typeof Symbol&&Symbol.iterator,r=e&&t[e],n=0
;if(r)return r.call(t)
;if(t&&"number"==typeof t.length)return{
next:function(){
return t&&n>=t.length&&(t=void 0),{
value:t&&t[n++],done:!t}}}
;throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")
}(t.nodes()),
o=n.next();!o.done;o=n.next())if((s=o.value).item.readyToRun){
r=s;break}}catch(t){u={error:t}}finally{try{
o&&!o.done&&(a=n.return)&&a.call(n)}finally{
if(u)throw u.error}}
if(!r)return this._inProcess=!1,[3,8]
;e=r.item,t.delete(r)}
return e.abortSignal&&e.abortSignal.aborted?(e.reject(e.abortSignal.reason),
[3,7]):[3,3];case 3:
return i.trys.push([3,6,,7]),(l=e.func&&e.func(e.abortSignal))&&"function"==typeof l.then?[4,l]:[3,5]
;case 4:l=i.sent(),i.label=5;case 5:
return e.resolve(l),[3,7];case 6:
return c=i.sent(),e.reject(c),[3,7];case 7:
return[3,1];case 8:return[2]}}))}))},t}()
;t.Priority=e,t.PriorityQueue=M,t.createAwaitConcurrency=function(){
var t=new M;return function(e,r){
return t.run(void 0,e,r)}
},t.priorityCompare=n,t.priorityCreate=r,Object.defineProperty(t,"__esModule",{
value:!0})}({});
