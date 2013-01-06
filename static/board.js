    function create_board(neurons, initial_top, initial_left, onclick) { 
      var e = document.getElementById("board"); 
      for(var i = 0; i < neurons; i++){ 
        var row = document.createElement("div"); 
        var top = "" + ((i * 30) + initial_top) +"px";
        for(var x = 1; x <= neurons; x++){ 
            var cell = document.createElement("div"); 
            cell.style.left = ((x * 30) + initial_left) +"px";
            cell.style.top= top;
            cell.className = "cell"; 
            cell.id =  (i * neurons) + x;
            cell.onclick = onclick;
            row.appendChild(cell); 
        } 
        e.appendChild(row); 
      }
    }

    function draw_pattern(pattern) {
      for (var i =1; i <= pattern.length; i++) {
        var cell = document.getElementById(i);
        if (pattern[i] == 1) {
            cell.className = "cell activated";
        } else {
            cell.className = "cell deactivated";
        }
      }
    }


