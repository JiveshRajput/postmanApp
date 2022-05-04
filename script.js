const parametersBox = document.getElementById("parametersBox");
const requestJsonBox = document.getElementById("requestJsonBox");
const customParaRadio = document.getElementById("customParaRadio");
const extraParameters = document.getElementById("extraParameters");
const jsonRadio = document.getElementById("jsonRadio");



// Toggling JSON and Parameter Request Box
parametersBox.style.display = "none";
customParaRadio.addEventListener("click", () => {
    parametersBox.style.display = "flex";
    extraParameters.style.display = "block";
    requestJsonBox.style.display = "none";
});
jsonRadio.addEventListener("click", () => {
    requestJsonBox.style.display = "flex";
    parametersBox.style.display = "none";
    extraParameters.style.display = "none";
});




// 1. Function to convert string into DOM
function convertStringIntoDom(str) {
    let div = document.createElement("div");
    div.innerHTML = str;
    return div.firstElementChild;
}

// Adding More parameters
const paramrsAddBtn = document.getElementById("paramrsAddBtn");
let paramCount = 1;

paramrsAddBtn.addEventListener("click", (e) => {
    const extraParametersArea = document.getElementById("extraParameters");
    e.preventDefault();
    paramCount++;
    string = `<div id="parametersBox" class="form-row my-3">
                <div class=" col-md-2">
                    <label>URL</label>
                </div>
                <div class=" col-md-4">
                    <input type="text" class="form-control" id="parameterKey${paramCount}" placeholder="Enter Parameter Key ${paramCount}">
                </div>
                <div class=" col-md-4">
                    <input type="text" class="form-control" id="parameterValue${paramCount}" placeholder="Enter Parameter Value ${paramCount}">
                </div>
                <button type="submit" class="btn btn-primary deleteParam">Sub</button>
            </div>`;
    extraParametersArea.innerHTML += string;
    // let nextParam = convertStringIntoDom(string);
    // extraParametersArea.append(nextParam);
    let deleteParam = document.getElementsByClassName("deleteParam");
    for (item of deleteParam) {
        item.addEventListener("click", (e) => {
            e.target.parentElement.remove();
        });
    }
});





// Submitting form and creating Request from server
const formSubmitBtn = document.getElementById("formSubmitBtn");

formSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("responseJsonText").innerHTML = "Please Wait... Fetching Response...";
    let fetchUrl = document.getElementById("urlField").value;
    let requestType = document.querySelector('input[name="Request"]:checked').value;
    let contentType = document.querySelector('input[name="contentType"]:checked').value;

    if (contentType == "customParams") {
        data = {};
        for (i = 1; i <= paramCount; i++) {
            if (document.getElementById(`parameterKey${i}`) != undefined) {
                let key = document.getElementById(`parameterKey${i}`).value;
                let value = document.getElementById(`parameterValue${i}`).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    } else {
        data = document.getElementById("requestJsonText").value;
    }

    console.log(fetchUrl, requestType, contentType, data);

    if (requestType == "GET") {
        fetch(fetchUrl, { method: "GET" })
            .then((response) => response.text())
            .then((data) => {
                document.getElementById("responseJsonText").innerHTML = data;
                Prism.highlightAll();
            });

    } else {
        fetch(fetchUrl, {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => response.text())
            .then((data) => {
                document.getElementById("responseJsonText").innerHTML = data; 
                Prism.highlightAll();
            });
    }
});

// For Get request use this :- https://randomuser.me/api/   
