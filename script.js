window.onload = function () {

    let containers = document.getElementsByClassName('container');
    let modules = document.getElementsByClassName("module");
  
    containers[0].onmousedown = function () {
      handleContainerClick(containers[0], containers[1]);
    }
  
    containers[1].onmousedown = function () {
      handleContainerClick(containers[1], containers[0]);
    }
    
    
    function handleContainerClick(activeContainer, inactiveContainer) {
        activeContainer.classList.add("active");
        activeContainer.classList.remove("inactive");

        inactiveContainer.classList.add("inactive");
        inactiveContainer.classList.remove("active");
    }
  
  
  }