NEURONS = 36
/*
http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
Jonas Raoni Soares Silva
http://jsfromhell.com/array/shuffle [v1.0]
*/
shuffle = function(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

  var compare = function(a, b) {
    if (a.length != b.length) return false;
    for (var i = 0; i < b.length; i++) {
        if (a[i].compare) { 
            if (!a[i].compare(b[i])) return false;
        }
        if (a[i] !== b[i]) return false;
    }
    return true;
}

var calculate_weight = function(i,j, patterns) {
    total = 0
    for (var p in patterns) {
        var pattern = patterns[p];
        total += (2*pattern[i] -1)*(2*pattern[j] -1);
    }
    return total;
};

var calculate_weights = function(patterns, neurons) {
    var weights = new Array(neurons);
    for (var i = 0; i < neurons; i++) {
        weights[i] = new Array(neurons);
        for (var j = 0; j < neurons; j++) {
            if (i == j) { 
              weights[i][j] = 0;
            } else {
              weights[i][j] = calculate_weight(i, j, patterns);
            }
        }
    }
    return weights;
};


var calculate_weighted_inputs = function(state, node, weights, num_neurons) {
    total = 0
    for (var i = 0; i < num_neurons;i++) { //for each neuron
        if (i != node) {
            total += weights[i][node] * state[i];
        }
    }
    return total;
}
var update_net = function(initial_state, weights, num_neurons) {
    has_changed = true;
    var order = new Array(num_neurons);
    for (var i = 0; i < num_neurons;i++)order[i] =i;
    order = shuffle(order)
    //order =[21, 26, 32, 17, 33, 19, 31, 13, 11, 7, 14, 16, 5, 20, 25, 29, 0, 27, 2, 6, 23, 9, 28, 34, 30, 15, 1, 4, 24, 18, 8, 12, 10, 22, 35, 3];
    last_state = initial_state.slice();
    while (has_changed) {
        has_changed = false;
        for (i in order) {
            current_node = order[i];
            value = calculate_weighted_inputs(initial_state, current_node, weights, num_neurons);
            if (value >= 0) initial_state[current_node] = 1;
            else initial_state[current_node] = 0;
        }
        if (!compare(initial_state, last_state)) {
            has_changed = true;
            last_state = initial_state.slice();
        }
    }
    return initial_state;
}
