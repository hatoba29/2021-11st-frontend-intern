import { route } from "./App"
import "css/header.scss"

class Header {
  constructor() {}

  init() {
    // update clock every seconds
    const tick = () => {
      const now = new Date()
      const timeStr = {
        h: now.getHours().toString().padStart(2, "0"),
        m: now.getMinutes().toString().padStart(2, "0"),
        s: now.getSeconds().toString().padStart(2, "0"),
      }

      const date = `${now.getFullYear()}년 ${now.getMonth()}월 ${now.getDate()}일 `
      const time = `${timeStr.h}시 ${timeStr.m}분 ${timeStr.s}초`
      clock.textContent = date + time
    }

    // clock
    const clock = document.createElement("div")
    clock.id = "clock"
    tick()
    setInterval(tick, 1000) // start clock ticking

    // back button
    const backBtn = document.createElement("button")
    backBtn.id = "back"
    backBtn.textContent = "BACK"
    backBtn.addEventListener("click", () => {
      history.pushState(null, null, "home")
      route()
    })

    // new button
    const newBtn = document.createElement("button")
    newBtn.id = "new"
    newBtn.textContent = "NEW"

    // append elements into header
    const header = document.querySelector("header")
    header.append(backBtn, clock, newBtn)
  }

  update(page: string) {
    const backBtn = document.querySelector("#back") as HTMLButtonElement
    const newBtn = document.querySelector("#new") as HTMLButtonElement

    // set buttons visibility
    if (page == "home") {
      backBtn.style.visibility = "hidden"
      newBtn.style.visibility = "hidden"
    } else if (page == "photo") {
      backBtn.style.visibility = ""
      newBtn.style.visibility = "hidden"
    } else {
      backBtn.style.visibility = ""
      newBtn.style.visibility = ""
    }

    // clear previous event listener
    const altered = newBtn.cloneNode(true)
    newBtn.replaceWith(altered)

    // set new button function
    if (page == "memo") {
      altered.addEventListener("click", () => {
        const target = document.querySelector("#memo-input") as HTMLDivElement
        target.style.display = ""
      })
    } else if (page == "alarm") {
      altered.addEventListener("click", () => {
        const target = document.querySelector("#new-alarm") as HTMLDivElement
        target.style.display = ""
      })
    }
  }
}

export default Header
