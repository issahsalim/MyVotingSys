const RenderCandidate = [
    {
        name: "Issah Jamilatu",
        image: "/83.jpg",
        vote: 0, 
    },
    {
        name: "Issah Aisha",
        image: "/42.jpg",
        vote: 0,

    },
    {
        name: "Issah kadija",
        image: "/26.jpg",
        vote: 0,
    },
    {
        name: "Issah Mummy",
        image: "/17.jpg",
        vote: 0,

    },
]

let display = '';
RenderCandidate.forEach(candidate => {
    display += `
       
         <div class="box d-flex justify-content-center">
            <div class="candidate d-flex m-2">

             <div class="card col-3">
                <img src="${candidate.image}" class="w-4">
             </div> 
             <div>
                <input type="radio" id="${candidate.name}" name="radio" class="m-2"> 
                <label class="name" for="${candidate.name}">${candidate.name}</label>
                </div>
             </div>   
         </div>
       
    `;
});

const render = document.querySelector('.render');
render.innerHTML = display;






