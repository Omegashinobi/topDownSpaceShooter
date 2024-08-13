// export default class Resize {

//     initalWidth : number;
//     initalHeight : number;

//     private setRatio(width : number, height: number) {
//         const ratioW = (this.initalWidth) / width;
//         const ratioH = (this.initalHeight) / height;

//         let calculated = 1;

//         calculated = ratioW > ratioH ? ratioW : ratioH;

//         if(calculated > window.devicePixelRatio) {
//             calculated = window.devicePixelRatio;
//         }

//         this.
//     }

//     private set
// }


// _setLogicalToPhysicalRatio(width, height) {
//     const ratioW = (this._initialWidth * 2) / width;
//     const ratioH = (this._initialHeight * 2) / height;
//     let calculatedLogicalToPhysicalRatio = 1;

//     if (ratioW > ratioH) {
//         calculatedLogicalToPhysicalRatio = ratioW;
//     }
//     else {
//         calculatedLogicalToPhysicalRatio = ratioH;
//     }

//     if (calculatedLogicalToPhysicalRatio > window.devicePixelRatio) {
//         calculatedLogicalToPhysicalRatio = window.devicePixelRatio;
//     }

//     this._logicalToPhysicalRatio = calculatedLogicalToPhysicalRatio;
// }

// _resizeCanvasElementSize(newWidth, newHeight) {
//     this._elementWidth = Math.ceil(newWidth);
//     this._elementHeight = Math.ceil(newHeight);

//     this._pixiRenderer.view.style.width = this._elementWidth + "px";
//     this._pixiRenderer.view.style.height = this._elementHeight + "px";
// }
// _checkForResize() {
//     const { innerWidth, innerHeight } = window;

//     if (innerWidth !== this._innerWidth || innerHeight !== this._innerHeight) {
//         this._innerWidth = innerWidth;
//         this._innerHeight = innerHeight;
//         this.browserResized();
//     }
// }

// browserResized() {
//     let { innerHeight, innerWidth } = window;


//     this._setLogicalToPhysicalRatio(innerWidth, innerHeight);

//     const physicalWidth = Math.ceil(innerWidth * this._logicalToPhysicalRatio);
//     const physicalHeight = Math.ceil(innerHeight * this._logicalToPhysicalRatio);

//     // now resize the canvas
//     this._pixiRenderer.resize(physicalWidth, physicalHeight);
//     this._resizeCanvasElementSize(innerWidth, innerHeight);
//     this._calculateCanvasScale(physicalWidth, physicalHeight);
// }