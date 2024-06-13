
let Year = document.getElementById('getYear');
Vbtn = document.getElementById("votebtn");
Checkbtn = document.getElementById("checkvote");
votemess = document.querySelector('.voteStatus');
CurrentVoteTime = document.querySelector('.votetime');
VbtnandCheckbtn = document.getElementById('btns');
timeExpireMessage = document.querySelector('.time_expire_mess');
votesucceddmess = document.querySelector('.votesucceddmess');
document.addEventListener("DOMContentLoaded", () => {
    let vote = "";
    let AlreadyVoted = false;

    // VOTE BUTTON 
    Vbtn.addEventListener('click', () => {

        const SelectedCandidate = document.querySelector('input[name="radio"]:checked');
        if (SelectedCandidate && !AlreadyVoted) {

            // FIND CANDIDATE NAME IN RENDER_CANDIDATE ARRAY
            const candidateIdmatchcandidateName = RenderCandidate.find(candidateName => candidateName.name === SelectedCandidate.id);
            if (candidateIdmatchcandidateName) {
                // INCREASING CANDIDATE VOTES
                vote = (candidateIdmatchcandidateName.vote++).toString();


                votesucceddmess.innerHTML = `
                <div class="alert alert-success alert-dismissible text-center fw-bold  " fade show>
                THANK YOU FOR YOUR VOTES🙏❤️ 
                <button class="btn-close" data-bs-dismiss="alert"></button></div>
                `
                setTimeout(() => {
                    votesucceddmess.style.display = "none";
                    votesucceddmess.style.opacity = 1;
                   

                }, 2000)


            }

            AlreadyVoted = true;
        }
        // ALERT WHEN ALREADY VOTE
        else if (AlreadyVoted) {
            votemess.innerHTML = `
            <div class="alert alert-danger alert-dismissible text-center fw-bold  " fade show>Salim said You have already vote😒
            <button class="btn-close" data-bs-dismiss="alert"></button></div>
            `
        }
        
        else {
            // ATTEMPT TO VOTE WHEN CANDIDATE NOT SELECTED
           
                votemess.innerHTML = `
            <div class="alert alert-danger alert-dismissible text-center fs-6" fade show>
             <strong>Salim said Please choose candidate before voting 👇</strong>
            <button class="btn-close" data-bs-dismiss="alert"></button></div>
            `
            
        }

    })

    // CHECK VOTE BUTTON
    Checkbtn.addEventListener('click', () => {
        Checkbtn.style.display = "none";
        Vbtn.style.display = "none";

        // TABLE TO RENDER VOTES 
        const TableforVoteandName = RenderCandidate.map(voteandname => `
            <tr>
            
            <td >${voteandname.name}</td>
            <td>${voteandname.vote}</td> 
            </tr>
            `).join("")
        votemess.innerHTML = ` 
        <table class="table">
            <tr scope="col">
              
            <th scope="col">Names</th>
            <th>Vote</th>
               
            </tr>
          
            <tbody> 
            ${TableforVoteandName}
            </tbody>  
        </table>
        <div class="d-flex justify-content-center "><button class="btn btn-primary" onClick='goBack()'>
        <a href="index.html" class="class-link text-white t">Back</a></button></div>
        `
        render.style.display = "none";
    })

    // vote time
    function VoteTime() {
        let Time = new Date();
        let hour = Time.getHours().toString().padStart(1, '0')
        let minute = Time.getMinutes().toString().padStart(2, '0')
        let seconds = Time.getSeconds().toString().padStart(2, '0')
        // get Current Year
        Year.innerHTML = Time.getFullYear()

        CurrentVoteTime.innerHTML = `Current time ${hour}:${minute}:${seconds}`
        const votetimecontainer = document.querySelector('.votetimecontainer');

        // VOTE TIME END'S LOGIC
        if (hour === '17' && minute === '35') {
            render.style.display = "none";
            Vbtn.style.display = "none";
            Checkbtn.classList.add('CheckVote');
            votetimecontainer.classList.add('endtimepro')
            votetimecontainer.classList.remove('votetimecontainer')
            timeExpireMessage.innerHTML = "Vote Time end's";


        }

    }
    // UPDATING TIME EVERY SECONDS
    setInterval(VoteTime, 1000);
    VoteTime()
})