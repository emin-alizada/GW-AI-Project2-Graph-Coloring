import Vertex from "./Vertex.js";

const CreateVerticesFromEdgeList = (edgeList, colorCount) => {
    const vertices = [];
    const VerticesSet = new Set()

    for (const [a, b] of edgeList) {
        VerticesSet.add(a)
        VerticesSet.add(b)
    }

    VerticesSet.forEach(vertexName => {
        const vertex = new Vertex("new", {
            name: vertexName
        })
        vertex.setUpDomainValues(colorCount)
        vertices.push(vertex)
    })

    edgeList.forEach(edge => {
        const [a, b] = edge
        const vertexA = vertices.find(vertex => vertex.name === a)
        const vertexB = vertices.find(vertex => vertex.name === b)
        vertexA.addNeighbor(b)
        vertexB.addNeighbor(a)
    })

    return vertices;
}

export default CreateVerticesFromEdgeList;