class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  //this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let node of vertexArray) {
      this.addVertex(node)
    }
  }

  // this function accepts two vertices (nodes) and updates their adjacent values to include the other vertex
  addEdge(vertex1, vertex2) {
    vertex1.adjacent.add(vertex2)
    vertex2.adjacent.add(vertex1)
  }

  // this function accepts two vertices (nodes) and updates their adjacent values to remove the other vertex
  removeEdge(vertex1, vertex2) {
    vertex1.adjacent.delete(vertex2)
    vertex2.adjacent.delete(vertex1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    //deletes the vertex out of the nodes Set
    this.nodes.delete(vertex)

    //deletes the vertex from each node's adjacent Set
    this.nodes.forEach(obj => {
      if (obj.adjacent.has(vertex)) {
        obj.adjacent.delete(vertex)
      }
    })
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let visitStack = [];
    visitStack.push(start)

    let visitedNode = [];

    let seen = new Set(visitStack);

    while (visitStack.length) {
      let currNode = visitStack.pop()

      visitedNode.push(currNode.value)

      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          visitStack.push(neighbor)
          seen.add(neighbor)
        }
      }
    }

    return visitedNode;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let visitQueue = [];
    visitQueue.push(start)

    let visitedNode = [];

    let seen = new Set(visitQueue);

    while (visitQueue.length) {
      let currNode = visitQueue.shift()

      visitedNode.push(currNode.value)

      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          visitQueue.push(neighbor)
          seen.add(neighbor)
        }
      }
    }

    return visitedNode;
  }
}

module.exports = { Graph, Node }

