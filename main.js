
let resultRm ;
let resultVx ;
let alpha ;
let test;
let result; 



document.addEventListener('click', function () {
resultRm = document.getElementById('rm').textContent;
resultVx = document.getElementById('vx').textContent;
    console.log(resultRm);
    console.log(resultVx);
    result = Number(resultRm) - Number(resultVx);
    console.log('resultVx:', resultVx);
    console.log('resultRm:', resultRm);
    console.log('result:', result);
 //   document.getElementById('testq').textContent = result; 
 //   document.getElementById('testq').textContent = result; 

    console.log(degrees_to_radians(result));
    console.log(Math.round(Math.cos(degrees_to_radians(result))));

    document.getElementById('test1').textContent = "Alpha Ɑ :"+ result;
    document.getElementById('test2').textContent = "Sin : "+Math.round(Math.sin(degrees_to_radians(result)));
    document.getElementById('test3').textContent = "Cos : "+Math.round(Math.cos(degrees_to_radians(result)));
})


function degrees_to_radians(degree)
{
 var pi = Math.PI;
 return degree * (pi/180);
}


