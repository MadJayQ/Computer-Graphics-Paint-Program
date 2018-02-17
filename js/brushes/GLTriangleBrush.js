class GLTriangleBrush extends GLBrush{
    constructor(glContext, canvas) {
        super(glContext, canvas);

        this.anchorPos = [0,0];
        this.endPos = [0,0];
        this.mutable = false;
        this.points = [];
    }

    strokeBegin(obj, pos) {
        if(this.activeObject == null) {
            this.points.push(pos.x);
            this.points.push(pos.y);
        } else {
            this.points.push(this.endPos.x);
            this.points.push(this.endPos.y);
        }
        this.anchorPos[0] = pos.x;
        this.anchorPos[1] = pos.y;
        obj.primitiveType = (this.points.length == 6) ? this.ctx.TRIANGLE : this.ctx.LINES;
        super.strokeBegin(obj);
    }
    strokeEnd(pos) {
        this.points.push(this.endPos[0]);
        this.points.push(this.endPos[1]);
        console.log(this.points.length);
        if(this.points.length == (3 * 2)) {
            console.log("END");
            console.log(this.points);
            super.strokeEnd(pos);
        }
        //Finalize buffer
    }
    stroke(pos) {
        this.endPos[0] = pos.x;
        this.endPos[1] = pos.y;
        this.po
        super.stroke(pos);
    }

    construct() {

        return this.points;
    }
}; 