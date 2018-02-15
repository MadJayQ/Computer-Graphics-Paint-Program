var maxVertices = 20000;
var pageSize = 4096;
class GLStreamableBuffer extends GLBuffer {
    constructor(glContext, size, type, normalize, stride, offset) {
        super(glContext, size, type, normalize, stride, offset);
        this.numPages = 0;
        this.streamIndex = 0;

    }

    streamDataToBuffer(newData) {
        this.bind();
        var estimatedSize = this.data.length + newData.length;
        var currSize = this.numPages * pageSize;
        console.log("Buffer size: " + this.ctx.getBufferParameter(this.ctx.ARRAY_BUFFER, this.ctx.BUFFER_SIZE) + " Estimated Size: " + estimatedSize);
        if(estimatedSize > currSize) {
            //We need to allocate a new page
            //this.allocatePage();
            //console.log("[STREAMABLEBUFFER]: PAGE ALLOCATED (Num pages): " + this.numPages);
        }
        //this.ctx.bufferSubData(this.ctx.ARRAY_BUFFER, this.streamIndex, new Float32Array(newData));
        //this.streamIndex += (newData.length > 0 ) ? (newData.length - 1) : 0;
        this.data = this.data.concat(newData);
        console.log(this.data);
        this.ctx.bufferData(this.ctx.ARRAY_BUFFER, new Float32Array(this.data), this.ctx.DYNAMIC_DRAW);
    }
    allocatePage() {
        this.numPages++;
        this.ctx.bufferData(this.ctx.ARRAY_BUFFER, this.numPages * pageSize, this.ctx.STATIC_DRAW);
        console.log("CURRENT DATA LENGTH: " + this.data.length);
        console.log("New Buffer size: " + this.ctx.getBufferParameter(this.ctx.ARRAY_BUFFER, this.ctx.BUFFER_SIZE));
        this.ctx.bufferSubData(this.ctx.ARRAY_BUFFER, 0, new Float32Array(this.data));
    }
    initializeFromArray(arr) {
        this.streamIndex += (arr.length - 1);
        super.initializeFromArray(arr);
    }
};