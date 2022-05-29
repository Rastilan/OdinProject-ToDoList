import { isThisWeek } from 'date-fns';
import './style.css';

let selectedList = 'todo';
window.listArray = [];

window.SideBarController = function() {
    if(document.getElementsByClassName('left')[0].getAttribute('id') === 'expanded') {
        document.getElementsByClassName('container')[0].style.gridTemplateColumns = '0vw auto';
        document.getElementsByClassName('left')[0].setAttribute('id', 'collapsed');
        document.getElementById('side-bar-controller').innerHTML = '>';
    }   else {
        document.getElementsByClassName('container')[0].style.gridTemplateColumns = '15vw auto';
        document.getElementsByClassName('left')[0].setAttribute('id', 'expanded');
        document.getElementById('side-bar-controller').innerHTML = '<';
    }
    
    
}



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

window.DisplayTasks = function (selectedList) {
    let rootTasks = document.getElementById('tasks');
    document.querySelectorAll('.displayed-task').forEach(el => el.remove());

    defaultList.tasks.forEach(tasks => {
        let newTasksLI = document.createElement('li');
        newTasksLI.innerHTML = tasks.title;
        newTasksLI.classList.add('displayed-task');
        rootTasks.insertBefore(newTasksLI, rootTasks.children[defaultList.tasks.indexOf(tasks)]);
    })
}


window.SelectList = (selectListClick) => {
    if(!selectedList){
        console.log('we ran into a bug with SelectList function');
    } else {
        selectedList = selectListClick.id;
        DisplayTasks(selectedList);
    }
}

window.NewTask = () => {
    // Set root DIV of the New Task section (where it goes in the DOM)
    let rootNewTasks = document.getElementById('new-task');
    // The Div it all goes in
    let taskCreationDiv = document.createElement('div');
        taskCreationDiv.setAttribute('id', 'task-creation');
        // New Task Button - adds the information to the task array
    let taskCreationBtn = document.createElement('button');
        taskCreationBtn.innerText = "New Task";
        taskCreationBtn.setAttribute('id', 'task-creation-button');
        taskCreationBtn.setAttribute('onclick', 'PushNewTask()');
        // Takes in the name/title of the task
    let taskCreationTitle = document.createElement('textarea');
        taskCreationTitle.setAttribute('type', 'text');
        taskCreationTitle.setAttribute('id', 'task-creation-title');
        taskCreationTitle.setAttribute('placeholder', 'Name of task');
        taskCreationTitle.setAttribute('maxlength', '40');
        taskCreationTitle.setAttribute('required', 'true');
        // Takes in a description of the task
    let taskCreationDesc = document.createElement('textarea');
        taskCreationDesc.setAttribute('type', 'textarea');
        taskCreationDesc.setAttribute('id', 'task-creation-desc');
        taskCreationDesc.setAttribute('placeholder', 'Description of task');
        taskCreationDesc.setAttribute('maxlength', '140');
        taskCreationDesc.setAttribute('required', 'true');
        // Sets the date of the task
    let taskCreationDate = document.createElement('input');
        taskCreationDate.setAttribute('type', 'date');
        taskCreationDate.setAttribute('id', 'task-creation-date');
        taskCreationDate.setAttribute('placeholder', 'Date');
        // Sets the Group the task falls into / If left empty is just added to the default list
    


        rootNewTasks.insertBefore(taskCreationDiv, rootNewTasks.children[0]);
        taskCreationDiv.insertBefore(taskCreationTitle, taskCreationDiv.children[0]);
        taskCreationDiv.insertBefore(taskCreationDesc, taskCreationDiv.children[1]);
        taskCreationDiv.insertBefore(taskCreationBtn, taskCreationDiv.children[2]);
        rootNewTasks.setAttribute('onclick', '');
        
}

window.PushNewTask = () => {
    // Tasks are built as Title / Description / Date / Group / Flag / Checked
    defaultList.tasks.push(new TaskConstuctor(document.getElementById('task-creation-title')));
}

window.defaultList = new ListConstructor('todo', 'default', 'blue'); 
window.todayList = new ListConstructor('today', 'default', 'green');
window.upcomingList = new ListConstructor('upcoming', 'default', 'orange');
listArray.push(defaultList, todayList, upcomingList);
DisplayLists();

