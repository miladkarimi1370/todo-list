const myDate = document.querySelector(".date>span");
let myTime = document.querySelector(".time>span");
const fullName = document.querySelector(".fullName");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const mainApp = document.querySelector(".mainApp");
const buttonForGetFullName = document.querySelector(".buttonForGetFullName");
const popUp = document.querySelector(".popUp");
const taskInput = document.querySelector("#task");
const startTime = document.querySelector(".start-time>input");
const endTime = document.querySelector(".end-time>input");
let rootTaskWrapper = document.querySelector(".oneInstanceOfTask");
let arrayOfTasks = [];
let accessOfChange = false;


const createDate = new Date().toLocaleDateString("fa");
myDate.innerText = createDate;

const createTime = () => {
    return setTimeout(() => {
        const t = new Date().toLocaleTimeString("fa");
        myTime.innerText = t

        createTime();
    }, 1000);

}
createTime();

const everyWorkOnLoadingWebpageForTheFirstTime = () => {
    const myfullName = JSON.parse(localStorage.getItem("fullName"));
    if (myfullName != null) {
        fullName.innerText = myfullName + " " + "عزیز" + " " + "خوش آمدید 🖐";
        popUp.classList.replace("left-0", "left-[-2000px]");
        popUp.classList.add("hidden")

        mainApp.classList.remove("blur-2xl");
    } else {

        popUp.classList.add("left-[-200px");
        mainApp.classList.add("blur2xl");

    }
    taskInput.focus();
    const myTasks = JSON.parse(localStorage.getItem("tasks"));

    myTasks && myTasks.map((item, index) => {
        arrayOfTasks.push(item)
        createTemplateTask(index + 1, item.myTaskInput, item.myStartTime, item.myEndTime)
    })


}
buttonForGetFullName.addEventListener("click", (e) => {

    if (firstName.value && lastName.value != "") {
        fullName.innerText = firstName.value + " " + lastName.value + " " + "خوش آمدی 🖐";
        localStorage.setItem("fullName", JSON.stringify(firstName.value + " " + lastName.value));
        popUp.classList.add("left-[-2000px]");
        mainApp.classList.toggle("blur-2xl");
    } else if (firstName.value == "") {
        firstName.nextElementSibling.classList.remove("hidden");
    } else if (lastName.value == "") {
        lastName.nextElementSibling.classList.remove("hidden")
    }

})

const clearAllProgram = () => {
    localStorage.setItem("fullName", null);
    localStorage.setItem("tasks", null);
    everyWorkOnLoadingWebpageForTheFirstTime();
    window.location.reload();
}

startTime.addEventListener("focus", () => {
    jalaliDatepicker.startWatch({
        persianDigits: true,
        hasSecond: false,

    });
    jalaliDatepicker.show(startTime);
})
endTime.addEventListener("focus", () => {
    jalaliDatepicker.startWatch({
        persianDigits: true,
        hasSecond: false
    });
    jalaliDatepicker.show(endTime);
})

const addTask = (e) => {
    e.preventDefault();
    if (taskInput != "" && startTime.value != "" && endTime.value != "") {

        const myStartTime = startTime.value;
        const myEndTime = endTime.value;
        const myTaskInput = taskInput.value;
        createTemplateTask(arrayOfTasks.length + 1, myTaskInput, myStartTime, myEndTime);
        let indexOfTasks = (arrayOfTasks.length) + 1
        localStorage.setItem("tasks", JSON.stringify([...arrayOfTasks, { indexOfTasks, myTaskInput, myStartTime, myEndTime }]))
        arrayOfTasks.push({
            indexOfTasks, myTaskInput, myStartTime, myEndTime
        });

        taskInput.value = "";
        startTime.value = "";
        endTime.value = "";
        taskInput.focus();

    } else {
        console.log("no");

    }

}

