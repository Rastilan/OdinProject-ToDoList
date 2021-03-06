import { isThisWeek, isToday, parseISO } from 'date-fns';
import './style.css';
import { SideBarController } from '../modules/side-bar-controller';
import { NewTask } from '../modules/new-task';


let selectedList = 'ToDo';
window.listArray = [];

let defaultList, todayList, upcomingList;




class ListConstructor  {

    constructor(listTitle, listGroup, listColor) {
        this.title = listTitle;
        this.group = listGroup;
        this.color = listColor;
    }
    tasks = [];
}

class TaskConstuctor {
    constructor(taskTitle, taskDesc, taskDate, taskGroup, taskFlag, taskChecked) {
    this.title = taskTitle;
    this.desc = taskDesc;
    this.date = taskDate;
    this.group = taskGroup;
    this.flag = taskFlag;
    this.checked = taskChecked;
    
    }
    
}

window.DisplayLists = function () {
    let rootList = document.getElementById('default-list');
    
    
    document.querySelectorAll('.displayed-list').forEach(el => el.remove());
      

    listArray.forEach(list => {
        let newListLI = document.createElement('li');
        newListLI.innerHTML = list.title;
        newListLI.setAttribute('onclick', 'SelectList(' + list.title + ')');
        newListLI.setAttribute('id', list.title);
        newListLI.classList.add('displayed-list');
        rootList.insertBefore(newListLI, rootList.children[listArray.indexOf(list)]);
    })
    if(document.getElementsByClassName('selected-list').length < 1){
        document.getElementById('ToDo').classList.add('selected-list');
    }
  
}

window.DisplayTasks = function () {
    let rootTasks = document.getElementById('tasks');
    document.querySelectorAll('.displayed-task').forEach(el => el.remove());
    let listToDisplay = document.getElementsByClassName('selected-list')[0].id;
    let i=0;
    defaultList.tasks
    
    .filter (function (toSort){
        if(listToDisplay.toLowerCase() == 'todo') {
            return toSort;
        }
        if(listToDisplay.toLowerCase() == 'today' && isToday(toSort.date)) {
            return toSort;
        }
        if(listToDisplay.toLowerCase() == 'thisweek' && isThisWeek(toSort.date)){
            return toSort;
        }
        if(listToDisplay.toLowerCase()  == toSort.group.toLowerCase() ){
            return toSort;
        }
        else{ 
            
        }

    })
    .forEach(function(tasks) {
        let rootTaskDiv = document.createElement('div');
        rootTaskDiv.classList.add('displayed-task');
        rootTaskDiv.id = "task" + i;
        let newTaskTitle = document.createElement('div');
        newTaskTitle.innerHTML = tasks.title;
        newTaskTitle.classList.add('displayed-task-title');
        let newTaskDesc = document.createElement('div');
        newTaskDesc.innerHTML = tasks.desc;
        newTaskDesc.classList.add('displayed-task-desc');
        let newTaskDate = document.createElement('div');
        newTaskDate.innerHTML = tasks.date;     
        newTaskDate.classList.add('displayed-task-date');
        let newTaskGroup = document.createElement('div');
        newTaskGroup.innerHTML = tasks.group;
        newTaskGroup.classList.add('displayed-task-group');
        let newTaskEdit = document.createElement('button');
        newTaskEdit.innerHTML = 'EDIT';
        newTaskEdit.classList.add('displayed-task-edit');
        newTaskEdit.setAttribute('onclick', 'EditTask('+'task'+i+')');
        

        
        rootTasks.insertBefore(rootTaskDiv, rootTasks.children[defaultList.tasks.indexOf(tasks)])
        rootTaskDiv.insertBefore(newTaskEdit, rootTaskDiv.children[0])
        rootTaskDiv.insertBefore(newTaskGroup, rootTaskDiv.children[1]);
        rootTaskDiv.insertBefore(newTaskDate, rootTaskDiv.children[2]);
        rootTaskDiv.insertBefore(newTaskDesc, rootTaskDiv.children[3]);
        rootTaskDiv.insertBefore(newTaskTitle, rootTaskDiv.children[4]);

        i++;
    })
}


window.SelectList = (selectListClick) => {
    if(!selectedList){
        selectedList = 'ToDo';
    } else {
        selectedList = selectListClick.id;
        if(document.getElementsByClassName('selected-list')){
            document.getElementsByClassName('selected-list')[0].classList.remove('selected-list');
            document.getElementById(selectedList).classList.add('selected-list');
        }
        
        
        DisplayTasks();
        document.getElementById('current-list-title').innerHTML = selectedList;
    }
}



