class GLCanvas {
    constructor(attach) {
        this.canvas = attach;
        this.gl = this.canvas.getContext("webgl");

        this.resolutionScaling = 100;
        this.initializeCanvas();

        this.programs = new Map();
        this.programs.set("MAIN", new GLProgram(this.gl));
        this.objects = [];
        var mainProgram = this.programs.get("MAIN");
        mainProgram.shaders.set("VERTEX", new Shader(this.gl.VERTEX_SHADER, "shaders/vertex.glsl", this.gl));
        mainProgram.shaders.set("FRAGMENT", new Shader(this.gl.FRAGMENT_SHADER, "shaders/fragment.glsl", this.gl));
        mainProgram.attachAndLink();

    }

    allocateObject(mutable = false) {
        var obj = (mutable) ? new GLMutableObject(this.gl) : new GLObject(this.gl);
        this.objects.push(obj);
        return obj;
    }

    initializeCanvas() {
        var rect = this.canvas.getBoundingClientRect();
        this.canvas.width = (rect.right - rect.left) * (this.resolutionScaling / 100);
        this.canvas.height = (rect.bottom - rect.top) * (this.resolutionScaling / 100);

    }

    clear(col = BLUE) {
        this.gl.clearColor(col.r, col.g, col.b, col.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    
    setupDraw() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.clear();
        //this.gl.enable(this.gl.DEPTH_TEST);
        this.programs.get("MAIN").enable();
    }

    draw() {
        var self = this;
        self.setupDraw();
        this.objects.forEach(element => {
            self.drawObject(element);
        })
    }

    drawObject(obj) {
        var globals = GlobalVars.getInstance();
        var mathhelper = MathHelper.getInstance();

        var vertexLocation = this.programs.get("MAIN").getAttributeLocation("vPosition");
        var matrixLocation = this.programs.get("MAIN").getUniformLocation("u_viewMatrix");

        var m = MatrixBuilder.identity();

        obj.setupBufferAttributes(vertexLocation, obj.positionBuffer);
        this.gl.uniformMatrix4fv(matrixLocation, false, m);
        obj.draw();
    }
};