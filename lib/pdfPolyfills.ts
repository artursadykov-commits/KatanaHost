// Polyfills necesarios para que pdfjs-dist funcione en Node.js (sin browser APIs)

const g = global as any;

if (!g.DOMMatrix) {
  g.DOMMatrix = class DOMMatrix {
    a=1;b=0;c=0;d=1;e=0;f=0;isIdentity=true;is2D=true;
    constructor(_?: any) {}
    translate() { return this; }
    scale() { return this; }
    rotate() { return this; }
    multiply() { return this; }
    inverse() { return this; }
    transformPoint(p: any) { return p; }
  };
}

if (!g.Path2D) {
  g.Path2D = class Path2D {
    constructor(_?: any) {}
    addPath(){}moveTo(){}lineTo(){}bezierCurveTo(){}arc(){}closePath(){}rect(){}
  };
}

if (!g.ImageData) {
  g.ImageData = class ImageData {
    data: Uint8ClampedArray; width: number; height: number;
    constructor(w: number, h: number) {
      this.width=w; this.height=h;
      this.data=new Uint8ClampedArray(w*h*4);
    }
  };
}

if (!g.OffscreenCanvas) {
  g.OffscreenCanvas = class OffscreenCanvas {
    width: number; height: number;
    constructor(w: number, h: number) { this.width=w; this.height=h; }
    getContext() { return null; }
  };
}
