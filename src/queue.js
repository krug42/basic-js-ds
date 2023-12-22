const { NotImplementedError } = require("../extensions/index.js");

const { ListNode } = require("../extensions/list-node.js");

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.list = null;
  }

  getUnderlyingList() {
    return this.list;
  }

  enqueue(value) {
    if (this.list === null) this.list = new ListNode(value);
    else {
      let currentNode = this.list;
      while (currentNode) {
        if (currentNode.next === null) {
          currentNode.next = new ListNode(value);
          return;
        } else currentNode = currentNode.next;
      }
    }
  }

  dequeue() {
    const firstValue = this.list?.value || null;
    this.list = this.list.next;

    return firstValue;
  }
}

module.exports = {
  Queue,
};
