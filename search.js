let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function searchWiki(result) {
    let {
        link,
        title,
        description
    } = result;

    let resultItem = document.createElement("div");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItem.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItem.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItem.appendChild(urlEl);

    let urlBreakEl = document.createElement("br");
    resultItem.appendChild(urlBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    resultItem.appendChild(descriptionEl);

    spinnerEl.classList.add("d-none");
    searchResultsEl.appendChild(resultItem);
}

function displayResults(searchResults) {
    for (let searchResult of searchResults) {
        searchWiki(searchResult);
    }
}

function getUrls(event) {
    if (event.key === "Enter") {

        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);

            });
    }
}

searchInputEl.addEventListener("keydown", getUrls);