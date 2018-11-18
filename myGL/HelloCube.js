var c = document.getElementById("webgl");
var ctx = c.getContext("2d");



function drawTriAngle(v2s) {
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.moveTo(v2s[0][0], v2s[0][1]);
    ctx.lineTo(v2s[1][0], v2s[1][1]);
    ctx.lineTo(v2s[2][0], v2s[2][1]);
    // ctx.moveTo(10, 10);
    // ctx.lineTo(10, 100);
    // ctx.lineTo(100, 100);
    ctx.closePath();
    ctx.fill();
}

function V4ToV2(v4) {
    var x = Math.round(c.width/2 + v4.elements[0]*c.width/2);
    var y = Math.round(c.height/2 - v4.elements[1]*c.height/2);
    return [x,y];
}

function drawObj(vertex, index) {
    for(var i=0; i<index.length; i=i+3){
        var vertexIndex1 = index[i];
        var vertex1 = [vertex[vertexIndex1*3],vertex[vertexIndex1*3+1],vertex[vertexIndex1*3+2],1];
        var finalV4Vector1 = getFinalV4(new Vector4(vertex1));

        var vertexIndex2 = index[i+1];
        var vertex2 = [vertex[vertexIndex2*3],vertex[vertexIndex2*3+1],vertex[vertexIndex2*3+2],1];
        var finalV4Vector2 = getFinalV4(new Vector4(vertex2));

        var vertexIndex3 = index[i+2];
        var vertex3 = [vertex[vertexIndex3*3],vertex[vertexIndex3*3+1],vertex[vertexIndex3*3+2],1];
        var finalV4Vector3 = getFinalV4(new Vector4(vertex3));

        var v21 = V4ToV2(finalV4Vector1);
        var v22 = V4ToV2(finalV4Vector2);
        var v23 = V4ToV2(finalV4Vector3);

        drawTriAngle([v21, v22, v23]);
    }
}

function getFinalV4(v4) {
    return mvpMatrix.multiplyVector4(v4);
}

var mvpMatrix;
function main() {
    // Set the eye point and the viewing volume
    mvpMatrix = new Matrix4();
    mvpMatrix.setPerspective(45, 1, 1, 100);

    var w = 400/20, h = 400/20, n = 1, f = 100;
    mvpMatrix.elements = new Float32Array([2*n/w,0,0,0, 0,2*n/h,0,0, 0,0,f/(f-n),1, 0,0,-n*f/(f-n),0]);
    mvpMatrix.lookAt(2, 2, 50, 0, 0, 0, 0, 1, 0);

    // Draw the cube
    drawObj(cubeVertices,cubeIndices);
}


// Create a cube
//    v6----- v5
//   /|      /|
//  v1------v0|
//  | |     | |
//  | |v7---|-|v4
//  |/      |/
//  v2------v3
var cubeVertices = new Float32Array([
    // Vertex coordinates
    1.0, 1.0, 1.0,  // v0 White
    -1.0, 1.0, 1.0,  // v1 Magenta
    -1.0, -1.0, 1.0,  // v2 Red
    1.0, -1.0, 1.0,  // v3 Yellow
    1.0, -1.0, -30.0,  // v4 Green
    1.0, 1.0, -30.0,  // v5 Cyan
    -1.0, 1.0, -30.0,  // v6 Blue
    -1.0, -1.0, -30.0  // v7 Black
]);

// Indices of the vertices
var cubeIndices = new Uint8Array([
    0, 1, 2, 0, 2, 3,    // front
    0, 3, 4, 0, 4, 5,    // right
    0, 5, 6, 0, 6, 1,    // up
    1, 6, 7, 1, 7, 2,    // left
    7, 4, 3, 7, 3, 2,    // down
    4, 7, 6, 4, 6, 5     // back
]);
