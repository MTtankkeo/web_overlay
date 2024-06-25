import { OverlayElement } from "./components/overlay_element";
import { BottomOverlayRender, OverlayRender } from "./overlay_render";

export const OverlayRenders = {
    BOTTOM: new BottomOverlayRender(),
}

export enum OverlayAlignment {
    ALL = "all",
    NONE = "none",
    SIZE = "size",
    POSITION = "position"
}

export interface OverlayBehavior {
    render: OverlayRender<any>,
    alignment?: {
        x: OverlayAlignment,
        y: OverlayAlignment,
    }
}

export class Overlay {
    private static overlays = new Map<HTMLElement, OverlayElement>();

    static attach(
        element: HTMLElement,
        target: HTMLElement,
        parent: HTMLElement = document.body,
        behavior: OverlayBehavior = { render: OverlayRenders.BOTTOM }
    ) {
        if (element == null) throw new Error("todo");
        if (target == null) throw new Error("todo");
        if (parent == null) throw new Error("todo");

        const wrapper = document.createElement("overlay-wrapper") as OverlayElement;
        wrapper.append(element);
        wrapper.target = target;
        wrapper.parent = parent;
        wrapper.behavior = behavior;
        
        this.overlays.set(element, wrapper);
        parent.append(wrapper);

        return wrapper;
    }

    static detach(element: HTMLElement) {
        console.log(this.overlays.get(element));
    }
}