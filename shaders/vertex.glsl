attribute vec4 vPosition;
attribute vec4 vColor;
varying vec4 fColor;
uniform mat4 u_viewMatrix;
void main()
{
    gl_Position = u_viewMatrix * vPosition;
    gl_PointSize = 10.0;    
    //fColor = vColor;
}