![Github Unit Testiing](https://github.com/emin-alizada/GW-AI-Project2-Graph-Coloring/actions/workflows/node.js.yml/badge.svg?branch=master)

# Project 2: CSP Graph Coloring (CS 6511 – AI)

### The George Washington University
### Spring 2022
### Professor: Dr. Amrinder Arora
### Student: Emin Alizada

---

## How To Run

Make sure you have installed Node.js and npm on your local machine. My machine is running MacOS Monterey, Node v16.11.0, npm v8.0.0

If you don't have Node.js, you can download it from [here](https://nodejs.org/en/download/).

Clone the project from the GitHub repository, and run the following command on root directory of the project:

    npm install

Then run the following command to run the application:

    npm run code

To run the unit tests run the following command:

    npm run test

I am using Jest to unit test the application.

More information about Jest can be found here: https://jestjs.io/

---

## Description

You are given a graph in the form of a text file, that you are supposed to color. The proper vertex coloring is such that each vertex is assigned a color and no two adjacent vertices are assigned the same color. Input format can be found in inputs folder

## Algorithm

Write a CSP algorithm to solve this coloring problem. The CSP algorithm should have the following components:
- Search algorithm to solve the CSP
- Heuristics (min remaining values, least constraining value)
- Constraint propagation using AC3.

--- 

## Implementation

The entry point of the application is the `src/app.js` file. It calls `getEdgeListAndColorCount(pathToFile)` function from `src/handleInput.js` file to read the input file, and get the list of edges and number of available colors. 

After that I pass the edge list and number of available colors to `createVerticesFromEdgeList(edgeList, colorCount)` function from `src/createVerticesFromEdgeList.js` to create proper vertices for my backtracking search.


As the vertices are now properly constructed, I use `backtracking(vertices)` function from `src/backtracking.js` file to solve the CSP.

Finally, I print the solution to the console, if there exists one.

All the files are well documented with comments, but let's see how the backtracking function works as it is the core of the algorithm.

## Backtracking Details

Backtracking is implemented using a recursive function. The function is called with the list of vertices. As the fisrt thing I check if all the vertices have assigned a color. If so, I return the list of vertices. Otherwise, I pick a vertex with `selectUnassigned(vertices)` function which implements min remaining values heuristic. Then I order domain values of the vertex with `orderDomainValues(vertices, vertex)` function which implements the least constraining value heuristic. 

Then I pick the first value in the domain and check if it is possible to assign it to the vertex (priorly creating a copy of the vertices array to be able to backtrack to current state of vertices). If it is not possible I try the next value in the domain.

If it is possible, I assign the value to the vertex and do constraint propagation using AC3. If the propagation is successful, I call the function again with the list of vertices. If the propagation is not successful, I try the next value in the domain.

Backtracking function returns the list of vertices if all the vertices have been assigned a color. Otherwise, it returns `false`.
