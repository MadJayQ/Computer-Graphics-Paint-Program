var includes = [
    "js/Color.js",
    "js/GLCanvas.js",
    "js/GLShader.js",
    "js/GLProgram.js",
    "js/GLObject.js",
    "js/GLBuffer.js",
    "js/GLStreamableBuffer.js",
    "js/GLMutableObject.js",
    "js/GLCursor.js",
    "js/GLBrush.js",
    "js/GLRectangleBrush.js",
    "js/GLMatrix.js"
];

var start = 0;
class App {
    constructor() {
        this.glInitCallback = () => {};
    }
    onPageLoad() {
        includes.forEach((value, index, array) => {
            $.getScript(
                value, (data, status, jqxhr) => {
                    console.log("Loaded: " + value + " status: (" + jqxhr.status + ")" + status);
                }
            );
        });
        var canvas = $('#paintCanvas')[0];
        this.renderer = new GLCanvas(canvas);
        this.cursor = new GLCursor(this.renderer);
        this.activeBrush = new GLRectangleBrush(this.renderer.gl);
        console.log("Running WebGL Version: " + this.renderer.gl.getParameter(this.renderer.gl.VERSION));
        this.glInitCallback();
    }
    main() {
        /*
            Do any initialization in here
        */
        start = Date.now();
        GlobalVars.getInstance().setTickrate(60);
        this.cursor.onPolygonStart = () => {
            this.activeBrush.strokeBegin(this.renderer.allocateObject(false));
        };
        this.cursor.onPolygonEnd = () => {
            this.activeBrush.strokeEnd();
        };

        this.loop();
    }

    loop() {
        var globals = GlobalVars.getInstance();
        
        var time = Date.now() - start;
        var delta = time - globals.lasttime;
        var targettime = globals.tickinterval * 1000;

        delta *= globals.timescale;

        globals.lasttime = time;
        globals.frametime += delta;

        var estimatedticks = Math.ceil(globals.frametime / targettime);
        if(estimatedticks < 10) {
            while(globals.frametime >= targettime) {
                globals.tickcount++;
                globals.frametime -= targettime;
                this.tick(globals.tickinterval);
            }
        } else {
            //Reset our timer
            globals.frametime = 0; 
        }
        globals.framecount++;
        globals.curtime = time;
        globals.interpolation = globals.frametime / targettime;

        var framestart = Date.now();
        this.render();
        var frameend = Date.now();
        globals.framedelay = (frameend - framestart) / 1000;

        requestAnimationFrame(() => { this.loop(); });
    }

    tick(dt) {
        var input = this.cursor.aggregatedInput;
        var brush = this.activeBrush;
        input.filter(entry => entry.clicked).forEach((pos) => {
            brush.stroke(pos);
        });
        brush.finalizeStroke();
        this.cursor.aggregatedInput = [];
    }

    render() {
        this.renderer.draw();
    }
};