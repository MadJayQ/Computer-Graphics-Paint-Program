class GLObject {
    constructor(glContext) {
        this.ctx = glContext;
        this.primitiveType = this.ctx.TRIANGLES;
    }

    setupBufferAttributes(attribute, buffer) {
        this.ctx.enableVertexAttribArray(attribute);
        buffer.bind();
        this.ctx.vertexAttribPointer(
            attribute,
            buffer.size,
            buffer.type,
            buffer.normalize,
            buffer.stride,
            buffer.offset 
        );
    }

    draw() {
        this.ctx.drawArrays(this.ctx.POINTS, 0, this.positionBuffer.data.length / this.positionBuffer.size);
    }
}