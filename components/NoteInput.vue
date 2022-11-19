<template>
  <div>
    <h2 class="text-2xl leading-7 font-semibold">Welcome to noteboom</h2>
    <p class="mt-4 pt-4 text-gray-800 border-t border-dashed mb-3">
      To get started, type a self-destructing message below and hit create.
    </p>
    <textarea
      v-model="note"
      class="w-full h-48 border-2 rounded-md px-1"
    ></textarea>
    <p class="text-sm text-gray-500">
      All notes are
      <a
        href="https://github.com/benharvie/noteboom/blob/main/api/api.js#L13-L20"
        target="_blank"
        class="text-blue-400 hover:border-b"
      >
        256-bit AES encrypted</a
      >.
    </p>
    <button
      class="
        rounded
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        mt-3
        w-28
      "
      @click="createNote()"
    >
      Create
    </button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      note: null,
    }
  },
  methods: {
    async createNote() {
      if (!this.note) return
      await fetch('/api/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: this.note }),
      })
        .then((response) => response.json())
        .then((note) => this.$emit('note-created', note))
    },
  },
}
</script>