const createTemplateTask = (index, task, timestart, timeend) => {
    const myElement = document.createElement("div");
    myElement.classList.add("relative", "flex", "justify-center", "gap-1", "py-3");

    myElement.innerHTML = `
          <div
                            class="w-1/12 bg-gray-50 *:text-stone-800 *:text-lg row justify-center items-center rounded-lg">
                            <input type="text" class="rowOfTask w-full h-full  text-center" disabled value="${index}">
                        </div>
                        <input type="text" readonly
                            class="block w-7/12 p-4 ps-10 text-sm   border-0 rounded-lg bg-gray-50 focus:ring-blue-500  dark:bg-stone-100  dark:placeholder-gray-400 dark:text-stone-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value="${task}" required />
                        <div
                            class="w-1/12 bg-gray-50 *:text-stone-600 *:text-sm row justify-center items-center rounded-lg">
                            <input type="text" class="showStartTime w-full h-full  text-center" readonly value="${timestart}">
                        </div>
                        <div
                            class="w-1/12 bg-gray-50 *:text-stone-600 *:text-sm row justify-center items-center rounded-lg">
                            <input type="text" class="showEndTime w-full h-full  text-center" readonly value="${timeend}">
                        </div>
                
                        <button
                            class="w-1/12 text-stone-100 text-sm cursor-pointer hover:opacity-80 duration-500 bg-red-800 rounded-lg" onclick="deleteTask(event);">حذف
                            کن</button>
                        <button
                            class="w-1/12 text-stone-100 text-sm cursor-pointer hover:opacity-80 duration-500 bg-stone-900 rounded-lg" onclick="refactorTask(event);">ویرایش
                            کن</button>
       `;
    rootTaskWrapper.append(myElement);
}

const deleteTask = (e) => {
    e.preventDefault();
    let DestinationIndex = e.target.parentElement.children[0].children[0];
    console.log(DestinationIndex);

    DestinationIndex = DestinationIndex.value
    arrayOfTasks = arrayOfTasks.filter(item => item.indexOfTasks != DestinationIndex);

    rootTaskWrapper.innerHTML = "";
    arrayOfTasks && arrayOfTasks.map((item, index) => {
        createTemplateTask(index + 1, item.myTaskInput, item.myStartTime, item.myEndTime);
    })

    localStorage.setItem("tasks", JSON.stringify([...arrayOfTasks]))
    indexOfTasks = arrayOfTasks.length + 1
}
const refactorTask = (e) => {
    accessOfChange = !accessOfChange;

    e.preventDefault();
    let DestinationIndex = e.target.parentElement.children[0].children[0];
    let taskInput = e.target.parentElement.children[1];
    let showStarttime = e.target.parentElement.children[2].children[0]
    let showEndTime = e.target.parentElement.children[3].children[0];
    let buttonOfRefact = e.target.parentElement.children[5];


    if (accessOfChange === true) {
        taskInput.readOnly = false;


        showStarttime.readOnly = false;
        showEndTime.readOnly = false;
        taskInput.focus();
        buttonOfRefact.innerText = "در حال ویرایش";
        buttonOfRefact.classList.replace("bg-stone-900", "bg-amber-500");
    } else {
        taskInput.readOnly = true;
        showStarttime.readOnly = true;
        showEndTime.readOnly = true;
        buttonOfRefact.innerText = "اصلاح شد";
        buttonOfRefact.classList.replace("bg-amber-500", "bg-green-500");
        setTimeout(() => {
            buttonOfRefact.classList.replace("bg-green-500", "bg-stone-900");
            buttonOfRefact.innerText = "ویرایش کن"
        }, 1000);
        arrayOfTasks[DestinationIndex.value - 1].myTaskInput = taskInput.value;
        arrayOfTasks[DestinationIndex.value - 1].myStartTime = showStarttime.value;
        arrayOfTasks[DestinationIndex.value - 1].myEndTime = showEndTime.value;
        localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
    }







}