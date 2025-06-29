# API Reference

```ts
interface PinchZoomProps {
  /**
   * how much the image should zoom on each double tap.
   */
  zoomTolerance?: number;
  initialScale?: 'auto' | number;
  minScale?: 'auto' | number;
  maxScale?: number;
  aspectRatio: number;
  onZoomChange?: (scale: number) => void;
}
```