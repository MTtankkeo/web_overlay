# Web Overlay
This package provides the foundation to implement overlay elements that take overflow-considered.

## How to add overlay to target element.
This when you want to place an overlay element to a specific element rather than a specific static position by calling to `Overlay.attach` function.

### When only required properties.
The example below define only required values to adding the overlay element to the target element.

```ts
const overlay = ...;
const overlayTarget = ...;

Overlay.attach({
    element: overlay,
    target: overlayTarget,
    parent: overlayTarget.parentElement, // default is body
});
```

### When adding options about overlay.
The example below define behaviors in the `behavior` that is properties key.

```ts
Overlay.attach({
    ...,
    behavior: {
        viewportPadding: 15,
        targetGap: 10,
        direction: OverlayDirection.BOTTOM_CENTER,

        // Define how to correct overflowed.
        alignment: OverlayAlignment.ALL,
        
        // Define how to correct overflowed by direction.
        alignment: {
            horizontal: OverlayAlignment.ALL,
            vertical: OverlayAlignment.SIZE
        },
    }
});
```