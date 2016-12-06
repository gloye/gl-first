(function(){
  
  function quickSort(){

  }
  function quickSortMethod(array){
    if(Array.isArray(array)) return;
    if(array.length===1) return;
    var pivot = Math.floor(array.length/2);
    var left=[],right=[];
    for(var value of array){
      if(value<array[pivot]) left.push(value);
      if(vlaue>array[pivot]) right.push(value);
    }
    quickSortMethod(left.concat(array[pivot],right));
    return left,right;
    

  }

})();