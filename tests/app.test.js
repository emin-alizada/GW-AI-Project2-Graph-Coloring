import getEdgeListAndColorCount from "../src/handleInput.js";
import createVerticesFromEdgeList from "../src/createVerticesFromEdgeList.js";
import backtracking from "../src/backtracking.js";
import {testsWithoutSolutions, testsWithSolutions} from "./testUnits.js";


testsWithoutSolutions.forEach(inputPath => {
    test(`Testing ${inputPath}`, () => {
        const {edgeList, colorCount} = getEdgeListAndColorCount(inputPath);

        let vertices = createVerticesFromEdgeList(edgeList, colorCount);

        const resultVertices = backtracking(vertices);

        expect(resultVertices).toBe(false);
    });
})

testsWithSolutions.forEach(testUnit => {
    test(`Testing ${testUnit.path}`, () => {
        const {edgeList, colorCount} = getEdgeListAndColorCount(testUnit.path);

        let vertices = createVerticesFromEdgeList(edgeList, colorCount);

        const resultVertices = backtracking(vertices);

        let solution = "";
        resultVertices.forEach(vertex => {
            solution += `${vertex.name}: ${vertex.assignedColor}\n`;
        })

        expect(solution).toBe(testUnit.solution);
    });
})
