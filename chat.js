
   
config={
    campoInserimento:document.querySelector('#chat-text'),
    taskInserimento:document.querySelector('#task-text'),
    pagina1:document.querySelector('#chat-icon>a'),
    pagina2:document.querySelector('#to-do-app>a'),
    pageContent:document.querySelector('#chat'),
    stepMargin:100,
    stepTask:100,
    stepChat:0,
    corpoChat:document.querySelector('#chat-body'),
    corpoTask:document.querySelector('#task-body'),
    check:document.querySelectorAll('.task-check'),
    contenitoreCheck:document.querySelectorAll('.task-item'),
    delete:document.querySelector('.bin'),
    taskText:document.querySelector('.task-text'),
    oraAttuale:new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }),
    campoRicerca:document.querySelector('#task-header input')

}




function initApp(){
    clickIcone();
    aggiornaPagina();
    inserimentoMessaggio();
    inserimentoTask();
    completaTask();
    rimuoviTask();
    ricerca();
    reset()
    
   
}



function clickIcone(){
    
    const taskPage=e=>{
        e.stopPropagation();
        e.preventDefault();
        aggiornaPagina(config.stepTask);

    }

    const chatPage=e=>{
        e.stopPropagation();
        e.preventDefault();
        aggiornaPagina(config.stepChat);

    }


    config.pagina1.addEventListener('click',chatPage);
    config.pagina2.addEventListener('click',taskPage);
}





function aggiornaPagina(stepMargin){
    const marginValue=stepMargin;
    config.pageContent.style.marginLeft='-'+marginValue+'vw';

}

function inserimentoMessaggio(){
    const inserimento=e=>{
        e.preventDefault();
        if(e.key==="Enter"){
        const messageUser=document.createElement('div');
        messageUser.classList.add('message', 'user');
        messageUser.innerHTML = `<p>${config.campoInserimento.value}</p>
        <span class="time">${config.oraAttuale}</span>`;
        config.corpoChat.appendChild(messageUser);
        config.campoInserimento.value=''; //reset
        }
       

    }

    config.campoInserimento.addEventListener('keyup',inserimento);
}

function inserimentoTask(){
    const inserimento=e=>{
        if(e.key==="Enter"){
            const task=document.createElement('div');
            task.classList.add('task-item');
            task.innerHTML=`<p class="task-text">${config.taskInserimento.value}</p> 
            <svg class="task-check"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>check-bold</title><path fill="#FFF"d="M9,20.42L2.79,14.21L5.62,11.38L9,
                                14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>
                                <img src="./img/delete-outline.svg" alt="">`; //nota aggiunta la classe al p
            config.corpoTask.appendChild(task);
            config.taskInserimento.value='';
            
        }
    }
    config.taskInserimento.addEventListener('keyup', inserimento);
}


function completaTask() {
  
    const checked = e => {
        const taskSimbol=e.target.closest('.task-check'); //seleziono svg piu vicina al target
        if(taskSimbol){ //se viene cliccato svg
            const taskItem=e.target.closest('.task-item'); //con closest seleziono genitore con classe task item del target(svg)
            const taskText = taskItem.querySelector('.task-text'); //seleziono p con class task text dentro taskitem
            if(taskText){ //attendo che html carichi nuovo div creato dinamicamente da inserimentoTask, fino a che non esiste non applica lo stile
            taskText.style.textDecoration = "line-through";
            }
            
            taskSimbol.innerHTML = `
                <svg class="task-completed-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>check-all</title>
                    <path fill="#e34abd" d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24, 5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z" />
                </svg>`;
        }
    
    };

    if (config.corpoTask) {
        config.corpoTask.addEventListener('click', checked);
    }

}

function rimuoviTask(){

    const remove=e=>{
        const taskItem=e.target.closest('.task-item');
        const taskDelete=e.target.closest('img');
        if(taskDelete)
        taskItem.remove();
    }


    config.corpoTask.addEventListener('click',remove)
}


function ricerca(){
    const handler=e=>{
        if(e.key==="Enter"){
            const taskRicercato=config.campoRicerca.value.toLowerCase();
            const taskItems = document.querySelectorAll('.task-item');
            taskItems.forEach(taskItem => {
                const taskText = taskItem.querySelector('.task-text').textContent.toLowerCase();
                if (taskText === taskRicercato) {
                    taskItem.style.backgroundColor = "red";
                    
                }
                
            });
            
        }
        
    }

  
    config.campoRicerca.addEventListener('keyup',handler);
    
}

function reset(){
    const reset=()=>{
       
       config.contenitoreCheck.forEach(taskItem=>{
            taskItem.style.backgroundColor="#18171A"
        })
        
    
}
config.corpoTask.addEventListener('click',reset)
}

initApp();
