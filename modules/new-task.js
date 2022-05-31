window.NewTask = function() {
    // Set root DIV of the New Task section (where it goes in the DOM)
    let rootNewTasks = document.getElementById('new-task');
    // The Div it all goes in
    let taskCreationDiv = document.createElement('div');
        taskCreationDiv.setAttribute('id', 'task-creation');
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
        taskCreationDate.setAttribute('height', '20px');
        taskCreationDate.style.border = 'none';
        // Sets the Group the task falls into / If left empty is just added to the default list
    let taskCreationGroup = document.createElement('textarea');
        taskCreationGroup.setAttribute('type', 'text');
        taskCreationGroup.setAttribute('id', 'task-creation-group');
        taskCreationGroup.setAttribute('placeholder', 'Group Name');
        taskCreationGroup.setAttribute('maxlength', '20');
        taskCreationGroup.setAttribute('height', '20px');
        taskCreationGroup.style.border = 'none';
        taskCreationGroup.setAttribute('rows', '1');
        // New Task Button - adds the information to the task array
    let taskCreationBtn = document.createElement('button');
        taskCreationBtn.innerText = "Add Task";
        taskCreationBtn.setAttribute('id', 'task-creation-button');
        taskCreationBtn.setAttribute('onclick', 'PushNewTask();');
        // Cancel Task Creation Button - closes and removes all the elements pertaining to adding info to the array
    let taskCreationCancelBtn = document.createElement('button');
        taskCreationCancelBtn.innerHTML = "Cancel";
        taskCreationCancelBtn.setAttribute('id', 'task-creation-cancel-button');
        taskCreationCancelBtn.setAttribute('onclick', 'CancelNewTask()');

        rootNewTasks.insertAdjacentElement('afterend', taskCreationDiv);
        taskCreationDiv.insertBefore(taskCreationTitle, taskCreationDiv.children[0]);
        taskCreationDiv.insertBefore(taskCreationDesc, taskCreationDiv.children[1]);
        taskCreationDiv.insertBefore(taskCreationDate, taskCreationDiv.children[2]);
        taskCreationDiv.insertBefore(taskCreationGroup, taskCreationDiv.children[3]);
        taskCreationDiv.insertBefore(taskCreationBtn, taskCreationDiv.children[4]);
        taskCreationDiv.insertBefore(taskCreationCancelBtn, taskCreationDiv.children[5]);

        //Disables the New Task Button while creating a new task
        rootNewTasks.setAttribute('onclick', '');
        
}