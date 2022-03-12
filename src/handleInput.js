import fs from "fs"

export default function getEdgeListAndColorCount(path) {
    const edgeList = []
    let colorCount = 0;

    // Read the file
    let data = fs.readFileSync(path, 'utf8')
    // Split the file into lines
    const lines = data.split(/\r?\n/)
    // Loop through the lines
    for (const line of lines) {
        // Skipping line in case of comment
        if (line[0] === '#') continue
        // Finding the number of colors, if line has a color
        if (line.includes('colors')) { colorCount = parseInt(line.split("=")[1]) }
        else {
            // Reading the edge
            let list = line.split(",").map(e => parseInt(e))
            if (list && !isNaN(list[0]))
                edgeList.push(list)
        }
    }

    return { edgeList, colorCount }
}