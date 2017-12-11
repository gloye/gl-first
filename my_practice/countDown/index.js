// 面向过程
function countDownSeconds(seconds) {
    let num = seconds ? seconds : null
    if (!num) return
    setTimeout(() => {
        num--
        console.log(num)
        if (num > 0) {
            countDownSeconds(num)
        } else {
            console.log("Time end！")
        }
    }, 1000)
}

function counntDownDate(date) {
    const dateTime = new Date(date).getTime();

}

function countDownMinutes(minutes) {

}

function countDownHours(hours) {

}

function counntDownDate(date) {

}