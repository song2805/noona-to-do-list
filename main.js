//유저가 값을 입력한다
//+ 버튼을 클릭하면, 할 일이 추가 된다.
// check 버튼을 누르면 할 일이 끝나면서 중간에 줄이 그어진다.
//1. check 버튼을 클릭하는 순간 true false
//2. true 이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로
// delete 버튼을 누르면 할일이 삭제된다.
//진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴
//할일을 입력하고 나면 입력창이 자동으로 비워지게 하기
//입력한 할일이 없다면 item이 추가 안되게 막아보자(버튼을 disable 시키거나 or 버튼 클릭시 할일을 입력해주세요 메세직 뜬다)
//All, not Done, Done 아래 예쁜 슬라이드바 만들기
//Enter 버튼 클릭하면 자동으로 아이템 추가하기
//

// input 창에 글자 쓰는 곳 가져오기
let taskInput = document.getElementById("task-input");

// + 버튼 (할일 추가 버튼 가져오기)
let addButton = document.getElementById("add-button");
let taskDashBoard = document.getElementById("task-dashboard");

// 여러개를 선택해야하니까 document.querySelectorAll 를 사용합니다.
let tabsClick = document.querySelectorAll(".task-tabs div");

// 언더바 그려주기
let horizontalUnderLine = document.getElementById("under-line");
// console.log(horizontalUnderLine);
// console.log(tabsClick);

tabsClick.forEach((menu) => menu.addEventListener("click",(e)=>horizontalindicator(e) ));


// pink under line
function horizontalindicator(e) {
    
    horizontalUnderLine.style.left = (e.currentTarget.offsetLeft + 12) + "px";
    horizontalUnderLine.style.width = (e.currentTarget.offsetWidth - 20) + "px";
    horizontalUnderLine.style.top = e.currentTarget.offsetTop + (e.currentTarget.offsetHeight - 9)+ "px";
    
}

// 여기 까지 언더바 움직이기 까지 그려줬어요


// 전역변수로 지정, id="all"로 초기값을 지정했다
let mode = 'all';
let filterList =[];
// let doneList = [];

//B-2 할일 추가 장소 (Array 만듬)
let taskList = [];
addButton.addEventListener("click", addTask);

//Enter 버튼 클릭하면 자동으로 아이템 추가하기 및 글씨를 자동으로 지워줌
taskInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        addTask(event);
        }
    });


// All - Not Done - End ==> tabs click 할 수 있게 만들기
// console.log(tabsClick);  작동 확인하는 습관이 필요해요...
for(let i=1; i < tabsClick.length; i++) {
    tabsClick[i].addEventListener("click", function(event){
        filter(event);
    });
}

function addTask() {
    console.log("clicked");
  

    let taskValue = taskInput.value;
    if (taskValue === "") return alert("할일을 입력해주세요");
    
    //3.할일앱 3탄: 객체의 활용해서 추가 정보가 필요할 때

    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    taskInput.value=""; // Input 창에 할일을 입력하고 나면 입력창이 자동으로 비워지게 하기
    console.log(taskList);
    render();
}
// input에 있는 value를 없에주는 코드. "focus"란 커서가 오게될때란 뜻이다. 여서 function을 그대로 쓴것은 유일하게 이것 하나만 쓸때 가능하답니다.
taskInput.addEventListener("focus", function () {
    taskInput.value = "";
})



function render() {

    let resultHTML = "";


    //1. 내가 선택한 탭에 따라서 (내가 선택한 탭의 정보는 let mode = event.target.id 에 있다.
   
    let list = [];
    if(mode === "all"){
        list = taskList;
         // all taskList
    }else if(mode === "ongoing" || mode === "done") {
         // ongoing, done filterList 보여준다
         list = filterList;
    }
     //2. 리스트를 다르게 보여준다
    // else if(mode === "done") {
    //     list = filterList;
    // }


   

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            
            resultHTML += `<div class="row task task-done">
                                <span class="col-md-9">
                                    ${list[i].taskContent}
                                </span>                   
                                <div class="col-md-3 button-box">
                                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left rotate-icon"></i></button>
                                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash delete-icon"></i></button>
                                </div>
                            </div>`;
        } else {
            //resultHTML = resultHTML +  은 아래와 같은 기능
            resultHTML += 
                `<div class="row task">
                    <span class="col-md-9">
                        ${list[i].taskContent}  
                    </span>                   
                    <div class="col-md-3 button-box">
                        <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check check-icon"></i></button>
                        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash delete-icon"></i></button>
                    </div>
                </div>`;
                
        }
    }
    




    // taskDashBoard.innerHTML = resultHTML;
    document.getElementById("task-dashboard").innerHTML = resultHTML;
}


function toggleComplete(id) {
    //어떤 아이템을 선택했는지, ID를 부여한다.
    console.log("id:", id); //test done

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            // 현재 값의 반대를 넣어 줄때 !taskList[i].isComplete; 로 코딩한다.
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
   filter();
    console.log(taskList);
}

function deleteTask(id){
    console.log("삭제하자", id);


    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            
            taskList.splice(i,1)
           
        }
    }
    console.log(taskList);
    filter();
}

// addEventListener("click", function(event){  filter(event); } 부터 매개변수 event 받아온다.   
// [중요] event에는 내가 누구를 클릭했는지에 대한 정보를 가지고 있기 때문이다.
function filter(event) {
    // target 은 마우스를 클릭한 target을 가져오는 것이고, id 만을 가져오기를 코딩했다
//   console.log("filter", event.target.id);
  
  

  if(event){
    //전체 리스트를 보여준다
    mode = event.target.id
    console.log("all", taskList);
  }
    
  filterList =[];
  if(mode === "ongoing"){
    //진행중인 리스트만 보여준다
    //computer language는 task.isComplete = false 를 가져와 보여 주는 것이다.
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].isComplete === false){
            //여기서 NewList  진행중인것만 모아놓는 filter된 리스트를 만들어준다
            filterList.push(taskList[i])
        }
    }
   
    console.log("진행중", filterList)
  }else if(mode === "done") {
    // 끝나는 케이스를 보여준다
    // 컴퓨터 언어로는 task.isComplete = true 를 가져와 보여 주는 것이다.
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].isComplete === true){
            filterList.push(taskList[i]);
        }
            
    }
    
    console.log("끝남", filterList)

  }

  render();
}

// random ID 만들어주는 코드
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}


