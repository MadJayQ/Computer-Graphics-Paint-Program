class GLRectangleBrush extends GLBrush{
    constructor(glContext, canvas) {
        super(glContext, canvas);

        this.anchorPos = [0,0];
        this.endPos = [0,0];
    }


    stroke(pos) {
        if(this.vertices.length == 0) { //this is our first entry
            this.anchorPos[0] = pos.x;
            this.anchorPos[1] = pos.y;
        }

        super.stroke(pos);
    }

    finalizeStroke() {
        this.endPos[0] = this.vertices[this.vertices.length - 2];
        this.endPos[1] = this.vertices[this.vertices.length - 1];
        this.vertices = [this.anchorPos[0], this.anchorPos[1], this.endPos[0], this.endPos[1]];
        super.finalizeStroke();
    }
};