import images from "../img"
import "css/photo.scss"

class Photo {
  render() {
    // list
    const list = document.createElement("div")
    list.id = "photo-list"
    for (let i = 0; i < images.length; i++) {
      const img = document.createElement("img")
      img.id = `img-${i}`
      img.src = images[i]
      img.addEventListener("click", () => this.view(i))
      list.appendChild(img)
    }

    // viewer
    const viewer = document.createElement("div")
    viewer.id = "photo-viewer"

    // append elements into container
    const container = document.createElement("article")
    container.id = "photo"
    container.append(list, viewer)

    return container
  }

  view(i: number) {
    const list = document.querySelector("#photo-list")

    // mark as active
    for (let img of Array.from(list.children)) {
      if (img.id == `img-${i}`) {
        img.classList.add("active")
      } else if (img.classList.contains("active")) {
        img.classList.remove("active")
      }
    }

    // show image in viewer
    const viewer = document.querySelector("#photo-viewer") as HTMLDivElement
    viewer.style.backgroundImage = `url(${images[i]})`
  }
}

export default Photo
