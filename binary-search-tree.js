// Before starting, copy and paste your guided practice work from
// `binary-search-tree.js` into this file

// Do not change this
class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  class BinarySearchTree {
    constructor() {
      this.root = null;
    }

    insert(val, currentNode = this.root) {
      if (!this.root) {
        this.root = new TreeNode(val);
        return;
      }
      const newNode = new TreeNode(val);
      while (currentNode) {
        if (val < currentNode.val) {
          if (!currentNode.left) {
            currentNode.left = newNode;
            return;
          } else currentNode = currentNode.left;
        } else {
          if (!currentNode.right) {
            currentNode.right = newNode;
            return;
          } else currentNode = currentNode.right;
        }
      }
    }

    search(val) {
      let currentNode = this.root;
      if (!currentNode) return false;

      while (currentNode) {
        if (val === currentNode.val) {
          return true;
        } else if (val < currentNode.val) {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right;
        }
      }
      return false;
    }

    preOrderTraversal(currentNode = this.root) {
      if (!currentNode) return;
      console.log(currentNode.val);
      this.preOrderTraversal(currentNode.left);
      this.preOrderTraversal(currentNode.right);
    }

    inOrderTraversal(currentNode = this.root) {
      if(!currentNode) return;
      this.inOrderTraversal(currentNode.left);
      console.log(currentNode.val);
      this.inOrderTraversal(currentNode.right);
    }

    postOrderTraversal(currentNode = this.root) {
      if (!currentNode) return;
      this.postOrderTraversal(currentNode.left);
      this.postOrderTraversal(currentNode.right);
      console.log(currentNode.val);
    }

    // Breadth First Traversal - Iterative
    breadthFirstTraversal() {
      if (!this.root) return;
      let queue = [this.root];

      while (queue.length) {
        const currentNode = queue.shift();
        console.log(currentNode.val);
        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
      }
    }

    // Depth First Traversal - Iterative
    depthFirstTraversal() {
      if (!this.root) return;
      let stack = [this.root];
      while (stack.length) {
        const currentNode = stack.pop()
        console.log(currentNode.val)
        if (currentNode.left) stack.push(currentNode.left)
        if (currentNode.right) stack.push(currentNode.right)
      }
    }
  }

  module.exports = { BinarySearchTree, TreeNode };
