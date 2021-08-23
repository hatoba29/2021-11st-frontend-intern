import { route } from "../App"
import "css/home.scss"

class Home {
  order: string[] = ["alarm", "memo", "photo"]

  constructor() {
    // load buttons order
    if (localStorage.getItem("order")) {
      this.order = JSON.parse(localStorage.getItem("order"))
    }
  }

  render() {
    // app buttons
    const buttons = {
      alarm: document.createElement("button"),
      memo: document.createElement("button"),
      photo: document.createElement("button"),
    }
    buttons.alarm.textContent = "알람"
    buttons.memo.textContent = "메모"
    buttons.photo.textContent = "사진"
    for (let key of Object.keys(buttons)) {
      buttons[key].id = key
      buttons[key].type = "button"
      buttons[key].draggable = true
      buttons[key].addEventListener("click", () => {
        history.pushState(null, null, key)
        route()
      })
    }

    // make container and add drag&drop
    const container = document.createElement("article")
    container.id = "home"
    this.enableDnD(container)

    // append buttons into container base on order
    this.update(container, buttons)

    return container
  }

  update(container?: HTMLElement, buttons?: object) {
    // if this update is not initialization
    if (container === undefined) {
      container = document.querySelector("#home")
      buttons = {
        alarm: document.querySelector("#alarm"),
        memo: document.querySelector("#memo"),
        photo: document.querySelector("#photo"),
      }

      // remove existing buttons
      container.textContent = ""
    }

    // update local storage
    localStorage.setItem("order", JSON.stringify(this.order))

    // append buttons according to order
    for (let e of this.order) {
      container.appendChild(buttons[e])
    }
  }

  enableDnD(container: HTMLElement) {
    let btnPos = {}
    let dragging = false
    let dragged = ""

    // start dragging
    container.addEventListener("dragstart", (e) => {
      const target = e.target as HTMLButtonElement
      target.style.opacity = "0.5"

      // record current dragged button
      btnPos = this.getPos()
      dragged = target.id
      dragging = true
    })

    // while dragging
    document.addEventListener("dragover", (e) => {
      if (!dragging) return false

      for (let id of Object.keys(btnPos)) {
        // skip when cursor is above dragged button
        if (dragged === id) continue

        // swap buttons when cursor is above another button
        const [l, r] = btnPos[id]
        if (l <= e.x && e.x <= r) {
          const drag = this.order.indexOf(dragged)
          const drop = this.order.indexOf(id)
          ;[this.order[drag], this.order[drop]] = [
            this.order[drop],
            this.order[drag],
          ]
          ;[btnPos[dragged], btnPos[id]] = [btnPos[id], btnPos[dragged]]

          // re-render buttons based on changed order
          this.update()
        }
      }
    })

    // end dragging
    container.addEventListener("dragend", (e) => {
      const target = e.target as HTMLButtonElement
      target.style.opacity = ""
      dragging = false
      dragged = ""
    })
  }

  // get buttons' left, right coordinate
  getPos(): object {
    let btnPos = {}
    const buttons = document.querySelectorAll("#home button")

    for (let b of Array.from(buttons)) {
      const rect = b.getClientRects()[0]
      btnPos[b.id] = [rect.left, rect.right]
    }

    return btnPos
  }
}

export default Home
