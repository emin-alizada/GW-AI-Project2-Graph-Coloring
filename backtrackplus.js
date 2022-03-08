import Vertex from "./Vertex.js";

// This performs the AC-3 consistency check heuristic
function inference(inferenceArcs, vertices) {
    while (inferenceArcs.length > 0) {
        let [from, to] = inferenceArcs.pop(); // From is Xi, to is Xj from the paper

        const removed = remove_inconsistent_values(from, to);

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

function remove_inconsistent_values(from, to) {
    let removed = false;

    if (from.domain.length === 1) {
        let neighbourDomainLength = to.domain.length;

        to.domain.filter(domainValue => domainValue !== from.domain[0]);

        removed = neighbourDomainLength !== to.domain.length;
    }

    return removed;
}

// This function orders the domain values of the variable according to LCV heuristic
function order_domain_values(vertices, vertex) {
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
function select_unassigned(vertices) {
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

function is_possible(color, selectedVertex, vertices) {
    return selectedVertex.getNeighbors(vertices).filter(neighbor => neighbor.assignedColor === color).length === 0;
}

function backtrackplus(vertices){
    if (!vertices.some(vertex => vertex.assignedColor === -1)) {
        return vertices;
    }

    const selectedVertex = select_unassigned(vertices);
    const orderedDomainValuesOfSelectedVertex = order_domain_values(vertices, selectedVertex);

    for (let domainValue of orderedDomainValuesOfSelectedVertex) {
        const verticesCopy = vertices.map(vertex => new Vertex('copy', vertex));
        const selectedVertexFromCopy = verticesCopy.find(vertex => vertex.name === selectedVertex.name);

        if (is_possible(domainValue, selectedVertexFromCopy, verticesCopy)) {
            // TODO Check 147 line from the code
            selectedVertexFromCopy.domain = [domainValue];

            const inferenceArcs = selectedVertexFromCopy.getNeighbors(verticesCopy).filter(neighbor => neighbor.assignedColor === -1).map(neighbor => [selectedVertexFromCopy, neighbor]);

            const inferenceResult = inference(inferenceArcs, verticesCopy);

            if (inferenceResult) {
                selectedVertexFromCopy.assignedColor = domainValue;
                return backtrackplus(verticesCopy);
            }

        }
    }

    return false;
}

export default backtrackplus;