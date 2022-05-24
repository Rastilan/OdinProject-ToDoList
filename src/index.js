import './style.css';

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
    taskArray = [];

    constructor(listTitle, listGroup) {
        this.title = listTitle;
        this.group = listGroup;
    }
    tasksConstructor(val){
        
        return taskArray.push(val);
    }
    tasks() {
        return console.log("test");
    }
}

window.DisplayLists = function () {
    let rootList = document.getElementById('default-list');

    let newListLI = document.createElement('li');
    

    listArray.forEach(list => {
        console.log(list);
        console.log(listArray.indexOf(list));
        let newListLI = document.createElement('li');
        newListLI.innerHTML = list.title;
        rootList.insertBefore(newListLI, rootList.children[listArray.indexOf(list)]);
    })
  
}

window.defaultList = new ListConstructor('todo', 'default'); 
window.todayList = new ListConstructor('today', 'default');
listArray.push(defaultList);
listArray.push(todayList);
DisplayLists();