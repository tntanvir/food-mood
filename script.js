const btn = document.querySelector(".submit-btn")
const input = document.querySelector("#input-field")
const closeBtn = document.querySelector("#close");
const alldata = document.querySelector("#alldata");

btn.addEventListener("click", () => {
    document.querySelector("#alldata").innerHTML = ''
    if (input.value) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.meals == null)
                if (data.meals == null) {
                    const div = document.querySelector('#noText');
                    const body = document.querySelector('.modal-body');
                    body.innerHTML = `
                    <h2>Data Not Found</h2>
                    `
                    div.classList.add('show');
                    div.style.display = "block";
                }
                if (data.meals.length > 0) {
                    data.meals.map((e) => {
                        console.log(e.strArea);
                        const div = document.createElement("div");
                        div.classList.add("meal");
                        div.innerHTML = `
                        <div class="card" style="width: 21rem;">
                            <img src="${e.strMealThumb}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${e.strMeal}</h5>
                                <p class="card-text">${e.strInstructions.slice(0, 90)}..</p>

                                <button onclick=clickMe(${e}) class="btn btn-primary">Go somewhere</button>
                            </div>
                        </div>
                        `

                        alldata.appendChild(div);
                    })
                }

            }
            )
            .catch(err => console.error(err))
    }
    else {
        const div = document.querySelector('#noText');
        div.classList.add('show');
        div.style.display = "block";
        const body = document.querySelector('.modal-body');
        body.innerHTML = `
                    <h2>No text Found</h2>
                    `
    }
})

closeBtn.addEventListener("click", () => {

    const div = document.querySelector('#noText');
    div.classList.remove('show');
    div.style.display = "none";
});

function clickMe(e) {
    console.log("e.strArea");
}
