import Vertex from "./Vertex.js";

// This performs the AC-3 consistency check heuristic
function inference(inferenceArcs, vertices) {
    while (inferenceArcs.length > 0) {
        let [from, to] = inferenceArcs.pop(); // From is Xi, to is Xj from the paper

        const removed = removeInconsistentValues(from, to);

        if (removed) {

            if (to.domain.length === 0) {
                return false;
            }

            to.getNeighbors(vertices).filter(neighbor => (neighbor.assignedColor === -1 && neighbor.name !== from.name)).forEach(neighbor => {
                inferenceArcs.push([to, neighbor]);
            });

        }
    }
    
    return true;
}

function removeInconsistentValues(from, to) {
    let removed = false;

    if (from.domain.length === 1) {
        let neighbourDomainLength = to.domain.length;

        to.domain.filter(domainValue => domainValue !== from.domain[0]);

        removed = neighbourDomainLength !== to.domain.length;
    }

    return removed;
}

// This function orders the domain values of the variable according to LCV heuristic
function orderDomainValues(vertices, vertex) {
    const rankingOfDomainValues = vertex.domain.map(domainValue => {
        const count = vertex.getNeighbors(vertices).filter(neighbor => neighbor.domain.findIndex((dValue) => dValue === domainValue) !== -1).length

        return {
            domainValue,
            count
        }
    })

    return rankingOfDomainValues.sort((a, b) => b.count - a.count).map(rankedDomainValue => rankedDomainValue.domainValue)
}

// This function selects unassigned variables according to MRV heuristic
function selectUnassigned(vertices) {
    let min = Number.MAX_SAFE_INTEGER;
    let selectedVertex = null;

    for (let vertex of vertices) {
        if (vertex.assignedColor === -1 && vertex.domain.length < min) {
            min = vertex.domain.length;
            selectedVertex = vertex;
        }
    }

    return selectedVertex;
}

function isPossibleToAssign(color, selectedVertex, vertices) {
    return selectedVertex.getNeighbors(vertices).filter(neighbor => neighbor.assignedColor === color).length === 0;
}

function backtracking(vertices){
    // Checking if all vertices have been assigned
    if (!vertices.some(vertex => vertex.assignedColor === -1)) {
        return vertices;
    }

    // Selecting unassigned variable with MRV heuristic
    const selectedVertex = selectUnassigned(vertices);
    // Ordering domain values of the selected variable according to LCV heuristic
    const orderedDomainValuesOfSelectedVertex = orderDomainValues(vertices, selectedVertex);

    for (let domainValue of orderedDomainValuesOfSelectedVertex) {
        // Creating a copy of the vertices array, so that the original one is not modified
        // To be able to backtrack
        const verticesCopy = vertices.map(vertex => new Vertex('copy', vertex));
        const selectedVertexFromCopy = verticesCopy.find(vertex => vertex.name === selectedVertex.name);

        if (isPossibleToAssign(domainValue, selectedVertexFromCopy, verticesCopy)) {
            selectedVertexFromCopy.domain = [domainValue];

            const inferenceArcs = selectedVertexFromCopy.getNeighbors(verticesCopy).filter(neighbor => neighbor.assignedColor === -1).map(neighbor => [selectedVertexFromCopy, neighbor]);

            const inferenceResult = inference(inferenceArcs, verticesCopy);

            if (inferenceResult) {
                selectedVertexFromCopy.assignedColor = domainValue;
                return backtracking(verticesCopy);
            }

        }
    }

    return false;
}

export default backtracking;