window.PushNewTask = () => {
    // Tasks are built as Title / Description / Date / Group / Flag / Checked
    document.getElementById('new-task').setAttribute('onclick', '')
    let newTitle = document.getElementById('task-creation-title').value;
    let newDesc = document.getElementById('task-creation-desc').value;
    let newDate = parseISO(document.getElementById('task-creation-date').value);
    let newGroup = document.getElementById('task-creation-group').value;

    let newFlag = false;
    let newChecked = false;
    
    for(let i = 0; i < document.getElementById('default-list').children.length; i++){
        if(newGroup.toLowerCase() == document.getElementById('default-list').children[i].id.toLowerCase() || newGroup.toLowerCase() == 'today' || newGroup.toLowerCase() == 'thisweek') {
            break;
        }
        if(i = document.getElementById('default-list').children.length){
            let newList = [newGroup][0];
            newList = new ListConstructor(newGroup, newGroup, 'yellow');
            if(listArray.some(val => val.group.toLowerCase() === newGroup.toLowerCase())){
                break;
            }
            else {
                
                listArray.push(newList);

                localStorage.setItem('lists', JSON.stringify(listArray));
                

            }
            
            
        }
            
        
    }
    if(newTitle !== "" && newDesc !== "" && newDate !== "" && newGroup !== ""){
        //defaultList.tasks.push(new TaskConstuctor(newTitle, newDesc, newDate, newGroup, newFlag, newChecked));
        listArray[0].tasks.push(new TaskConstuctor(newTitle, newDesc, newDate, newGroup, newFlag, newChecked));
        localStorage.setItem('lists', JSON.stringify(listArray));
        document.getElementById('task-creation').remove();
        document.getElementById('new-task').setAttribute('onclick', 'NewTask()');
        DisplayTasks();
        DisplayLists();
    } 
    
    
    
}

window.EditTask = (el) => {
   // let taskToEditButtonVal = el.children[0].innerHTML;
    let taskToEditGroupVal = el.children[1].innerHTML;
    let taskToEditDateVal = el.children[2].innerHTML;
    let taskToEditDescVal = el.children[3].innerHTML;
    let taskToEditTitleVal = el.children[4].innerHTML;
    let taskToEditButton = el.children[0];
    let taskToEditGroup = el.children[1];
    let taskToEditDate = el.children[2];
    let taskToEditDesc = el.children[3];
    let taskToEditTitle = el.children[4];
    let editedTaskGroup = document.createElement('textarea');
    let editedTaskDate = document.createElement('textarea');
    let editedTaskDesc = document.createElement('textarea');
    let editedTaskTitle = document.createElement('textarea');
    let editedTaskButton = document.createElement('button');
    editedTaskTitle.value = taskToEditTitleVal;
    editedTaskGroup.value = taskToEditGroupVal;
    editedTaskDate.value = taskToEditDateVal;
    editedTaskDesc.value = taskToEditDescVal;
    editedTaskButton.innerHTML = "Save Changes";
    let test = el.id;
    editedTaskButton.setAttribute('onclick', `SaveEdit(${test})`);

    editedTaskTitle.classList.add('displayed-task-title');
    editedTaskGroup.classList.add('displayed-task-group');
    editedTaskDate.classList.add('displayed-task-date');
    editedTaskDesc.classList.add('displayed-task-desc');
    editedTaskButton.classList.add('save-edit-button');


    el.replaceChild(editedTaskGroup, taskToEditGroup);
    el.replaceChild(editedTaskDate, taskToEditDate);
    el.replaceChild(editedTaskDesc, taskToEditDesc);
    el.replaceChild(editedTaskTitle, taskToEditTitle);
    el.replaceChild(editedTaskButton, taskToEditButton);

}
window.SaveEdit = (el) => {  
    let editButtonOld = el.children[0];
    let saveGroupVal = el.children[1];
    let saveDateVal = el.children[2];
    let saveDescVal = el.children[3];
    let saveTitleVal = el.children[4];
    
   
    let saveGroupDiv = document.createElement('div');
    let saveDateDiv = document.createElement('div');
    let saveDescDiv = document.createElement('div');
    let saveTitleDiv = document.createElement('div');
    let editButton = document.createElement('button');
    
    editButton.innerHTML = "EDIT";
    editButton.setAttribute('onclick', `EditTask(${el.id})`);

    saveTitleDiv.classList.add('displayed-task-title');
    saveGroupDiv.classList.add('displayed-task-group');
    saveDateDiv.classList.add('displayed-task-date');
    saveDescDiv.classList.add('displayed-task-desc');
    editButton.classList.add('save-edit-button');
    saveTitleDiv.innerHTML = saveTitleVal.value;
    saveGroupDiv.innerHTML = saveGroupVal.value;
    saveDateDiv.innerHTML = saveDateVal.value;
    saveDescDiv.innerHTML = saveDescVal.value;
    el.replaceChild(saveGroupDiv, el.children[1]);
    el.replaceChild(saveDateDiv, el.children[2]);
    el.replaceChild(saveDescDiv, el.children[3]);
    el.replaceChild(saveTitleDiv, el.children[4]);
    el.replaceChild(editButton, editButtonOld);

    let taskToUpdate = el.id.replace('task', '');
    let newFlag, newChecked;
    listArray[0].tasks[taskToUpdate] = new TaskConstuctor(saveTitleDiv.innerHTML, saveDescDiv.innerHTML, saveDateDiv.innerHTML, saveGroupDiv.innerHTML, newFlag, newChecked);

    localStorage.setItem('lists', JSON.stringify(listArray));
}






if(localStorage.getItem('lists') == null) {
    // LIST CONSTRUCTOR TITLE / GROUP / COLOR
    defaultList = new ListConstructor('ToDo', 'default', 'blue'); 
    todayList = new ListConstructor('Today', 'default', 'green');
    upcomingList = new ListConstructor('ThisWeek', 'default', 'orange');
    listArray.push(defaultList, todayList, upcomingList);
    localStorage.setItem('lists', JSON.stringify(listArray));
}
else {
    
    listArray = JSON.parse(localStorage.getItem('lists'));
    console.log(JSON.parse(localStorage.getItem('lists')));
    defaultList = listArray[0];
    todayList = listArray[1];
    upcomingList = listArray[2];
}






DisplayLists();
DisplayTasks();
