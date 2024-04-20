const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box"),
closeIcon = popupBox.querySelector("header i"),
popupTitle = document.querySelector("header p"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");


 const months = ["January", "February" , "March", "April", "Mai", "June", "July" , "August" , "September", "October", "November", "December"];
 let isUpdate = false, updateId;



 //getting localStorage notes if exist and parsing them to js object else passing an empty array to notes
    const notes = JSON.parse(localStorage.getItem("notes") || "[]")
 

addBox.addEventListener("click", ()=>{
  titleTag.focus();
  popupBox.classList.add("show")
})




closeIcon.addEventListener("click", ()=> {
    isUpdate = false;
    titleTag.value ="";
    descTag.value = "";
    addBtn.innerText = "Add a Note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove("show");
})



addBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    let noteTitle = titleTag.value;
    let noteDesc = descTag.value;

    if(noteTitle || noteDesc) {
        //getting (month , day, year ) from the current date;

        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDay(),
        year =dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            Date: `${month} ${day}, ${year}`
        }
        
        if(!isUpdate)
       { notes.push(noteInfo);//adding new note to notes
    } else{
        isUpdate = false;
        notes[updateId]= noteInfo; //updating specified note
     }
        localStorage.setItem("notes", JSON.stringify(notes)); //saving notes to localStorage and convert the object to string
        closeIcon.click();
        showNotes();
    }


    console.log(notes)
})




function showNotes() {

    //removing all previous notes before add the new one
    document.querySelectorAll(".note").forEach(note=> note.remove())

    notes.forEach((note, index) =>{
        let liTag = `
                      <li class="note">
                
                        <div class="details">
                          <p>${note.title} </p>
                          <span>${note.description}</span>
                        </div>
                
                        <div class="bottom-content">
                          <span>${note.Date}</span>
                
                          <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                
                            <ul class="menu">
                              <li onclick="updateNote(${index}, '${note.title}', '${note.description}') " ><i class="uil uil-pen"></i>Edit</li>
                              <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                            </ul>
                          </div>
                        </div>
                        
                      </li>`;
      addBox.insertAdjacentHTML("afterend", liTag);                
    });
}

showNotes();



function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", e => {

    //removing show class from the settings menu on document click
    if(e.target.tagName != "I" || e.target != elem){
        elem.parentElement.classList.remove("show");
    }
  })
};

function deleteNote(noteId) {

    let confirmDel = confirm ("Are you sure you want to delete this?");
    if(!confirmDel) return;
  notes.splice(noteId, 1); //removing selected note from array/tasks
   //saving updated notes to local storage
   localStorage.setItem("notes", JSON.stringify(notes));
   showNotes();
}


function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note"
}










































