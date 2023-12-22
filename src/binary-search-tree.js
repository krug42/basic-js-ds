const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  #root;

  constructor() {
    this.#root = null;
  }

  root() {
    return this.#root;
  }

  add(data) {
    if (!this.#root) {
      this.#root = {
        parent: null,
        leftChild: null,
        rightChild: null,
        data,
      };

      return this.#root;
    }

    let nextNode = this.#root;

    while (true) {
      if (nextNode.data === data) return;

      if (nextNode.data < data) {
        if (nextNode.rightChild === null) {
          nextNode.rightChild = {
            parent: nextNode,
            leftChild: null,
            rightChild: null,
            data,
          };

          return nextNode.rightChild;
        } else {
          nextNode = nextNode.rightChild;
        }
      }

      if (nextNode.data > data) {
        if (nextNode.leftChild === null) {
          nextNode.leftChild = {
            parent: nextNode,
            leftChild: null,
            rightChild: null,
            data,
          };

          return nextNode.leftChild;
        } else {
          nextNode = nextNode.leftChild;
        }
      }
    }
  }

  has(data) {
    if (this.find(data) !== null) return true;
    return false;
  }

  find(data) {
    let nextNode = this.#root;
    if (nextNode === null) return null;

    do {
      if (nextNode.data === data) return nextNode;

      if (nextNode.data < data) {
        if (nextNode.rightChild === null) return null;
        nextNode = nextNode.rightChild;
        continue;
      }

      if (nextNode.data > data) {
        if (nextNode.leftChild === null) return null;
        nextNode = nextNode.leftChild;
        continue;
      }
    } while (true);
  }

  remove(data, node = this.#root) {
    if (node === null) return;
    if (data > node.data) this.remove(data, node.rightChild);
    else if (data < node.data) this.remove(data, node.leftChild);
    else {
      if (node.leftChild === null && node.rightChild === null) {
        const parent = node.parent;
        if (parent === null) {
          this.#root = null;
          return;
        }
        if (parent.rightChild?.data === data) {
          parent.rightChild = null;
        }
        if (parent.leftChild?.data === data) {
          parent.leftChild = null;
        }
      } else if (node.leftChild === null) {
        const parent = node.parent;
        if (parent === null) {
          this.#root = node.rightChild;
          this.#root.parent = null;
          return;
        }
        if (parent.rightChild?.data === data) {
          parent.rightChild = node.rightChild;
          parent.rightChild.parent = parent;
        }
        if (parent.leftChild?.data === data) {
          parent.leftChild = node.rightChild;
          parent.leftChild.parent = parent;
        }
      } else if (node.rightChild === null) {
        const parent = node.parent;
        if (parent === null) {
          this.#root = node.leftChild;
          this.#root.parent = null;
          return;
        }
        if (parent.rightChild?.data === data) {
          parent.rightChild = node.leftChild;
          parent.rightChild.parent = parent;
        }
        if (parent.leftChild?.data === data) {
          parent.leftChild = node.leftChild;
          parent.leftChild.parent = parent;
        }
      }
      if (node.leftChild !== null && node.rightChild !== null) {
        if (node.rightChild.leftChild === null) {
          node.data = node.rightChild.data;
          node.rightChild = node.rightChild.rightChild;
        } else {
          let mostLeft = node.rightChild.leftChild;
          while (mostLeft.leftChild !== null) {
            mostLeft = mostLeft.leftChild;
          }
          node.data = mostLeft.data;
          this.remove(mostLeft.data, mostLeft.parent);
        }
      }
    }
  }

  min(tree = this.#root) {
    if (tree === null) return null;
    let nextNode = tree;
    let result = null;

    do {
      result = nextNode.data;
      nextNode = nextNode.leftChild;
    } while (nextNode !== null);

    return result;
  }

  max(tree = this.#root) {
    if (tree === null) return null;
    let nextNode = tree;
    let result = null;

    do {
      result = nextNode.data;
      nextNode = nextNode.rightChild;
    } while (nextNode !== null);

    return result;
  }
}

module.exports = {
  BinarySearchTree,
};
