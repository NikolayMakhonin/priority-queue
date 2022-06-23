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
for(var n=t&&t.branch,r=e&&e.branch,s=n?n.length:0,i=r?r.length:0,o=s>i?s:i,l=0;l<o;l++){
var c=l>=s?0:n[s-1-l],u=l>=i?0:r[i-1-l]
;if(c!==u)return c>u?1:-1}return 0}
function s(t,e,n,r){
return new(n||(n=Promise))((function(s,i){
function o(t){try{c(r.next(t))}catch(t){i(t)}}
function l(t){try{c(r.throw(t))}catch(t){i(t)}}
function c(t){var e
;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){
t(e)}))).then(o,l)}c((r=r.apply(t,e||[])).next())
}))}function i(t,e){var n,r,s,i,o={label:0,
sent:function(){if(1&s[0])throw s[1];return s[1]},
trys:[],ops:[]};return i={next:l(0),throw:l(1),
return:l(2)
},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){
return this}),i;function l(i){return function(l){
return function(i){
if(n)throw new TypeError("Generator is already executing.")
;for(;o;)try{
if(n=1,r&&(s=2&i[0]?r.return:i[0]?r.throw||((s=r.return)&&s.call(r),
0):r.next)&&!(s=s.call(r,i[1])).done)return s
;switch(r=0,s&&(i=[2&i[0],s.value]),i[0]){case 0:
case 1:s=i;break;case 4:return o.label++,{
value:i[1],done:!1};case 5:o.label++,r=i[1],i=[0]
;continue;case 7:i=o.ops.pop(),o.trys.pop()
;continue;default:
if(!(s=o.trys,(s=s.length>0&&s[s.length-1])||6!==i[0]&&2!==i[0])){
o=0;continue}
if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){
o.label=i[1];break}if(6===i[0]&&o.label<s[1]){
o.label=s[1],s=i;break}if(s&&o.label<s[2]){
o.label=s[2],o.ops.push(i);break}
s[2]&&o.ops.pop(),o.trys.pop();continue}
i=e.call(t,o)}catch(t){i=[6,t],r=0}finally{n=s=0}
if(5&i[0])throw i[1];return{
value:i[0]?i[1]:void 0,done:!0}}([i,l])}}}
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
;return null==t?void 0:t.item}deleteMin(){
const{_root:t}=this;if(null==t)return
;const e=t.item;return this.delete(t),e}delete(t){
var e
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
get isEmpty(){return null==this._root}}
function c(t,e,n){let r,s
;return null==t?e:null==e||t===e?t:(n(e.item,t.item)?(r=e,
s=t):(r=t,s=e),s.next=r.child,
null!=r.child&&(r.child.prev=s),s.prev=r,r.child=s,
r.next=null,r.prev=null,r)}function u(t,e){
let n,r,s,i,o;if(null==t)return null
;for(i=t,n=null;null!=i;){
if(r=i,s=r.next,null==s){r.prev=n,n=r;break}
i=s.next,o=c(r,s,e),o.prev=n,n=o}
for(o=null;null!=n;)i=n.prev,o=c(o,n,e),n=i
;return o}function h(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}function a(t,e,n){try{const r=e?e(t):t
;n._resolve(r)}catch(t){n._reject(t)}}
function f(t,e,n){e||n._reject(t);try{const r=e(t)
;n._resolve(r)}catch(t){n._reject(t)}}
const _=function(){};class p{constructor(t){
this.status="pending",this.value=void 0,
this.reason=void 0,this._handlers=null
;const e=this._resolve,n=this._reject,r=this._resolveAsync,s=this._rejectAsync,i=this
;this._resolve=function(t){e.call(i,t)
},this._reject=function(t){n.call(i,t)
},this._resolveAsync=function(t){r.call(i,t)
},this._rejectAsync=function(t){s.call(i,t)
},t(this._resolve,this._reject)}_resolve(t){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(t))}_resolveAsync(t){
h(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
}_resolveSync(t){const e=this._handlers
;if(this.value=t,null!=e){this._handlers=null
;for(let n=0,r=e.length;n<r;n++){const[r,,s]=e[n]
;a(t,r,s)}}}_reject(t){
"pending"===this.status&&this._rejectAsync(t)}
_rejectAsync(t){
this.status="rejected",h(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
}_rejectSync(t){const e=this._handlers
;if(this.reason=t,null!=e){this._handlers=null
;for(let n=0,r=e.length;n<r;n++){const[,r,s]=e[n]
;f(t,r,s)}}}then(t,e){const n=new p(_)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([t,e,n])):"fulfilled"===this.status?a(this.value,t,n):f(this.reason,e,n),
n}catch(t){return this.then(void 0,t)}finally(t){
const e=t&&function(e){return t(),e
},n=t&&function(e){throw t(),e}
;return this.then(e,n)}static resolve(t){
const e=new p(_);return e._resolve(t),e}
static reject(t){const e=new p(_)
;return e._reject(t),e}get[Symbol.toStringTag](){
return"Promise"}}const v=function(){};class d{
constructor(t){
if(t&&t.aborted)this.promise=p.reject(t.reason),this.resolve=v,this.reject=v;else{
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
return t.prototype.run=function(t,e,r){
var s=new d(r);return this._queue.add({
priority:n(b++,e),func:t,abortSignal:r,
resolve:s.resolve,reject:s.reject
}),this._process(),s.promise
},t.prototype._process=function(){
return s(this,void 0,void 0,(function(){
var t,e,n,r;return i(this,(function(s){
switch(s.label){case 0:
if(this._processRunning)return[2]
;this._processRunning=!0,t=this._queue,s.label=1
;case 1:return[4,0];case 2:
return s.sent(),t.isEmpty?(this._processRunning=!1,[3,8]):(e=t.deleteMin()).abortSignal&&e.abortSignal.aborted?(e.reject(e.abortSignal.reason),
[3,7]):[3,3];case 3:
return s.trys.push([3,6,,7]),(n=e.func&&e.func(e.abortSignal))&&"function"==typeof n.then?[4,n]:[3,5]
;case 4:n=s.sent(),s.label=5;case 5:
return e.resolve(n),[3,7];case 6:
return r=s.sent(),e.reject(r),[3,7];case 7:
return[3,1];case 8:return[2]}}))}))},t}()
;t.Priority=e,t.PriorityQueue=j,t.priorityCompare=r,
t.priorityCreate=n,Object.defineProperty(t,"__esModule",{
value:!0})}({});
