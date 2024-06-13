//RENDER_CANDIDATE ARRAY
const RenderCandidate = [
    {
        name: "William Rockson",
        image: "../img/26.jpg", 
        vote: 0,
    }, 
    {
        name: "Bronya David",
        image: "../img/44.jpg",
        vote: 0,

    },
    {
        name: "Calvin Grrr",
        image: "../img/17.jpg",
        vote: 0,
    },
    {
        name: "Issah Boresa",
        image: "../img/42.jpg",
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
render.innerHTML = display;


 



