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
    

    listArray.forEach(list => {
        let newListLI = document.createElement('li');
        newListLI.innerHTML = list.title;
        newListLI.setAttribute('onclick', 'SelectList(' + list.title + ')');
        newListLI.setAttribute('id', list.title);
        rootList.insertBefore(newListLI, rootList.children[listArray.indexOf(list)]);
    })
  
}

window.DisplayTasks = function () {
    let rootTasks = document.getElementById('tasks');
    document.querySelectorAll('.displayed-task').forEach(el => el.remove());
    let listToDisplay = document.getElementsByClassName('selected-list')[0].id;
    
    defaultList.tasks
    
    .filter (function (toSort){
        if(listToDisplay == 'ToDo') {
            return toSort;
        }
        if(listToDisplay == 'Today' && isToday(toSort.date)) {
            return toSort;
        }
        if(listToDisplay == 'ThisWeek' && isThisWeek(toSort.date)){
            return toSort;
        }
        else{ 
            console.log('filter failed in DisplayTasks Function');
        }

    })
    .forEach(function(tasks) {
        let rootTaskDiv = document.createElement('div');
        rootTaskDiv.classList.add('displayed-task');
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
        
        rootTasks.insertBefore(rootTaskDiv, rootTasks.children[defaultList.tasks.indexOf(tasks)])
        rootTaskDiv.insertBefore(newTaskGroup, rootTaskDiv.children[0]);
        rootTaskDiv.insertBefore(newTaskDate, rootTaskDiv.children[1]);
        rootTaskDiv.insertBefore(newTaskDesc, rootTaskDiv.children[2]);
        rootTaskDiv.insertBefore(newTaskTitle, rootTaskDiv.children[3]);
    })
}


window.SelectList = (selectListClick) => {
    if(!selectedList){
        console.log('we ran into a bug with SelectList function');
    } else {
        selectedList = selectListClick.id;
        document.getElementsByClassName('selected-list')[0].classList.remove('selected-list');
        document.getElementById(selectedList).classList.add('selected-list');
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
    // HERES WHERE I AM TODAY!
    for(let i = 0; i < document.getElementById('default-list').children.length; i++){
        if(newGroup == document.getElementById('default-list').children[i].id) {
            console.log(newGroup);
            return;
        }
        if(i = document.getElementById('default-list').children.length){
            console.log('run');
        }
            
        
    }
    if(newTitle !== "" && newDesc !== "" && newDate !== "" && newGroup !== ""){
        defaultList.tasks.push(new TaskConstuctor(newTitle, newDesc, newDate, newGroup, newFlag, newChecked));
        document.getElementById('task-creation').remove();
        document.getElementById('new-task').setAttribute('onclick', 'NewTask()');
        DisplayTasks();
    } 
    
    
    
}

window.defaultList = new ListConstructor('ToDo', 'default', 'blue'); 
window.todayList = new ListConstructor('Today', 'default', 'green');
window.upcomingList = new ListConstructor('ThisWeek', 'default', 'orange');

listArray.push(defaultList, todayList, upcomingList);
DisplayLists();
document.getElementById('ToDo').classList.add('selected-list');
