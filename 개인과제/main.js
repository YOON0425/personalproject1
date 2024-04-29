const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGFjZjVmNGU0NDM1OTAzODgxMzljM2YyODk4N2ExOCIsInN1YiI6IjY2MmI3MjY2NWMwNzFiMDExZDVlOWEyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FmvvtSxU4f5WsAxokkJY_K7NEaAW3c_ZcjhOa1tCl1o'
    }
};
let moviejson;

fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        moviejson = data.results;
        duplicate(moviejson);
        console.log(moviejson);
    })
    .catch(err => console.error(err));

let duplicate = function (moviejson) {
    let adopt = document.querySelector(".container");
    moviejson.forEach(function(array){
        const doc=document.createElement('div'); 
        doc.classList.add('moviecards')
            doc.innerHTML=`
            <img class="movieimage" src="https://image.tmdb.org/t/p/w500/${array.poster_path}">
            <p class="movietitle"> ${array.title}</p>
            <p class="overview">${array.overview} </p>
            <p class="ratings">${array.vote_average}</p>
            <p class="ID">${array.id}</p>`;
        adopt.appendChild(doc);  
        
    });     
    doEventBind();
};

// 입력 -> 대조 -> 출력
// 입력> 검색 클릭 -> 입력의 텍스트 데이터 -> 변수에 저장
// 대조> 변수에 저장 데이터 - 어레이 데이터(moviejson) 대조
// 출력> 검색결과 -> 참 = 데이터를 새로운 배열에 저장 >> 저장한 배열을 duplicate에 넣음
// 새 moviecard 생성, 기존 데이터 삭제 

const btnPush = document.querySelector("#btn");

btnPush.addEventListener("click",()=>{
   let userInput = document.querySelector("#userInput").value;
   compare(userInput,moviejson);

});

let newArray = []; 
const compare = function(userInput,moviejson){
    newArray=[];
    moviejson.forEach(function(array){
        let title = array.title.toLowerCase();
        if(title.includes(userInput.toLowerCase())){
            newArray.push(array);
        };
    });
    document.querySelector(".container").innerHTML="";
    duplicate(newArray);
};



function doEventBind(){
const popupID = document.querySelectorAll(".moviecards");
const ArrayID = Array.from(popupID);
ArrayID.forEach(array=>{
    array.addEventListener("click",event=>{
        const targetloc = event.target;
        console.log(targetloc);
        const findID = targetloc.closest(".moviecards").querySelector(".ID").textContent;
        alert(findID);
    })
})
};
