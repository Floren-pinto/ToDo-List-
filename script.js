// input
const addDetail = document.getElementById("add-detail");
const addList = document.getElementById("adding-list");
const taskList = document.getElementById("task-list");
const detailFill = document.getElementById("detail-fill");
var taskCurentText;
var taskCurentDescription;


// handler
function checkWordLimit(input, limit) {
    const words = input.value.trim().split(/\s+/); 
    const wordCount = words.length;
    
    if (wordCount > limit) {
        input.value = words.slice(0, limit).join(" ");
        confirm("inputa liafuan limitadu iha "+limit)
    }
}

function importInput() {
    let inputValue = document.getElementById("input-text").value;
    let descriptionValue = detailFill.children[1].value;
    let dateValue = detailFill.children[0].children[0].value;
    let timeValue = detailFill.children[0].children[1].value;


    if (inputValue === "") {
        alert("favor inputa lista servisu");
    } else {
        function createElement(tagName, className = ""){
            let element = document.createElement(tagName);
            element.setAttribute("class", className);
        
            return element;
        }   
        let li = createElement("li");
        let p = createElement("p", "title");
        let div = createElement("div", "description-wrap");
        let span = createElement("span", "date");
        let btnDescription = createElement("button", "show-description");
        let description = createElement("p", "description transition");
        
        p.setAttribute("onclick", "editable(this)");
        description.setAttribute("onclick", "editable(this)");

        taskList.append(li);
        li.append(createElement("button", "uncheck-list transition"));
        li.append(p);
        li.append(createElement("button", "remove-list"));
        li.append(div);
        div.append(span);
        div.append(description);
        
        p.textContent = inputValue;
        p.style.transition = "125ms";

        if(dateValue !== '' || timeValue !== '' || descriptionValue !== ''){
            if (timeValue !== '' || dateValue !== '') {
                span.textContent = dateValue +" | "+ timeValue;
            }
            li.append(btnDescription);
            btnDescription.textContent = "i";
        }
        description.textContent = descriptionValue;

    if(detailFill.classList.contains("pull-down")) {
        toggle();
    }
    function resetValueById(...arguments){
        for (const argumment of arguments) {
            document.getElementById(argumment).value = '';
        }
    }
    resetValueById("input-text", "date-input", "time-input", "description-input");
    }
}

function listEvent(e){
    let t = e.target;
    if(t.tagName === "BUTTON"){
        if (t.classList.contains("remove-list")) {
            t.parentElement.remove();
        }else if(t.classList.contains("uncheck-list") || t.classList.contains("check-list")){
            t.classList.toggle("check-list");
            t.classList.toggle("uncheck-list");
            if (t.classList.contains("check-list")) {
                t.nextElementSibling.style.textDecoration = "line-through";
            }else{
                t.nextElementSibling.style.textDecoration = "none";
            }
        }else{
            t.previousSibling.children[1].classList.toggle("description-unhide");
        }
    }
}

function toggle(){
    const className = detailFill.classList;
    className.toggle("pull-down");
    className.toggle("unvisible");
}

function pullDown() {
    if (detailFill.classList.contains("pull-down")) {
        toggle();
    }else{
        toggle();
    }
}

function editable(e){
    let curentTExt = e.innerHTML;

    if (e.classList.contains("title")) {
        e.outerHTML = `<input type="text" value="${curentTExt}" onblur="safeText(this)" oninput="checkWordLimit(this, 9)" class="title">`;
        taskCurentText = curentTExt;
        
        return taskCurentText;
    }else{
        e.outerHTML = `<textarea class="description description-unhide"  onblur="safeText(this)">${curentTExt}</textarea>`
        taskCurentDescription = curentTExt;
        
        return taskCurentDescription; 
    }
}

function safeText(e){
    let newText = e.value;

    if (e.classList.contains("title")) {
        if (newText !== "") {
            e.outerHTML = `<p class="title" onclick="editable(this)">${newText}</p>`;
            console.log(newText);
        }else{
            e.outerHTML = `<p class="title" onclick="editable(this)">${taskCurentText}</p>`;
        }
    }else{
        if (newText !== "") {
            e.outerHTML = `<p class="description transition description-unhide" onclick="editable(this)">${newText}</p>`;
        }else{
            e.outerHTML = `<p class="description transition description-unhide" onclick="editable(this)">${taskCurentDescription}</p>`;
        }
    }
}

// action
taskList.addEventListener("click", (e)=> listEvent(e));
addDetail.addEventListener("click", pullDown);

// save change