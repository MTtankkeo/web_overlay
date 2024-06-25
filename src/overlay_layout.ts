import { OverlayElement } from "./components/overlay_element";
import { OverlayAlignment, OverlayBehavior } from "./overlay";
import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
import { DrivenOverlayRenderCorrector, OverlayLayoutCorrector } from "./overlay_layout_corrector";
import { DOMRectUtil } from "./utils/dom_rect";

export type OverlayLayoutPosition = { x: number; y: number; };

export type OverlayLayoutResult = {
    initialRect: DOMRect,
    correctedRect: DOMRect
};

export class OverlayRect {
    constructor(public parent: DOMRect, public reflow: () => DOMRect) {}
}

export abstract class OverlayLayout<T extends OverlayConstraint> {
    /**
     * Calculates the static position and size where the overlay element
     * will be located and returns it.
     */
    abstract performLayout(element: OverlayElement): OverlayLayoutResult;

    abstract perfromLayoutPosition(overlay: DOMRect, target: DOMRect): OverlayLayoutPosition;

    /** Returns the overlay constraint instance that is created. */
    abstract createOverlayConstraint(
        viewport: DOMRect,
        alignment: OverlayAlignment
    ): T;

    /** Returns the overlay render adjuster instance that is created. */
    abstract createOverlayLayoutCorrector(
        element: OverlayElement,
        behavior: OverlayBehavior
    ): OverlayLayoutCorrector<T>;

    reflow(target: HTMLElement, result: Partial<DOMRect>): DOMRect {
        if (result?.width != null) {
            target.style.width = `${result.width}px`;
        }
        if (result?.height != null) {
            target.style.height = `${result.height}px`;
        }
        if (result.x != null) {
            target.style.left = `${result.x}px`;
        }
        if (result.y != null) {
            target.style.top = `${result.y}px`;
        }

        return target.getBoundingClientRect();
    }
}

export abstract class DrivenOverlayLayout extends OverlayLayout<DrivenOverlayConstraint> {
    createOverlayConstraint(
        viewport: DOMRect,
        alignment: OverlayAlignment
    ): DrivenOverlayConstraint {
        return new DrivenOverlayConstraint(viewport, alignment);
    }

    createOverlayLayoutCorrector(
        element: OverlayElement,
        behavior: OverlayBehavior
    ): DrivenOverlayRenderCorrector {
        return new DrivenOverlayRenderCorrector(element, behavior);
    }

    performLayout(element: OverlayElement): OverlayLayoutResult {
        const overlay = element.getBoundingClientRect();
        const target = element.target.getBoundingClientRect();
        const viewport = element.parent.getBoundingClientRect();
        const behavior = element.behavior;

        const initialRect = DOMRectUtil.merge(overlay, this.perfromLayoutPosition(overlay, target));
        const constraint = this.createOverlayConstraint(viewport, OverlayAlignment.ALL);
        const corrector = this.createOverlayLayoutCorrector(element, behavior);

        const correctedRect = corrector.performLayout(initialRect, constraint);

        return {
            initialRect: initialRect,
            correctedRect: correctedRect
        }
    }
}

export abstract class VerticalCenterOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect): OverlayLayoutPosition {
        const x = this.getPositionHorizontal(overlay, target);
        const y = target.y + (target.height - overlay.height) / 2;
        
        return {x, y};
    }

    abstract getPositionHorizontal(overlay: DOMRect, target: DOMRect): number;
}

export abstract class HorizontalCenterOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect): OverlayLayoutPosition {
        const x = target.x + (target.width - overlay.width) / 2;
        const y = this.getPositionVertical(overlay, target);

        return {x, y};
    }

    abstract getPositionVertical(overlay: DOMRect, target: DOMRect): number;
}

export class BottomOverlayLayout extends HorizontalCenterOverlayLayout {
    getPositionVertical(_: DOMRect, target: DOMRect): number {
        return target.bottom;
    }
}

export class TopOverlayLayout extends HorizontalCenterOverlayLayout {
    getPositionVertical(overlay: DOMRect, target: DOMRect): number {
        return target.top - overlay.height;
    }
}

export class LeftOverlayLayout extends VerticalCenterOverlayLayout {
    getPositionHorizontal(overlay: DOMRect, target: DOMRect): number {
        return target.left - overlay.width;
    }
}

export class RightOverlayLayout extends VerticalCenterOverlayLayout {
    getPositionHorizontal(_: DOMRect, target: DOMRect): number {
        return target.right;
    }
}