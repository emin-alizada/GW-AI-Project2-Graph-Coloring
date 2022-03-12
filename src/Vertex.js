export default class Vertex {
    constructor(type, properties) {
        // JS doesn't support overloading,
        // so I have to use custom logic to determine which constructor to call

        // copy constructor is used to copy an existing vertex,
        // used for backtracking
        switch (type){
            case 'new': {
                this._constructNew(properties)
                break
            }
            case 'copy': {
                this._constructFromExisting(properties)
                break
            }
        }
    }

    // Adding domain values for vertex
    setUpDomainValues(colorCount) {
        for (let i = 1; i <= colorCount; i++) {
            this.domain.push(i);
        }
    }

    // Adding adjacent vertices to vertex
    addNeighbor(vertexName) {
        this.adjacentVertices.add(vertexName)
    }

    // Returns the actual Vertex instance of adjacent vertices
    getNeighbors(vertices) {
        return vertices.filter(vertex => this.adjacentVertices.has(vertex.name))
    }

    // Constructs new vertex
    _constructNew(properties) {
        this.name = properties.name
        this.adjacentVertices = new Set();
        this.domain = [];
        this.assignedColor = -1;
    }

    // Copies Vertex instance
    _constructFromExisting(properties) {
        this.name = properties.name
        this.adjacentVertices = new Set(Array.from(properties.adjacentVertices));
        this.domain = [...properties.domain];
        this.assignedColor = properties.assignedColor;
    }
}





