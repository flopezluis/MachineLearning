NEURONS = 36
import random
order = range(0,NEURONS)
random.shuffle(order)
#order = [2, 1, 0, 4, 3]
def calculate_weights(patterns):
    weights = [[0 for i in range(NEURONS)] for j in range(NEURONS)]
    for i in range(NEURONS):
        for j in range(NEURONS):
            if i == j: continue
            weights[i][j] = calculate_weight(i, j, patterns)
    print "memorizados:\n"
    for pattern in patterns:
        print_matrix(pattern)
        print "\n"
    return weights

def calculate_weight(i,j, patterns):
    total = 0
    for pattern in patterns:
        total += (2*pattern[i] -1)*(2*pattern[j] -1)
    return total

def calculate_weighted_inputs(state, node, weights):
    total = 0
    for i in range(NEURONS):
        if i != node:
            total += weights[i][node] * state[i]
    return total

def update_net(initial_state, weights):
    has_changed = True
    last_state = initial_state[:]
    print "entra"
    print print_matrix(initial_state)
    while has_changed:
        has_changed = False
        for current_node in order:
            value = calculate_weighted_inputs(initial_state, current_node, weights)
            if value >= 0: initial_state[current_node] = 1
            else: initial_state[current_node] = 0
        if initial_state != last_state:
            has_changed = True
            last_state = initial_state[:]
            #  initial_state[current_node] = 1
            #else: initial_state[current_node] = 0
    print "encontrado:"
    print print_matrix(initial_state)
    return initial_state

def print_matrix(matrix):
  li = ""
  lenght = len(matrix) / 10
  for i in range(6):
      li = ""
      for j in range(6):
          li = li + str(matrix[(i * 6) + j])
      print li


def print_matrix2(matrix):
  li = ""
  for i in range(6):
      li = ""
      for j in range(6):
          li = li + str(matrix[i][j])
      print li
