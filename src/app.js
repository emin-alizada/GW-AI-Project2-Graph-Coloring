import getEdgeListAndColorCount from "./handleInput.js";
import createVerticesFromEdgeList from "./createVerticesFromEdgeList.js";
import backtracking from "./backtracking.js";

// Input examples:

// Solution Exists

// const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input0.txt")
// const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input1.txt")
const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input3.txt")


// No solutions

// const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input4.txt")
// const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input5.txt")
// const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input6.txt")
// const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input7.txt")
// const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input9.txt")


// Transforming read input to desired format, creating list of vertices
let vertices = createVerticesFromEdgeList(edgeList, colorCount)

// Solution of problem with backtracking and usage of heruistics
const resultVertices = backtracking(vertices);

if (resultVertices) {
    console.log("Solution Found!")

    // Printing solution if exists
    resultVertices.forEach(vertex => {
        console.log(vertex.name + ": " + vertex.assignedColor)
    })
} else {
  console.log("No solution found");
}