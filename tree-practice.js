const { BinarySearchTree, TreeNode } = require("./binary-search-tree.js");
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST(rootNode) {
  let currentNode = rootNode;
  while (currentNode.left) {
    currentNode = currentNode.left;
  }
  return currentNode.val;
}

function findMaxBST(rootNode) {
  let currentNode = rootNode;
  while (currentNode.right) {
    currentNode = currentNode.right;
  }
  return currentNode.val;
}

function findMinBT(rootNode) {
  let queue = [rootNode];
  let min = Infinity;
  while (queue.length) {
    const currentNode = queue.shift();
    if (currentNode.val < min) min = currentNode.val;
    if (currentNode.right) queue.push(currentNode.right);
    if (currentNode.left) queue.push(currentNode.left);
  }
  return min;
}

function findMaxBT(rootNode) {
  let queue = [rootNode];
  let max = -Infinity;
  while (queue.length) {
    const currentNode = queue.shift();
    if (currentNode.val > max) max = currentNode.val;
    if (currentNode.right) queue.push(currentNode.right);
    if (currentNode.left) queue.push(currentNode.left);
  }
  return max;
}

function getHeight(rootNode) {
  if (!rootNode) return -1;
  // recursively call getHeight on the left subtree until we reach the end and return -1 i.e. a height of zero for the leaf node
  let leftHeight = 1 + getHeight(rootNode.left);
  // recursively call getHeight on the right subtree for the same reason as above
  let rightHeight = 1 + getHeight(rootNode.right);
  // return the maximum of the two heights
  return Math.max(leftHeight, rightHeight);
}

function balancedTree(rootNode) {
  let queue = [rootNode];
  // for a tree to be balanced, the following condition must be satisfied:
  // for every node, the height difference between its left and right subtrees is at the most 1.
  while (queue.length > 0) {
    const currentNode = queue.shift();
    const leftHeight = getHeight(currentNode.left);
    const rightHeight = getHeight(currentNode.right);
    if (Math.abs(leftHeight - rightHeight) > 1) return false;
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
  }
  return true;
}

// the above implementation for balancedTree is inefficient as it is O(n^2)
// Following approach is O(n) as we are validating the balance as we determine the
// height of each node. Trick is to return -1 when encountering a node that does not satisfy the
// condition and then propagate that -1 to the first stack frame

// function balancedTree(rootNode) {
//   const checkBalance = (rootNode) => {
//     if (!rootNode) return 0;

//     const leftHeight = checkBalance(rootNode.left);
//     if (leftHeight === -1) return -1;

//     const rightHeight = checkBalance(rootNode.right);

//     if (rightHeight === -1) return -1;

//     if (Math.abs(leftHeight - rightHeight) > 1) return -1;
//     // add plus 1 to include the current node for which we are determing the height (i.e. the root node of the current subtree)
//     return 1 + Math.max(leftHeight, rightHeight);
//   }

//   return checkBalance(rootNode) !== -1;
// }

function countNodes(rootNode) {
  let count = 0;
  let queue = [rootNode];
  while (queue.length > 0) {
    const currentNode = queue.shift();
    count++;
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
  }
  return count;
}

// function getParentNode(rootNode, target) {
//   if (!rootNode) return undefined;
//   if (rootNode.val === target) return null;
//   function searchTree(rootNode, target) {
//     if (!rootNode) return;
//     if (rootNode.left && rootNode.left.val === target) return rootNode;
//     if (rootNode.right && rootNode.right.val === target) return rootNode;

//     const leftSubtree = searchTree(rootNode.left, target);
//     if (leftSubtree) return leftSubtree;
//     return searchTree(rootNode.right, target);
//   }

//   return searchTree(rootNode, target);
// }

// the above can also be solved using iterative versions of BFS and DFS as shown below

function getParentNode(rootNode, target) {
  if (rootNode === null) return undefined;
  if (rootNode.val === target) return null;
  const queue = [rootNode];
  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (currentNode.left) {
      if (currentNode.left.val === target) return currentNode;
      else queue.push(currentNode.left);
    }
    if (currentNode.right) {
      if (currentNode.right.val === target) return currentNode;
      else queue.push(currentNode.right);
    }
  }
  return undefined
}

function inOrderPredecessor(rootNode, target) {
  // Your code here
  let previousVal = null;
  let result = null;

  const inOrderTraversal = (rootNode) => {
    if (!rootNode) return;

    inOrderTraversal(rootNode.left);
    if (rootNode.val === target) {
      result = previousVal;
    }

    previousVal = rootNode.val;

    inOrderTraversal(rootNode.right);
  }

  inOrderTraversal(rootNode);
  return result;
}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent
  let previous = null;
  let inOrderPredecessor = null;
  let targetNode = null;
  let parent = null;
  const searchNode = (rootNode, target, parentNode = null) => {
    if (!rootNode) return;
    searchNode(rootNode.left, target, rootNode);
    if (rootNode.val === target) {
      inOrderPredecessor = previous
      parent = parentNode;
      targetNode = rootNode;
    };
    previous = rootNode;
    searchNode(rootNode.right, target, rootNode);
  }
  searchNode(rootNode, target);
  // Undefined if the target cannot be found
  if (!targetNode) return undefined;
  // Set target based on parent
  // Case 0: Zero children and no parent:
  if (!parent && !targetNode.left && !targetNode.right) return null;
  //   return null
  // Case 1: Zero children:
  //   Set the parent that points to it to null
  if (!targetNode.left && !targetNode.right) {
    if (parent.left === targetNode) parent.left = null;
    else parent.right = null;
    return;
  }
  // Case 2: Two children:
  //  Set the value to its in-order predecessor, then delete the predecessor
  //  Replace target node with the left most child on its right side,
  //  or the right most child on its left side.
  //  Then delete the child that it was replaced with.
  if (targetNode.left && targetNode.right) {
    targetNode.val = inOrderPredecessor.val;
    deleteNodeBST(targetNode.left, inOrderPredecessor.val);
    return;
  }
  // Case 3: One child:
  //   Make the parent point to the child
  // handle the case when root node is the target node and has one child
  const childNode = targetNode.left? targetNode.left: targetNode.right;
  if (parent) {
    if (parent.left === targetNode) parent.left = childNode;
    else parent.right = childNode;
  } else {
    rootNode = childNode;
  }
}

module.exports = {
  findMinBST,
  findMaxBST,
  findMinBT,
  findMaxBT,
  getHeight,
  countNodes,
  balancedTree,
  getParentNode,
  inOrderPredecessor,
  deleteNodeBST,
};
