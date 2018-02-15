class CursorInput {
    constructor(clicked, x, y) {
        this.x = x;
        this.y = y;
        this.clicked = clicked;
    }
}

class GLCursor {
    constructor(canvas) {
        this.clicked = false;
        this.canvas = canvas;
        var self = this;
        canvas.addEventListener("mousemove", (event) => {self.onMouseMove(event);});
        canvas.addEventListener("mousedown", () => { self.onMouseButtonChange(true); });
        canvas.addEventListener("mouseup", () => {self.onMouseButtonChange(false);}); 

        this.aggregatedInput = [];
        this.drawing = false;
        this.onPolygonStart = () => {console.log("Polygon Start");};
        this.onPolygonEnd = () => {console.log("Polygon End");};
    }

    translateEventCoordinates(event) {
        var rect = this.canvas.getBoundingClientRect();
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
    }

    normalizeCoordinates(pos) {
        var width = this.canvas.width;
        var height = this.canvas.height;
        return {
            x: pos.x / width,
            y: pos.y / height
        };
    }

    onMouseMove(event) {
        //var x = 2 * event.clientX / this.canvas.width - 1;
        //var y = 2 * (this.canvas.height - event.clientY) / this.canvas.height - 1;
        var rect = this.canvas.getBoundingClientRect();
        var w = (rect.right - rect.left);
        var h = (rect.top - rect.bottom);
        var x = (event.clientX - rect.left) / w;
        var y = -(event.clientY - rect.top) / h;
        
        //if(this.clicked) alert("X: " + x + " Y: " + y);
        var input = new CursorInput(this.clicked, x, y);
        this.aggregatedInput.push(input);
    }

    onMouseButtonChange(down) {
        if(down == false) {
            while(this.aggregatedInput.length) {
                this.aggregatedInput.pop();
            }
            this.drawing = false;
            this.onPolygonEnd();
        }
        if(down == true && !this.drawing) {
            this.drawing = true;
            this.onPolygonStart();
        }
        this.clicked = down;
    }
};