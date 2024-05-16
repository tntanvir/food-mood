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
                    <h2>404 ! Not Found</h2>
                    `
                    div.classList.add('show');
                    div.style.display = "block";
                }
                if (data.meals.length > 0) {
                    data.meals.map((e) => {
                        // console.log(e.strArea);
                        const div = document.createElement("div");
                        div.classList.add("meal");
                        div.innerHTML = `
                        <div class="card" style="width: 21rem;">
                            <img src="${e.strMealThumb}" class="card-img-top" alt="..."  loading="lazy">
                            <div class="card-body">
                                <h5 class="card-title">${e.strMeal}</h5>
                                <p class="card-text">${e.strInstructions.slice(0, 90)}..</p>

                                <button onclick='clickMe(${JSON.stringify(e)})' class="btn btn-primary">Go somewhere</button>
                            </div>
                        </div>
                        `

                        alldata.appendChild(div);
                    })
                }

            }
            )
            .catch(err => {
                const div = document.querySelector('#noText');
                div.classList.add('show');
                div.style.display = "block";
                const body = document.querySelector('.modal-body');
                body.innerHTML = `
                    <h2 class="text-danger">404!</h2>
                    `
            })
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

const clickMe = (e) => {
    // console.log(e);
    const div = document.querySelector('#noText');
    div.classList.add('show');
    div.style.display = "block";
    const body = document.querySelector('.modal-body');
    body.innerHTML = `
                    <div class="card" >
                        <img src="${e.strMealThumb}" class="card-img-top" alt="..." wight="300">
                        <div class="card-body">
                            <h5 class="card-title">${e.strMeal}</h5>
                            <p class="card-text">${e.strCategory}</p>
                            <p class="card-text">${e.strArea}</p>
                            <p class="card-text">${e.strInstructions}</p>
                            <a class"btn btn-primary" href="${e.strYoutube}" target="_blank">YouTube Link</a>
                        </div>
                    </div>
                    `
}
