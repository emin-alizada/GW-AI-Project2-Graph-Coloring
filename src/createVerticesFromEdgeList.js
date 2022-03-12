import Vertex from "./Vertex.js";

const CreateVerticesFromEdgeList = (edgeList, colorCount) => {
    const vertices = [];
    // Creating set, because the input file
    // doesn't give information about the vertices that we have
    const VerticesSet = new Set()

    // Adding each vertex that we encounter from edge list to the set
    for (const [a, b] of edgeList) {
        VerticesSet.add(a)
        VerticesSet.add(b)
    }

    // Creating vertices from the set with their domain values
    // and adding them to the vertices array
    VerticesSet.forEach(vertexName => {
        const vertex = new Vertex("new", {
            name: vertexName
        })
        vertex.setUpDomainValues(colorCount)
        vertices.push(vertex)
    })

    // Adding edges to the vertices
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