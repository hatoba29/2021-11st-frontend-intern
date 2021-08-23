import Header from "./Header"
import Home from "./pages/Home"
import Alarm from "./pages/Alarm"
import Memo from "./pages/Memo"
import Photo from "./pages/Photo"
import "css/main.scss"

const init = () => {
  // set path to home when path is empty
  if (location.pathname == "/") {
    history.pushState(null, null, "home")
  }

  // initialize header and render page
  header.init()
  route()

  // start alarm clock ticking
  clock.postMessage({
    msg: "update",
    data: JSON.parse(localStorage.getItem("alarms")),
  })
  clock.postMessage({ msg: "start" })
}

export const route = () => {
  const p = location.pathname.split("/")[1]
  const content = document.querySelector("#App")

  // render content and update header
  content.textContent = ""
  content.appendChild(pages[p].render())
  header.update(p)
}

// initialize alarm clock, header and pages
export const clock = new Worker("./worker.js")
const header = new Header()
const pages = {
  home: new Home(),
  alarm: new Alarm(),
  memo: new Memo(),
  photo: new Photo(),
}

// attach router
window.addEventListener("load", init)
window.addEventListener("popstate", route)
