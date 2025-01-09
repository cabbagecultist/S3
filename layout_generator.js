var form = document.getElementById("form");

try {
    var layout = JSON.parse(layout_json);
} catch (error) {
  console.error("Invalid JSON configuration file! Error follows.", error);
}

// Generate Page Divs.
for (let pageJson of layout["pages"]) {
    let page = document.createElement("div");
    page.className = "page";
    page.id = pageJson["name"];
    page.setAttribute("data-description", pageJson["description"]);

    let title = pageJson["name"];

    // Create list of elements to add on page.
    let pageElements = layout[title];

    if (pageElements == undefined) {
        console.error("No page element definition in JSON for page: " + title);
    } else {
        for (let pageElement of pageElements) {
            // Add custom page elements here.
            // Make sure to set the class of the element as "choice" in order to ensure correct spacing between elements.
            switch (pageElement["type"]) {
                case "checkbox": {
                    let element = document.createElement("input");
                    let label = document.createElement("label");
    
                    element.setAttribute("type", "checkbox");
                    // TODO autogenerate id for page elements
                    element.id = pageElement["id"];
                    element.name = pageElement["id"];
                    element.className = "choice";
    
                    label.setAttribute("for", element.id);
                    label.innerHTML = pageElement["title"];
                    page.append(element, label);
                    }
                    break;
                case "choice": {
                    let choiceID = 0;
                    let container = document.createElement("div");
                    container.id = pageElement["id"];
                    container.className = "choice";
    
                    let label = document.createTextNode(pageElement["title"]);
                    container.appendChild(label);
    
                    for (choice of pageElement["choices"]) {
                        let radio = document.createElement("input");
                        let label = document.createElement("label");
    
                        radio.setAttribute("type", "radio");
                        radio.setAttribute("value", choice);
                        radio.name = pageElement["id"];
                        radio.id = pageElement["id"] + String(choiceID);
    
                        label.setAttribute("for", radio.id);
                        label.innerHTML = choice;
                        container.append(radio, label);
                        
                        choiceID++;
                    }
                    page.appendChild(container);
                    }
                    break;
                case "text": {
                    let element = document.createElement("input");
                    let label = document.createElement("label");
    
                    element.setAttribute("type", "text");
                    element.setAttribute("onkeypress", "return event.keyCode!=13");
                    // TODO autogenerate id for page elements
                    element.id = pageElement["id"];
                    element.name = pageElement["id"];
                    element.className = "choice"
    
                    label.setAttribute("for", element.id);
                    label.innerHTML = pageElement["title"];
                    page.append(label, element);
                    }
                    break;
                default:
                    console.error("Invalid element type in JSON layout! Element is logged after this error.");
                    console.log(pageElement);
            }
        }
    }

    form.appendChild(page);
}

function find(obj, key) {
    let values = [];
    if (typeof obj === "object" && obj !== null){
        if (obj[key]) {
            values.push(subObj[key]);
        }

        for (let subObj of Object.entries(obj)) {
            if (subObj[1][key]) {
                values.push(subObj[1][key]);
            }
            console.log(subObj[1]);
            values.concat(find(subObj[1], key));
        }
    }
    return values;
}

console.log(find(layout, "id"));