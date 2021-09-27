const d = document,
      $cardsGrid = d.querySelector(".cards"),
      $control = d.querySelector(".controls"),
      $button = d.querySelectorAll(".btn");

const getData = async (frame) => {
    
    try {
        let res = await fetch("data.json");
        let json = await res.json();        

        if(!res.ok) throw {status: res.status, statusText: res.statusText};

        $cardsGrid.innerHTML = "";

        let frequency = "";

        if(frame === "weekly"){
            frequency = "Last Week";
        }else if(frame == "daily"){
            frequency = "Today";
        }else{
            frequency = "Last Month";
        }

        json.forEach(el => {
            
            
            let classBg = el.title.toLowerCase().replace(/\s+/g, '');
            let filter = el.timeframes[frame];
            
             $cardsGrid.innerHTML += `
                <div class="detail__card bg ${classBg}">
                    <div class="detail">
                        <div>
                        <h2 class="title">${el.title}</h2>
                        <div>
                            <img src="./images/icon-ellipsis.svg" alt="icon">
                        </div>
                        </div>
                        <div>
                        <p class="time">${filter.current}hrs</p>
                        <p class="range__time">${frequency} - ${filter.previous}hrs</p>
                        </div>
                    </div>
                </div>
            
            `;
        });         

    } catch (err) {
        let message = err.statusText || "Connection Error";
        $cardsGrid.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
    }
}

d.addEventListener("DOMContentLoaded", (e) => {
    getData("weekly");
    filter();
})

function filter(){
    $button.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let btnValue = e.target.value;
            $control.querySelector(".active").classList.remove("active");
            e.target.classList.add("active");
            getData(btnValue);
        })
    })
}
