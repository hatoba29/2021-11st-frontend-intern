import { clock } from "../App"
import "css/alarm.scss"

class Alarm {
  alarms: string[][] = []

  constructor() {
    // load previous alarm
    if (localStorage.getItem("alarms")) {
      this.alarms = JSON.parse(localStorage.getItem("alarms"))
    }

    // alert user and delete alarm item when time is over
    clock.onmessage = (e) => {
      this.delete(e.data)
      alert(`${e.data[0]}시 ${e.data[1]}분`)
    }
  }

  render() {
    // alarm list
    const alarmList = document.createElement("div")
    alarmList.id = "alarm-list"
    for (let a of this.alarms) {
      this.add(a, alarmList)
    }

    // append elements into container
    const container = document.createElement("article")
    container.id = "alarm"
    container.append(this.renderNewAlarm(), alarmList)

    return container
  }

  add(item: string[], list?: HTMLDivElement) {
    // if this update is not initialization
    if (list === undefined) {
      list = document.querySelector("#alarm-list")
      // update newly added item to local storage and alarm clock
      this.alarms.push(item)
      localStorage.setItem("alarms", JSON.stringify(this.alarms))
      clock.postMessage({ msg: "update", data: this.alarms })
    }

    // parse item
    const [h, m] = item
    const numH = Number(h)
    const str12H = String(numH > 12 ? numH - 12 : numH).padStart(2, "0")
    const ampm = ~~(numH - 1) / 12 === 0 ? "오전" : "오후"

    // make new item
    const newItem = document.createElement("div")
    newItem.id = h + m
    newItem.classList.add("alarm-item")

    // delete button
    const deleteBtn = document.createElement("button")
    deleteBtn.type = "button"
    deleteBtn.textContent = "삭제"
    deleteBtn.addEventListener("click", () => this.delete(item))

    // append elements into new item
    newItem.append(`${ampm} ${str12H}시 ${m}분`, deleteBtn)

    // append new item to alarm list
    list.appendChild(newItem)
  }

  delete(item: string[]) {
    // delete expired alarm and update alarm clock
    this.alarms.splice(this.alarms.indexOf(item), 1)
    localStorage.setItem("alarms", JSON.stringify(this.alarms))
    clock.postMessage({ msg: "update", data: this.alarms })

    // delete alarm item when in alarm page
    if (location.pathname == "/alarm") {
      document
        .querySelector("#alarm-list")
        .removeChild(document.getElementById(item.join("")))
    }
  }

  renderNewAlarm() {
    // am/pm selector
    const ampm = document.createElement("select")
    ampm.id = "ampm"
    const am = document.createElement("option")
    const pm = document.createElement("option")
    ;[am.value, pm.value] = ["am", "pm"]
    ;[am.textContent, pm.textContent] = ["오전", "오후"]
    ampm.append(am, pm)

    // hour selector
    const h = document.createElement("select")
    h.id = "hour"
    for (let n = 1; n <= 12; n++) {
      const option = document.createElement("option")
      option.value = n.toString().padStart(2, "0")
      option.textContent = n.toString().padStart(2, "0")
      h.appendChild(option)
    }

    // minute selector
    const m = document.createElement("select")
    m.id = "minute"
    for (let n = 0; n < 60; n += 10) {
      const option = document.createElement("option")
      option.value = n.toString().padStart(2, "0")
      option.textContent = n.toString().padStart(2, "0")
      m.appendChild(option)
    }

    // save button
    const saveBtn = document.createElement("button")
    saveBtn.type = "button"
    saveBtn.id = "save"
    saveBtn.textContent = "저장"
    saveBtn.addEventListener("click", () => {
      // hide new alarm section
      container.style.display = "none"

      // append to alarm list and update
      const num12H = String((12 + Number(h.value)) % 24).padStart(2, "0")
      const item = [ampm.value == "pm" ? num12H : h.value, m.value]
      this.add(item)
    })

    // append elements into container
    const container = document.createElement("div")
    container.id = "new-alarm"
    container.style.display = "none"
    container.append(ampm, " ", h, "시 ", m, "분", saveBtn)

    return container
  }
}

export default Alarm
