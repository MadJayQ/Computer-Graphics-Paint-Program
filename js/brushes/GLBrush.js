class GLBrush {
    constructor(glContext, canvas) {
        this.canvas = canvas;
        this.ctx = glContext;
        this.activeObject = null;
        this.vertices = [];

        this.mutable = true;
    }


    interceptKeyEvent(event) {
        
    }

    strokeBegin(newObject, pos) {
        this.activeObject = newObject;
    }

    strokeEnd(pos) {
        this.activeObject = null;
    }

    stroke(pos) {
        this.vertices.push(pos.x);
        this.vertices.push(pos.y);
    }

    finalizeStroke() {
        if(this.activeObject == null) return;
        if(this.activeObject instanceof GLMutableObject) {
            this.activeObject.positionBuffer.streamDataToBuffer(this.vertices);
            this.vertices = [];
        } else {
            this.vertices = this.construct();
            this.activeObject.positionBuffer.initializeFromArray(this.vertices);
            this.vertices = [];
        }
    }
};