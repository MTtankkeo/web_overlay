!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).Overlay={})}(this,(function(t){"use strict";class e{constructor(t,e){this.viewport=t,this.alignment=e}}class i extends e{getOverflowed(t){const e=this.viewport,i=window.innerWidth-(t.x+t.width),r=window.innerWidth-this.viewport.right;return{left:Math.max(e.left-t.x,0),right:Math.max(r-i,0),top:Math.max(e.top-t.y,0),bottom:Math.max(t.y+t.height-e.bottom,0)}}}class r{static merge(t,e){var i,r,o,n;return new DOMRect(null!==(i=e.x)&&void 0!==i?i:t.x,null!==(r=e.y)&&void 0!==r?r:t.y,null!==(o=e.width)&&void 0!==o?o:t.width,null!==(n=e.height)&&void 0!==n?n:t.height)}static reflowHorizontal(t,e){return t.style.left=`${e.left}px`,t.style.top=`${e.top}px`,t.style.width=`${e.width}px`,t.style.height=null,t.getBoundingClientRect()}}class o{constructor(t){this.element=t}performLayout(t,e){return this.performLayoutVertical(this.performLayoutHorizontal(t,e),e)}}class n extends o{constructor(t,e){super(t),this.behavior=e}performLayoutHorizontal(t,e){let i=e.getOverflowed(t);return i.left?(t=r.merge(t,{x:t.x+i.left}),i=e.getOverflowed(t),i.right&&(t=r.merge(t,{width:t.width-i.right}),t=r.reflowHorizontal(this.element,t))):i.right&&(t=r.merge(t,{x:t.x-Math.max(i.right,e.viewport.left)}),i=e.getOverflowed(t),i.left&&(t=r.merge(t,{x:t.x+i.left,width:t.width-i.left}),t=r.reflowHorizontal(this.element,t))),t}performLayoutVertical(t,e){let i=e.getOverflowed(t);if(i.bottom){if(t=r.merge(t,{y:t.y-i.bottom}),i=e.getOverflowed(t),i.top)return r.merge(t,{y:t.y+i.top,height:Math.max(t.height-i.top,0)})}else if(i.top&&(t=r.merge(t,{y:t.y+i.top}),i=e.getOverflowed(t),i.bottom))return r.merge(t,{height:Math.max(t.height-i.bottom,0)});return t}}class s{reflow(t,e){return null!=(null==e?void 0:e.width)&&(t.style.width=`${e.width}px`),null!=(null==e?void 0:e.height)&&(t.style.height=`${e.height}px`),null!=e.x&&(t.style.left=`${e.x}px`),null!=e.y&&(t.style.top=`${e.y}px`),t.getBoundingClientRect()}}class l extends s{createOverlayConstraint(t,e){return new i(t,e)}createOverlayLayoutCorrector(t,e){return new n(t,e)}performLayout(e){const i=e.getBoundingClientRect(),o=e.target.getBoundingClientRect(),n=e.parent.getBoundingClientRect(),s=e.behavior,l=r.merge(i,this.perfromLayoutPosition(i,o)),a=this.createOverlayConstraint(n,t.OverlayAlignment.ALL);return{initialRect:l,correctedRect:this.createOverlayLayoutCorrector(e,s).performLayout(l,a)}}}class a extends l{perfromLayoutPosition(t,e){return{x:this.getPositionHorizontal(t,e),y:e.y+(e.height-t.height)/2}}}class h extends l{perfromLayoutPosition(t,e){return{x:e.x+(e.width-t.width)/2,y:this.getPositionVertical(t,e)}}}class d extends h{getPositionVertical(t,e){return e.bottom}}const c={BOTTOM:new d,TOP:new class extends h{getPositionVertical(t,e){return e.top-t.height}},Left:new class extends a{getPositionHorizontal(t,e){return e.left-t.width}},Right:new class extends a{getPositionHorizontal(t,e){return e.right}}};var y;t.OverlayAlignment=void 0,(y=t.OverlayAlignment||(t.OverlayAlignment={})).ALL="all",y.NONE="none",y.SIZE="size",y.POSITION="position";class u{static attach(t,e,i=document.body,r={layout:c.BOTTOM}){if(null==t)throw new Error("todo");if(null==e)throw new Error("todo");if(null==i)throw new Error("todo");const o=document.createElement("overlay-wrapper");return o.append(t),o.target=e,o.parent=i,o.behavior=r,this.overlays.set(t,o),i.append(o),o}static detach(t){console.log(this.overlays.get(t))}}u.overlays=new Map;class p extends HTMLElement{get raw(){return this.firstElementChild}markNeedRepaint(){this.unsetLayout(),this.performLayout()}unsetLayout(){this.style.width="max-content",this.style.height="max-content",this.style.left="0px",this.style.top="0px",this.getBoundingClientRect()}disconnectedCallback(){this.observer.disconnect(),window.removeEventListener("resize",this.markNeedRepaint.bind(this)),window.removeEventListener("scroll",this.markNeedRepaint.bind(this))}connectedCallback(){this.style.display="block",this.style.position="fixed",this.style.left="0px",this.style.top="0px",this.style.width="max-content",this.style.height="max-content",this.performLayout(),this.observer=new MutationObserver(this.markNeedRepaint.bind(this)),this.observer.observe(this.firstElementChild,{attributes:!0,characterData:!0,subtree:!0,childList:!0}),window.addEventListener("resize",this.markNeedRepaint.bind(this)),window.addEventListener("scroll",this.markNeedRepaint.bind(this))}performLayout(){var t;const e=this.behavior.layout.performLayout(this),i=e.correctedRect;this.style.width=`${i.width}px`,this.style.height=`${i.height}px`,this.style.left=`${i.x}px`,this.style.top=`${i.y}px`,null===(t=this.reflowBehindBuilder)||void 0===t||t.call(this.raw,e)}}customElements.define("overlay-wrapper",p),t.BottomOverlayLayout=d,t.DrivenOverlayLayout=l,t.Overlay=u,t.OverlayDirection=c,t.OverlayElement=p,t.OverlayLayout=s}));
//# sourceMappingURL=index.umd.js.map
