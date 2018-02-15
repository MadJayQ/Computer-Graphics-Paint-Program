class GLBrush {
    constructor(glContext, canvas) {
        this.ctx = glContext;
        this.activeObject = null;
        this.vertices = [];
    }

    strokeBegin(newObject) {
        this.activeObject = newObject;
    }

    strokeEnd() {
        this.activeObject = null;
    }

    stroke(pos) {
        this.vertices.push(pos.x);
        this.vertices.push(pos.y);
    }

    finalizeStroke() {
        if(this.activeObject instanceof GLMutableObject) {
            this.activeObject.positionBuffer.streamDataToBuffer(this.vertices);
            this.vertices = [];
        }
    }
};