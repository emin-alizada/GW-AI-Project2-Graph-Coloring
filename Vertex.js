export default class Vertex {
    constructor(type, properties) {
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

    setUpDomainValues(colorCount) {
        for (let i = 1; i <= colorCount; i++) {
            this.domain.push(i);
        }
    }

    addNeighbor(vertexName) {
        this.adjacentVertices.add(vertexName)
    }

    getNeighbors(vertices) {
        return vertices.filter(vertex => this.adjacentVertices.has(vertex.name))
    }

    _constructNew(properties) {
        this.name = properties.name
        this.adjacentVertices = new Set();
        this.domain = [];
        this.assignedColor = -1;
    }

    _constructFromExisting(properties) {
        this.name = properties.name
        this.adjacentVertices = new Set(Array.from(properties.adjacentVertices));
        this.domain = [...properties.domain];
        this.assignedColor = properties.assignedColor;
    }
}





