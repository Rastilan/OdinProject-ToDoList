import { isThisWeek, isToday, parseISO } from 'date-fns';
import './style.css';
import { SideBarController } from '../modules/side-bar-controller';
import { NewTask } from '../modules/new-task';


let selectedList = 'ToDo';
window.listArray = [];




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

            }
            
            
        }
            
        
    }
    if(newTitle !== "" && newDesc !== "" && newDate !== "" && newGroup !== ""){
        defaultList.tasks.push(new TaskConstuctor(newTitle, newDesc, newDate, newGroup, newFlag, newChecked));
        document.getElementById('task-creation').remove();
        document.getElementById('new-task').setAttribute('onclick', 'NewTask()');
        DisplayTasks();
        DisplayLists();
    } 
    
    
    
}

window.EditTask = (el) => {
    let taskToEditGroup = el.children[1].innerHTML;
    let taskToEditDate = el.children[2].innerHTML;
    let taskToEditDesc = el.children[3].innerHTML;
    let taskToEditTitle = el.children[4].innerHTML;
    let edittedTaskGroup = document.createElement('textarea');

    el.replaceChild(edittedTaskGroup, taskToEditGroup);
}









// LIST CONSTRUCTOR TITLE / GROUP / COLOR
window.defaultList = new ListConstructor('ToDo', 'default', 'blue'); 
window.todayList = new ListConstructor('Today', 'default', 'green');
window.upcomingList = new ListConstructor('ThisWeek', 'default', 'orange');

listArray.push(defaultList, todayList, upcomingList);
DisplayLists();

