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

function countDownDate() {
    const dist = '2018-01-03'
    const end = new Date(dist).getTime()
    const start = new Date().getTime()
    const res = parseInt((end - start) / 1000)
    return res
}

function format(art) {
    const src = art
    const unit = {
        minute: 60,
        hour: 60 * 60,
        day: 60 * 60 * 24
    }
    const resDay = Math.ceil(src / (unit.day))
    const resHour = Math.ceil(src % (unit.day) / (unit.hour))
    const resMin = Math.ceil(src % (unit.hour) / (unit.minute))
    const resSec = Math.ceil(src % (unit.minute))

    const res = resDay + ':' + resHour + ':' + resMin + ':' + resSec
    console.log(res)

    if (src > 0) {
        setTimeout(
            function () {
                format(src - 1)
            } , 1000
        )
    }
}
format(countDownDate())



function countDownMinutes(minutes) {

}

function countDownHours(hours) {

}

function counntDownDate(date) {

}