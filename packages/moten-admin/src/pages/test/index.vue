<template>
  <div class="page">
    <div class="dropzone">
      <div id="draggable" draggable="true">This div is draggable</div>
    </div>
    <div
      class="dropzone"
      id="droptarget"
      @dragenter="dragenter"
      @dragleave="dragend"
      @dragover.prevent
      @drop.prevent="drop"
    ></div>
  </div>
</template>

<script setup>
const dragenter = (event) => {
  if (event.target.classList.contains('dropzone')) {
    event.target.classList.add('dragover')
  }
}
const dragend = (event) => {
  if (event.target.classList.contains('dropzone')) {
    event.target.classList.remove('dragover')
  }
}
const drop = (event) => {
  const { offsetX, offsetY } = event
  console.warn(event, offsetX, offsetY)
}
</script>

<style lang="scss" scoped>
.page {
  padding-left: 100px;
  padding-top: 100px;
}
#draggable {
  text-align: center;
  background: white;
}

.dropzone {
  width: 200px;
  height: 200px;
  background: blueviolet;
  margin: 10px;
  padding: 10px;
}

.dropzone.dragover {
  background-color: purple;
}
</style>
