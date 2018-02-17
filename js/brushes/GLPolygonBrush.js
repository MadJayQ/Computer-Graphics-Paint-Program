class GLPolygonBrush extends GLBrush{
    constructor(glContext, canvas) {
        super(glContext, canvas);

        this.anchorPos = [0,0];
        this.endPos = [0,0];
        this.mutable = true;
        this.first = false;
        this.finalize = false;
    }

    interceptKeyEvent(event) {
        if(event.keyCode == 13) {
            this.finalize = true;
            console.log("FINALIZE");
        }
    }

    strokeBegin(obj, pos) {
        this.first = this.activeObject == null;
        this.anchorPos[0] = (this.activeObject == null) ? pos.x : this.endPos[0];
        this.anchorPos[1] = (this.activeObject == null) ? pos.y : this.endPos[1];
        obj.primitiveType = this.ctx.LINES;
        super.strokeBegin(obj);
        if(this.first) {
            super.stroke(pos);
        }
    }
    strokeEnd(pos) {
        this.vertices = this.construct();
        if(this.finalize) {
            super.strokeEnd(pos);
        }
        //Finalize buffer
    }
    stroke(pos) {
        if(this.first) {
            super.stroke(pos);
            this.first = false;
        }
        this.endPos[0] = pos.x;
        this.endPos[1] = pos.y;
        this.activeObject.positionBuffer.overrideVertex(pos, 1);
        //super.stroke(pos);
    }

    construct() {
        var a = [this.anchorPos[0], this.anchorPos[1]];
        var b = [this.endPos[0], this.endPos[1]];

        return [
            a[0], a[1], b[0], b[1]
        ];
    }
};