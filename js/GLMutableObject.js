class GLMutableObject extends GLObject {
    constructor(glContext) {
        super(glContext);
        this.positionBuffer = new GLStreamableBuffer(
            glContext, 
            2,
            glContext.FLOAT,
            false,
            0,
            0 
        );
        this.primitiveType = glContext.LINE_STRIP;
    }
};