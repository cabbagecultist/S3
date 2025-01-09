var pages = document.getElementsByClassName("page");
var nextButton = document.getElementById("next");
var backButton = document.getElementById("back");
var submitButton = document.getElementById("submit");
var submitNameButton = document.getElementById("submit_names");
var pageName = document.getElementById("pagename");
var description = document.getElementById("description");
var currentPageIndex = 0;

function nextPage() {
    currentPageIndex++;
    currentPageIndex > pages.length - 1 ? currentPageIndex = pages.length - 1 : updatePage();
}

function backPage() {
    currentPageIndex--;
    currentPageIndex < 0 ? currentPageIndex = 0 : updatePage();
}

function updatePage() {
    for (let page of pages) {
        page.style.display = "none";
    }
    pages[currentPageIndex].style.display = "block";
    pageName.innerHTML = pages[currentPageIndex].id;
    description.innerHTML = pages[currentPageIndex].getAttribute("data-description");
}

function generateDataString(formID) {
    let form = document.getElementById(formID);
    let formData = new FormData(form);
    let formNames = new Set();
    let formString = "";

    Array.from(form.elements).forEach((element) => {
        if (element.name != "") {
            formNames.add(element.name);
        }
    });

    // Pad empty form values
    for (formName of formNames) {
        if (!formData.has(formName)) {
            formData.append(formName, undefined);
        }
    }

    for (valuepair of formData) {
        // console.log(valuepair);
        if (valuepair[1] != "" && valuepair[1] != "undefined") {
            formString += (valuepair[1] + "\t");
        } else {
            formString += "\t";
        }
    }

    console.log(formString);
    return formString;
}

function generateQRCode(formID) {
    qrcodeElement = document.getElementById("qrcode");
    qrcodeElement.innerHTML = "";
    formString = generateDataString(formID);
    new QRCode(qrcodeElement, formString); 
}

function generateNameQRCode(formID) {
    let form = document.getElementById(formID);
    let formNames = new Set();
    let formNameString = "";

    Array.from(form.elements).forEach((element) => {
        if (element.name != "") {
            formNames.add(element.name);
        }
    });

    for (formName of formNames) {
        formNameString += (formName + "\t");
    }

    qrcodeElement = document.getElementById("qrcode");
    qrcodeElement.innerHTML = "";
    new QRCode(qrcodeElement, formNameString);
    console.log(formNameString);
}

nextButton.onclick = nextPage;
backButton.onclick = backPage;
submitButton.onclick = function() {generateQRCode("form")};
submitNameButton.onclick = function() {generateNameQRCode("form")};
updatePage();