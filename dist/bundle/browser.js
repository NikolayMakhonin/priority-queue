!function(t){"use strict";var e=function(){
function t(t,e){
this._branch=null,this.order=t,this.parent=e}
return Object.defineProperty(t.prototype,"branch",{
get:function(){if(!this._branch){
for(var t=[this.order],e=this.parent;null!=e;)t.push(e.order),
e=e.parent;this._branch=t}return this._branch},
enumerable:!1,configurable:!0}),t}()
;function n(t,n){
return null==t?null==n?null:n:new e(t,n)}
function r(t,e){
for(var n=t&&t.branch,r=e&&e.branch,i=n?n.length:0,s=r?r.length:0,o=i>s?i:s,l=0;l<o;l++){
var c=l>=i?0:n[i-1-l],u=l>=s?0:r[s-1-l]
;if(c!==u)return c>u?1:-1}return 0}
function i(t,e,n,r){
return new(n||(n=Promise))((function(i,s){
function o(t){try{c(r.next(t))}catch(t){s(t)}}
function l(t){try{c(r.throw(t))}catch(t){s(t)}}
function c(t){var e
;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){
t(e)}))).then(o,l)}c((r=r.apply(t,e||[])).next())
}))}function s(t,e){var n,r,i,s,o={label:0,
sent:function(){if(1&i[0])throw i[1];return i[1]},
trys:[],ops:[]};return s={next:l(0),throw:l(1),
return:l(2)
},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){
return this}),s;function l(s){return function(l){
return function(s){
if(n)throw new TypeError("Generator is already executing.")
;for(;o;)try{
if(n=1,r&&(i=2&s[0]?r.return:s[0]?r.throw||((i=r.return)&&i.call(r),
0):r.next)&&!(i=i.call(r,s[1])).done)return i
;switch(r=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:
case 1:i=s;break;case 4:return o.label++,{
value:s[1],done:!1};case 5:o.label++,r=s[1],s=[0]
;continue;case 7:s=o.ops.pop(),o.trys.pop()
;continue;default:
if(!(i=o.trys,(i=i.length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){
o=0;continue}
if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){
o.label=s[1];break}if(6===s[0]&&o.label<i[1]){
o.label=i[1],i=s;break}if(i&&o.label<i[2]){
o.label=i[2],o.ops.push(s);break}
i[2]&&o.ops.pop(),o.trys.pop();continue}
s=e.call(t,o)}catch(t){s=[6,t],r=0}finally{n=i=0}
if(5&s[0])throw s[1];return{
value:s[0]?s[1]:void 0,done:!0}}([s,l])}}}
function o(t,e){return t<e}class l{
constructor({objectPool:t,lessThanFunc:e}={}){
this._size=0,this._root=null,this.merge=c,
this.collapse=u,this._objectPool=t,this._lessThanFunc=e||o
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
;return function*n(r){
r&&(t?yield r:yield r.item,r.child&&(null!=r.child.next&&(r.child=u(r.child,e),
r.child.prev=r),yield*n(r.child)))}(this._root)}}
function c(t,e,n){let r,i
;return null==t?e:null==e||t===e?t:(n(e.item,t.item)?(r=e,
i=t):(r=t,i=e),i.next=r.child,
null!=r.child&&(r.child.prev=i),i.prev=r,r.child=i,
r.next=null,r.prev=null,r)}function u(t,e){
let n,r,i,s,o;if(null==t)return null
;for(s=t,n=null;null!=s;){
if(r=s,i=r.next,null==i){r.prev=n,n=r;break}
s=i.next,o=c(r,i,e),o.prev=n,n=o}
for(o=null;null!=n;)s=n.prev,o=c(o,n,e),n=s
;return o}function h(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}function a(t,e,n){try{const r=e?e(t):t
;n._resolve(r)}catch(t){n._reject(t)}}
function f(t,e,n){e||n._reject(t);try{const r=e(t)
;n._resolve(r)}catch(t){n._reject(t)}}
const _=function(){};class d{constructor(t){
this.status="pending",this.value=void 0,
this.reason=void 0,this._handlers=null
;const e=this._resolve,n=this._reject,r=this._resolveAsync,i=this._rejectAsync,s=this
;this._resolve=function(t){e.call(s,t)
},this._reject=function(t){n.call(s,t)
},this._resolveAsync=function(t){r.call(s,t)
},this._rejectAsync=function(t){i.call(s,t)
},t(this._resolve,this._reject)}_resolve(t){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(t))}_resolveAsync(t){
h(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
}_resolveSync(t){const e=this._handlers
;if(this.value=t,null!=e){this._handlers=null
;for(let n=0,r=e.length;n<r;n++){const[r,,i]=e[n]
;a(t,r,i)}}}_reject(t){
"pending"===this.status&&this._rejectAsync(t)}
_rejectAsync(t){
this.status="rejected",h(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
}_rejectSync(t){const e=this._handlers
;if(this.reason=t,null!=e){this._handlers=null
;for(let n=0,r=e.length;n<r;n++){const[,r,i]=e[n]
;f(t,r,i)}}}then(t,e){const n=new d(_)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([t,e,n])):"fulfilled"===this.status?a(this.value,t,n):f(this.reason,e,n),
n}catch(t){return this.then(void 0,t)}finally(t){
const e=t&&function(e){return t(),e
},n=t&&function(e){throw t(),e}
;return this.then(e,n)}static resolve(t){
const e=new d(_);return e._resolve(t),e}
static reject(t){const e=new d(_)
;return e._reject(t),e}get[Symbol.toStringTag](){
return"Promise"}}const p=function(){};class v{
constructor(t){
if(t&&t.aborted)this.promise=d.reject(t.reason),this.resolve=p,this.reject=p;else{
let e,n
;if(this.promise=new Promise((function(t,r){
e=t,n=function(e){!function(t,e){t(function(t){
return{then(e,n){n(t)}}}(e))}(t,e)}})),t){
const r=t.subscribe((function(t){n(t)}))
;this.resolve=function(t){r(),e(t)
},this.reject=function(t){r(),n(t)}
}else this.resolve=e,this.reject=n}}}
function y(t,e){return r(t.priority,e.priority)<0}
var b=1,j=function(){function t(){
this._queue=new l({lessThanFunc:y})}
return t.prototype.run=function(t,e,n){
return this._run(!1,t,e,n)
},t.prototype.runTask=function(t,e,n){
return this._run(!0,t,e,n)
},t.prototype._run=function(t,e,r,i){
var s=new v(i),o={priority:n(b++,r),func:e,
abortSignal:i,resolve:s.resolve,reject:s.reject,
readyToRun:!t};if(this._queue.add(o),t){var l=this
;return{result:s.promise,
setReadyToRun:function(t){
o.readyToRun=t,t&&!l._inProcess&&(l._inProcess=!0,l._process())
}}}
return this._inProcess||(this._inProcess=!0,this._process()),s.promise
},t.prototype._process=function(){
return i(this,void 0,void 0,(function(){
var t,e,n,r,i,o,l,c,u,h
;return s(this,(function(s){switch(s.label){
case 0:t=this._queue,s.label=1;case 1:return[4,0]
;case 2:
if(s.sent(),t.isEmpty)return this._inProcess=!1,[3,8]
;if((e=t.getMin()).readyToRun)t.deleteMin();else{
n=void 0;try{for(u=void 0,r=function(t){
var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0
;if(n)return n.call(t)
;if(t&&"number"==typeof t.length)return{
next:function(){
return t&&r>=t.length&&(t=void 0),{
value:t&&t[r++],done:!t}}}
;throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")
}(t.nodes()),
i=r.next();!i.done;i=r.next())if((o=i.value).item.readyToRun){
n=o;break}}catch(t){u={error:t}}finally{try{
i&&!i.done&&(h=r.return)&&h.call(r)}finally{
if(u)throw u.error}}
if(!n)return this._inProcess=!1,[3,8]
;e=n.item,t.delete(n)}
return e.abortSignal&&e.abortSignal.aborted?(e.reject(e.abortSignal.reason),
[3,7]):[3,3];case 3:
return s.trys.push([3,6,,7]),(l=e.func&&e.func(e.abortSignal))&&"function"==typeof l.then?[4,l]:[3,5]
;case 4:l=s.sent(),s.label=5;case 5:
return e.resolve(l),[3,7];case 6:
return c=s.sent(),e.reject(c),[3,7];case 7:
return[3,1];case 8:return[2]}}))}))},t}()
;t.Priority=e,t.PriorityQueue=j,t.priorityCompare=r,
t.priorityCreate=n,Object.defineProperty(t,"__esModule",{
value:!0})}({});
