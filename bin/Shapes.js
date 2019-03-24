const Shapes = [
    {
        // * * * *
        id: 1,
        type: 'line',
        path: [[0, 3], [0, 4], [0, 5], [0, 6]]
    },
    {
        // *
        // *
        // *
        // *
        id: 2,
        type: 'line',
        path: [[0, 4], [1, 4], [2, 4], [3, 4]]
    },
    {
        // * *
        // * *
        id: 1,
        type: 'cube',
        path: [[0, 4], [1, 4], [0, 5], [1, 5]]
    },
    {
        // * *
        //   * *
        id: 1,
        type: 'romb1',
        path: [[0, 3], [0, 4], [1, 4], [1, 5]]
    },
    {
        //   *
        // * *
        // *
        id: 2,
        type: 'romb1',
        path: [[0, 5], [1, 4], [1, 5], [2, 4]]
    },
    {
        //   * *
        // * *
        id: 1,
        type: 'romb2',
        path: [[1, 3], [0, 4], [1, 4], [0, 5]]
    },
    {
        // *
        // * *
        //   *
        id: 2,
        type: 'romb2',
        path: [[2, 5], [1, 4], [1, 5], [0, 4]]
    },
    {
        // * * *
        //     *
        id: 1,
        type: 'horse1',
        path: [[0, 3], [0, 4], [0, 5], [1, 5]]
    },
    {
        //   *
        //   *
        // * *
        id: 2,
        type: 'horse1',
        path: [[0, 5], [1, 5], [2, 5], [2, 4]]
    },
    {
        // *
        // * * *
        id: 3,
        type: 'horse1',
        path: [[0, 3], [1, 3], [1, 4], [1, 5]]
    },
    {
        // * *
        // *
        // *
        id: 4,
        type: 'horse1',
        path: [[0, 5], [0, 4], [1, 4], [2, 4]]
    },
    {
        // * * *
        // *
        id: 1,
        type: 'horse2',
        path: [[0, 3], [0, 4], [0, 5], [1, 3]]
    },
    {
        // * *
        //   *
        //   *
        id: 2,
        type: 'horse2',
        path: [[0, 4], [0, 5], [1, 5], [2, 5]]
    },
    {
        //     *
        // * * *
        id: 3,
        type: 'horse2',
        path: [[0, 5], [1, 3], [1, 4], [1, 5]]
    },
    {
        // *
        // *
        // * *
        id: 4,
        type: 'horse2',
        path: [[0, 4], [1, 4], [2, 4], [2, 5]]
    },
    {
        // * * *
        //   *
        id: 1,
        type: 'triangle',
        path: [[0, 3], [0, 4], [0, 5], [1, 4]]
    },
    {
        //   *
        // * *
        //   *
        id: 2,
        type: 'triangle',
        path: [[0, 4], [1, 4], [2, 4], [1, 3]]
    },
    {
        //   *
        // * * *
        id: 3,
        type: 'triangle',
        path: [[1, 3], [1, 4], [1, 5], [0, 4]]
    },
    {
        // *
        // * *
        // *
        id: 4,
        type: 'triangle',
        path: [[0, 3], [1, 3], [2, 3], [1, 4]]
    },
]

class Shape {
    constructor(shape) {
        this.id = shape.id;
        this.type = shape.type;
        this.path = [];
        for (let i = 0; i < shape.path.length; i++) {
            this.path[i] = []
            for (let j = 0; j < 2; j++) {
                this.path[i][j] = shape.path[i][j];
            }
        }
    }
}

/*
*   Return a Random Shape
*/

const generateRandomShape = () => {
    let shape = Shapes[Math.floor(Math.random() * Shapes.length)];
    return new Shape(shape);
}

/**
 * Return a Shape by index
 * @param index: index in constant shapes
 */

const generateShapeByIndex = (index) => {
    let shape = Shapes[index];
    return new Shape(shape);
}

exports.generateRandomShape = generateRandomShape;
exports.generateShapeByIndex = generateShapeByIndex;
exports.Shape = Shape;