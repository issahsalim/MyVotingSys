
const RenderCandidate = [
    {
        name: "issah salim",
        image: "../img/83.jpg",
        vote: 0,
    },
    {
        name: "issah salima",
        image: "../img/42.jpg",
        vote: 0,

    },
    {
        name: "kadija",
        image: "../img/26.jpg",
        vote: 0,
    },
    {
        name: "mummy",
        image: "../img/17.jpg",
        vote: 0,

    },
]

let display = '';
RenderCandidate.forEach(candidate => {
    display += `
       
        <div class="box d-flex justify-content-center">
            <div class="candidate"> 
                <input type="radio" id="${candidate.name}" name="radio" class="m-2"> 
                <label class="name" for="${candidate.name}">${candidate.name}</label>
                <span><a href="${candidate.image}" class="">image</a></span> 
            </div>   
         </div>
       
    `;
});


const render = document.querySelector('.render');
render.innerHTML = display 

 

