import "css/memo.scss"

class Memo {
  memos: string[] = []

  constructor() {
    // load previous memo
    if (localStorage.getItem("memos")) {
      this.memos = JSON.parse(localStorage.getItem("memos"))
    }
  }

  render() {
    // new memo input
    const input = document.createElement("input")
    input.id = "memo-input"
    input.placeholder = "메모를 입력하세요"
    input.style.display = "none"
    input.addEventListener("keypress", (e) => {
      // add to list when enter pressed
      if (e.key == "Enter") {
        input.style.display = "none"
        this.add(input.value)
        input.value = ""
      }
    })

    // list
    const list = document.createElement("div")
    list.id = "memo-list"
    for (let m of this.memos) {
      this.add(m, list)
    }

    // append elements into container
    const container = document.createElement("article")
    container.id = "memo"
    container.append(input, list)

    return container
  }

  add(text: string, list?: HTMLDivElement) {
    // when this update is not initialization
    if (list === undefined) {
      // add to local storage
      list = document.querySelector("#memo-list")
      this.memos.push(text)
      localStorage.setItem("memos", JSON.stringify(this.memos))
    }

    // make memo item
    const item = document.createElement("div")
    item.classList.add("list-item")
    item.textContent = text
    item.addEventListener("click", () => {
      // active selected item and deactivate others
      for (let i of Array.from(list.children)) {
        if (i == item) {
          i.classList.toggle("active")
        } else {
          i.classList.remove("active")
        }
      }
    })

    // append to list
    list.appendChild(item)
  }
}

export default Memo
