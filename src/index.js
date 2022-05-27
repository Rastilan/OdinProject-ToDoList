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
    let rootNewTasks = document.getElementById('new-task');
    let taskCreationDiv = document.createElement('div');
        taskCreationDiv.setAttribute('id', 'task-creation');
        rootNewTasks.insertBefore(taskCreationDiv, rootNewTasks.children[0]);
    console.log(selectedList);
}

window.defaultList = new ListConstructor('todo', 'default', 'blue'); 
window.todayList = new ListConstructor('today', 'default', 'green');
window.upcomingList = new ListConstructor('upcoming', 'default', 'orange');
listArray.push(defaultList, todayList, upcomingList);
DisplayLists();

