class Node:
    def __init__(self,data):
        self.data = data
        self.next = None
        self.prev = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None

    def append(self,data):
        if self.head is None:
            new_node = Node(data)
            new_node.prev = None
            self.head = new_node
        else:
            new_node = Node(data)
            cur = self.head
            while cur.next:
                cur = cur.next
            cur.next = new_node
            new_node.prev = cur
            new_node.next = None
            
    
    def prepend(self,data):
        if self.head is None:
            new_node = Node(data)
            new_node.prev = None
            self.head = new_node
        else:
            new_node = Node(data)
            self.head.prev = new_node
            new_node.next = self.head
            self.head = new_node
            new_node.prev = None
    
    def print_list(self):
        cur = self.head
        while cur:
            print(cur.data)
            cur = cur.next

    def add_after_node(self,key,data):
        cur = self.head
        while cur:
            if cur.next is None and cur.data == key:
                self.append(data)
                return
            elif cur.data == key:
                new_node= Node(data)
                nxt = cur.next
                cur.next =new_node
                new_node.next = nxt
                new_node.prev = cur
                nxt.prev = new_node
            cur = cur.next
    def add_before_node(self,key,data):
        cur = self.head
        while cur:
            if cur.prev is None and cur.data == key:
                self.prepend(data)
                return
            elif cur.data == key:
                new_node = Node(data)
                prev = cur.prev
                prev.next = new_node
                cur.prev = new_node
                new_node.next = cur
                new_node.prev = prev
            cur = cur.next
    def delete(self,key):
        cur = self.head
        while cur:
            #case 1
            if cur.data == key and cur == self.head:
                if not cur.next:
                    cur = None
                    self.head = None
                    return
                #case 2
                else:
                    nxt = cur.next
                    cur.next = None
                    nxt.prev = None
                    cur = None
                    self.head = nxt
                    return
            #case 3
            elif cur.data == key:
                if cur.next:
                    nxt = cur.next
                    prev = cur.prev
                    prev.next = nxt
                    nxt.prev = prev
                    cur.next = None
                    cur.prev = None
                    cur = None
                    return
                #case 4
                else:
                    prev = cur.prev
                    prev.next = None
                    cur.prev = None
                    cur = None
                    return
            cur = cur.next

dlist = DoublyLinkedList()
dlist.prepend(8)
dlist.append(1)
dlist.append(2)
dlist.append(3)
dlist.append(4)
dlist.append(5)
dlist.append(6)
dlist.print_list()
print("----prepend----")
dlist.prepend(7)
dlist.print_list()
print("----add_after_node----")
dlist.add_after_node(7,9)
dlist.print_list()
print("--------")
dlist.add_after_node(4,10)
dlist.print_list()
print("----add_before_node----")
dlist.add_before_node(2,12)
dlist.print_list()
print("--------")
dlist.add_before_node(5,13)
dlist.print_list()
print("----delete----")
dlist.delete(7)
dlist.print_list()
print("--------")
dlist.delete(19)
dlist.print_list()
print("--------")
dlist.delete(6)
dlist.print_list()
print("--------")
dlist.delete(3)
dlist.print_list()
#Reference Youtube Video
# https://youtu.be/8kptHdreaTA
# https://youtu.be/dPGBKZBYy0w
# https://youtu.be/Am5u1vaT0x0

