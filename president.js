// RENDER_CANDIDATE ARRAY
const RenderCandidate = [
    {
        name: "William Rockson",
        image: "/26.jpg",
        vote: 0,
    },
    {
        name: "Bronya David",
        image: "/44.jpg",
        vote: 0,

    },
    {
        name: "Calvin Grrr",
        image: "/17.jpg",
        vote: 0,
    },
    {
        name: "Issah Boresa",
        image: "/42.jpg",
        vote: 0,

    },
];

// Retrieve votes from local storage
const storedVotes = JSON.parse(localStorage.getItem('candidateVotes'));

if (storedVotes) {
    RenderCandidate.forEach(candidate => {
        const storedCandidate = storedVotes.find(item =>
            item.name === candidate.name);
         if (storedCandidate) {
            candidate.vote = storedCandidate.vote; 
        }
    });
}


let display = '';
RenderCandidate.forEach(candidate => {
    display += `
        <div class="box d-flex justify-content-center">
            <div class="candidate d-flex m-2">
                <div class="card col-3">
                    <img src="${candidate.image}" class="w-4 b-3">
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