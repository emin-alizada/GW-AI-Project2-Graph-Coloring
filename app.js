import getEdgeListAndColorCount from "./handleInput.js";
import createVerticesFromEdgeList from "./createVerticesFromEdgeList.js";
import backtrackplus from "./backtrackplus.js";

// const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input0.txt")
// const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input1.txt")
// const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input3.txt")


// No solutions
const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input4.txt")
// const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input5.txt")
// const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input6.txt")
// const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input7.txt")
// const { edgeList, colorCount } = getEdgeListAndColorCount("./inputs/input9.txt")





let vertices = createVerticesFromEdgeList(edgeList, colorCount)

const resultVertices = backtrackplus(vertices);

if (resultVertices) {
    console.log("Solution Found!")

    resultVertices.forEach(vertex => {
        console.log(vertex.name + ": " + vertex.assignedColor)
    })
} else {
  console.log("No solution found");
}