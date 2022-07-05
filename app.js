"use strict"

let inputText = document.querySelector(".input__text")
let elList = document.querySelector(".list")
let elTemplate = document.querySelector(".template").content
let prevBtn = document.querySelector(".prevBtn")
let nextBtn = document.querySelector(".nextBtn")
let numbersBtn = document.querySelector(".numbers-btn")
let activePage = document.querySelector(".active-page")



const API_KEY = '81afce36';

let search = "marvel";
let page = 1;



let renderMovies = function (arr, htmlElement) {

    let moviesFragment = document.createDocumentFragment();

    elList.innerHTML = null

    arr.forEach(movie => {

        let clonedFilmTemplate = elTemplate.cloneNode(true)

        clonedFilmTemplate.querySelector(".film__img").src = movie.Poster;
        clonedFilmTemplate.querySelector(".film__title").textContent = movie.Title
        clonedFilmTemplate.querySelector(".film__year").textContent = movie.Year
        clonedFilmTemplate.querySelector(".film__type").textContent = movie.Type

        moviesFragment.appendChild(clonedFilmTemplate)

    });


    htmlElement.appendChild(moviesFragment)



}


let getMovies = async function () {
    let request = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`)

    let data = await request.json()

    if (data.Respone = "True" && data.Search.length > 0) {
        renderMovies(data.Search, elList)
    }

    numbers(data.totalResults, numbersBtn)

}

getMovies()



inputText.addEventListener("input", function (e) {
    let inputValue = inputText.value;
    search = inputValue;
    page = 1;
    getMovies()

    activePage.textContent = page

})




prevBtn.addEventListener("click", function (e) {
    if (page > 1) {
        page--
        getMovies()
        numbersBtn.innerHTML = null

        activePage.textContent = page
    }


})


nextBtn.addEventListener("click", function (e) {

        page++
        getMovies()
        numbersBtn.innerHTML = null
        activePage.textContent = page

        console.log(data.totalResults);

})


let numbers = function (number, htmlElement) {
    numbersBtn.innerHTML = null
    for (let i = 1; i < (number / 10) + 1; i++) {

        let numberBtn = document.createElement("button")

        numberBtn.textContent = i;

        numberBtn.style.width = "30px"
        numberBtn.style.marginLeft = "3px"
        numberBtn.style.height = "30px"


        htmlElement.appendChild(numberBtn)


        numberBtn.addEventListener("click", function (e) {
            e.preventDefault()

            if (page) {
                numberBtn.style.backgroundColor = "blue"
            }

            page = i

            activePage.textContent = page

            getMovies()
        })



    }
}