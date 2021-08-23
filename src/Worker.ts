let alarms = []

const tick = () => {
  const now = new Date()
  const hhmm =
    now.getHours().toString().padStart(2, "0") +
    now.getMinutes().toString().padStart(2, "0") +
    now.getSeconds().toString().padStart(2, "0")

  // check alarms
  for (let a of alarms) {
    const target = a[0] + a[1] + "00"
    if (target === hhmm) {
      // ring alarm
      postMessage(a)
    }
  }
}

onmessage = (e) => {
  const { msg, data } = e.data
  if (msg === undefined) return

  if (msg == "update") {
    // update alarm list
    alarms = data
  } else if (msg == "start") {
    // start alarm clock ticking
    setInterval(tick, 1000)
  }
}
