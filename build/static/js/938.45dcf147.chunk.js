/*! For license information please see 938.45dcf147.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkreact_app=self.webpackChunkreact_app||[]).push([[938],{4938:(e,t,o)=>{o.r(t),o.d(t,{startTapClick:()=>i});var n=o(8286),s=o(9384);const i=e=>{if(void 0===n.d)return;let t,o,i,f=10*-v,p=0;const h=e.getBoolean("animated",!0)&&e.getBoolean("rippleEffect",!0),L=new WeakMap,m=e=>{f=(0,s.u)(e),b(e)},w=()=>{i&&clearTimeout(i),i=void 0,t&&(C(!1),t=void 0)},E=e=>{t||k(a(e),e)},b=e=>{k(void 0,e)},k=(e,o)=>{if(e&&e===t)return;i&&clearTimeout(i),i=void 0;const{x:n,y:a}=(0,s.v)(o);if(t){if(L.has(t))throw new Error("internal error");t.classList.contains(d)||T(t,n,a),C(!0)}if(e){const t=L.get(e);t&&(clearTimeout(t),L.delete(e)),e.classList.remove(d);const o=()=>{T(e,n,a),i=void 0};r(e)?o():i=setTimeout(o,l)}t=e},T=(e,t,n)=>{if(p=Date.now(),e.classList.add(d),!h)return;const s=c(e);null!==s&&(g(),o=s.addRipple(t,n))},g=()=>{void 0!==o&&(o.then((e=>e())),o=void 0)},C=e=>{g();const o=t;if(!o)return;const n=u-Date.now()+p;if(e&&n>0&&!r(o)){const e=setTimeout((()=>{o.classList.remove(d),L.delete(o)}),u);L.set(o,e)}else o.classList.remove(d)};n.d.addEventListener("ionGestureCaptured",w),n.d.addEventListener("touchstart",(e=>{f=(0,s.u)(e),E(e)}),!0),n.d.addEventListener("touchcancel",m,!0),n.d.addEventListener("touchend",m,!0),n.d.addEventListener("pointercancel",w,!0),n.d.addEventListener("mousedown",(e=>{if(2===e.button)return;const t=(0,s.u)(e)-v;f<t&&E(e)}),!0),n.d.addEventListener("mouseup",(e=>{const t=(0,s.u)(e)-v;f<t&&b(e)}),!0)},a=e=>{if(void 0===e.composedPath)return e.target.closest(".ion-activatable");{const t=e.composedPath();for(let e=0;e<t.length-2;e++){const o=t[e];if(!(o instanceof ShadowRoot)&&o.classList.contains("ion-activatable"))return o}}},r=e=>e.classList.contains("ion-activatable-instant"),c=e=>{if(e.shadowRoot){const t=e.shadowRoot.querySelector("ion-ripple-effect");if(t)return t}return e.querySelector("ion-ripple-effect")},d="ion-activated",l=100,u=150,v=2500}}]);
//# sourceMappingURL=938.45dcf147.chunk.js.map