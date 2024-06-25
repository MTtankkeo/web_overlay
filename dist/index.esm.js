class t{constructor(t,e){this.viewport=t,this.alignment=e}}class e extends t{getOverflowed(t){const e=this.viewport,i=window.innerWidth-(t.x+t.width),r=window.innerWidth-this.viewport.right;return{left:Math.max(e.left-t.x,0),right:Math.max(r-i,0),top:Math.max(e.top-t.y,0),bottom:Math.max(t.y+t.height-e.bottom,0)}}}class i{static merge(t,e){var i,r,o,n;return new DOMRect(null!==(i=e.x)&&void 0!==i?i:t.x,null!==(r=e.y)&&void 0!==r?r:t.y,null!==(o=e.width)&&void 0!==o?o:t.width,null!==(n=e.height)&&void 0!==n?n:t.height)}static reflowHorizontal(t,e){return t.style.left=`${e.left}px`,t.style.top=`${e.top}px`,t.style.width=`${e.width}px`,t.style.height=null,t.getBoundingClientRect()}}class r{constructor(t){this.element=t}performLayout(t,e){return this.performLayoutVertical(this.performLayoutHorizontal(t,e),e)}}class o extends r{constructor(t,e){super(t),this.behavior=e}performLayoutHorizontal(t,e){let r=e.getOverflowed(t);return r.left?(t=i.merge(t,{x:t.x+r.left}),r=e.getOverflowed(t),r.right&&(t=i.merge(t,{width:t.width-r.right}),t=i.reflowHorizontal(this.element,t))):r.right&&(t=i.merge(t,{x:t.x-Math.max(r.right,e.viewport.left)}),r=e.getOverflowed(t),r.left&&(t=i.merge(t,{x:t.x+r.left,width:t.width-r.left}),t=i.reflowHorizontal(this.element,t))),t}performLayoutVertical(t,e){let r=e.getOverflowed(t);if(r.bottom){if(t=i.merge(t,{y:t.y-r.bottom}),r=e.getOverflowed(t),r.top)return i.merge(t,{y:t.y+r.top,height:Math.max(t.height-r.top,0)})}else if(r.top&&(t=i.merge(t,{y:t.y+r.top}),r=e.getOverflowed(t),r.bottom))return i.merge(t,{height:Math.max(t.height-r.bottom,0)});return t}}class n{reflow(t,e){return null!=(null==e?void 0:e.width)&&(t.style.width=`${e.width}px`),null!=(null==e?void 0:e.height)&&(t.style.height=`${e.height}px`),null!=e.x&&(t.style.left=`${e.x}px`),null!=e.y&&(t.style.top=`${e.y}px`),t.getBoundingClientRect()}}class s extends n{createOverlayConstraint(t,i){return new e(t,i)}createOverlayLayoutCorrector(t,e){return new o(t,e)}performLayout(t){const e=t.getBoundingClientRect(),r=t.target.getBoundingClientRect(),o=t.parent.getBoundingClientRect(),n=t.behavior,s=i.merge(e,this.perfromLayoutPosition(e,r)),l=this.createOverlayConstraint(o,c.ALL);return{initialRect:s,correctedRect:this.createOverlayLayoutCorrector(t,n).performLayout(s,l)}}}class l extends s{perfromLayoutPosition(t,e){return{x:this.getPositionHorizontal(t,e),y:e.y+(e.height-t.height)/2}}}class h extends s{perfromLayoutPosition(t,e){return{x:e.x+(e.width-t.width)/2,y:this.getPositionVertical(t,e)}}}class a extends h{getPositionVertical(t,e){return e.bottom}}const d={BOTTOM:new a,TOP:new class extends h{getPositionVertical(t,e){return e.top-t.height}},Left:new class extends l{getPositionHorizontal(t,e){return e.left-t.width}},Right:new class extends l{getPositionHorizontal(t,e){return e.right}}};var c;!function(t){t.ALL="all",t.NONE="none",t.SIZE="size",t.POSITION="position"}(c||(c={}));class u{static attach(t,e,i=document.body,r={layout:d.BOTTOM}){if(null==t)throw new Error("todo");if(null==e)throw new Error("todo");if(null==i)throw new Error("todo");const o=document.createElement("overlay-wrapper");return o.append(t),o.target=e,o.parent=i,o.behavior=r,this.overlays.set(t,o),i.append(o),o}static detach(t){console.log(this.overlays.get(t))}}u.overlays=new Map;class p extends HTMLElement{get raw(){return this.firstElementChild}markNeedRepaint(){this.unsetLayout(),this.performLayout()}unsetLayout(){this.style.width="max-content",this.style.height="max-content",this.style.left="0px",this.style.top="0px",this.getBoundingClientRect()}disconnectedCallback(){this.observer.disconnect(),window.removeEventListener("resize",this.markNeedRepaint.bind(this)),window.removeEventListener("scroll",this.markNeedRepaint.bind(this))}connectedCallback(){this.style.display="block",this.style.position="fixed",this.style.left="0px",this.style.top="0px",this.style.width="max-content",this.style.height="max-content",this.performLayout(),this.observer=new MutationObserver(this.markNeedRepaint.bind(this)),this.observer.observe(this.firstElementChild,{attributes:!0,characterData:!0,subtree:!0,childList:!0}),window.addEventListener("resize",this.markNeedRepaint.bind(this)),window.addEventListener("scroll",this.markNeedRepaint.bind(this))}performLayout(){var t;const e=this.behavior.layout.performLayout(this),i=e.correctedRect;this.style.width=`${i.width}px`,this.style.height=`${i.height}px`,this.style.left=`${i.x}px`,this.style.top=`${i.y}px`,null===(t=this.reflowBehindBuilder)||void 0===t||t.call(this.raw,e)}}customElements.define("overlay-wrapper",p);export{a as BottomOverlayLayout,s as DrivenOverlayLayout,u as Overlay,c as OverlayAlignment,d as OverlayDirection,p as OverlayElement,n as OverlayLayout};
//# sourceMappingURL=index.esm.js.map
