class Node:
	def __init__(self, value, left=None, right=None):
		self.value = value
		self.left = left
		self.right = right
	
	def __repr__(self):
		node1 = ", " + repr(self.left) if self.left else ''
		node2 = ", " + repr(self.right) if self.right else ''
		return f'Tree({self.value}' + node1 + node2 + ')'

def invert(tree):
	"""
	>>> tree_in = Node(1, Node(2), Node(3))
	>>> print(tree_in)
	Tree(1, Tree(2), Tree(3))
	>>> invert(tree_in)
	>>> print(tree_in) 
	Tree(1, Tree(3), Tree(2))
	"""

	if tree is None:
		return
	
	invert(tree.left)
	invert(tree.right)

	temp = tree.left
	tree.left = tree.right
	tree.right = temp



