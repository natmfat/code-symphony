import { Parser } from "acorn"
import * as Tone from "tone"
import { sounds } from "./sounds.js"

import "./globals.css"
import "./index.css"

const appPlaying = document.getElementById("app__playing")
const appInput = document.getElementById("app__input")
const appButton = document.getElementById("app__button")

async function readFile(pathname) {
  pathname = pathname || appInput.value || "script.js"
  
  const handle = await replit.fs.readFile(pathname)

  if(typeof handle == "undefined") {
    // readFile didn't return anything, probably not installed as an extension
    // try fetching from path instead
    return fetch(pathname)
      .then(res => res.text())
      .catch(() => "")
  } else if(handle.error) {
    // couldn't read file for some reason
    // just fail silently (for now)
    return ""
  }

  return handle.content
}

function traverse(node, cb, level = 0) {
  if(!node) {
    return
  }

  const newLevel = level + 1

  if(Array.isArray(node)) {
    for(const child of node) {
      traverse(child, cb, newLevel)
    }
  } else if (typeof node === "object") {
    for(const child of Object.values(node)) {
      traverse(child, cb, newLevel)
    }
  } 
  
  cb(node, level)
}

async function main() {
  const content = await readFile()
  const ast = Parser.parse(content, {
    sourceType: "module"
  })

  const now = Tone.now()
  let i = 0
  traverse(ast, (node, level) => {
    if(!(node && node.type in sounds)) {
      return
    }

    sounds[node.type](level, i + now)

    setTimeout(() => {
      if(node.type) {
        appPlaying.textContent = node.type
      }
    }, i * 1000)

    i += 0.15
  })
}


// wait for click to start
appButton.addEventListener("click", async () => {
  await Tone.start()
  main()
})
