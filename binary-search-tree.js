class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val, current = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    let newNode = new Node(val);
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = newNode;
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    let newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    if (val < current.val) {
      if (current.left === null) {
        current.left = newNode;
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else {
      if (current.right === null) {
        current.right = newNode;
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val, current = this.root) {
    let found = false;

    if (val === current.val) return current;

    while (current && !found) {
      if (val < current.val) {
        current = current.left;
      } else if (val > current.val) {
        current = current.right;
      } else {
        found = true;
      }
    }
    if (!found) return undefined;
    return current;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (this.root === null) return undefined;

    if (val < current.val) {
      if (current.left === null) return undefined;
      return this.findRecursively(val, current.left);
    } else if (val > current.val) {
      if (current.right === null) return undefined;
      return this.findRecursively(val, current.right);
    }
    return current;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(current = this.root, data = []) {
    const traverse = (node) => {
      data.push(node.val);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    };

    traverse(current);
    return data;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(current = this.root, data = []) {
    const traverse = (node) => {
      node.left && traverse(node.left);
      data.push(node.val);
      node.right && traverse(node.right);
    };

    traverse(current);
    return data;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(current = this.root, data = []) {
    const traverse = (node) => {
      node.left && traverse(node.left);
      node.right && traverse(node.right);
      data.push(node.val);
    };

    traverse(current);
    return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs(node = this.root, queue = [], data = []) {
    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return data;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val, toRemove = this.root) {
    let parent;

    while (toRemove.val !== val) {
      parent = toRemove;
      if (val < toRemove.val) {
        toRemove = toRemove.left;
      } else {
        toRemove = toRemove.right;
      }
    }

    if (toRemove !== this.root) {
      if (toRemove.left === null && toRemove.right === null) {
        if (parent.left === toRemove) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else if (toRemove.left !== null && toRemove.right !== null) {
        let rightParent = toRemove;
        let right = toRemove.right;
        if (right.left === null) {
          right.left = toRemove.left;
          if (parent.left === toRemove) {
            parent.left = right;
          } else {
            parent.right = right;
          }
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if (parent.left === toRemove) {
            parent.left.val = right.val;
          } else {
            parent.right.val = right.val;
          }
          if (right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
      } else {
        if (parent.left === toRemove) {
          if (toRemove.right === null) {
            parent.left = toRemove.left;
          } else {
            parent.left = toRemove.right;
          }
        } else {
          if (toRemove.right === null) {
            parent.right = toRemove.left;
          } else {
            parent.right = toRemove.right;
          }
        }
      }
    }
    return toRemove;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(current = this.root) {
    if (current === null) return;

    const minDepth = (current) => {
      if (current === null) return 0;
      return 1 + Math.min(minDepth(current.left), minDepth(current.right));
    };

    const maxDepth = (current) => {
      if (current === null) return 0;
      return 1 + Math.max(maxDepth(current.left), maxDepth(current.right));
    };

    return maxDepth(current) - minDepth(current) <= 1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(current = this.root) {
    if (!this.root || (!this.root.left && !this.root.right)) return;

    while (current) {
      if (current.left && !current.right) {
        return this.findSecondHighest(current.left);
      }

      if (current.right && !current.right.left && !current.right.right) {
        return current.val;
      }
      current = current.right;
    }
  }
  dfsInOrderIterative(current = this.root, stack = [], dfs = []) {
    while (stack.length > 0 || current) {
      while (current) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      if (current) {
        dfs.push(current.val);
        current = current.right;
      }
    }
    return dfs;
  }
}

module.exports = BinarySearchTree;
