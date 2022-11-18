<template>
  <div
    class="
      relative
      flex
      items-top
      justify-center
      min-h-screen
      bg-gray-100
      sm:items-center sm:pt-0
    "
  >
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <NoteInput
        v-if="stage === 'start'"
        @note-created="
          (result) => {
            note = result
            stage = 'created'
          }
        "
      ></NoteInput>
      <NoteCreated v-if="stage === 'created'" :note="note"></NoteCreated>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      stage: 'start',
      note: null,
    }
  },
  mounted() {
    console.log('process.env.BASE_URL:', process.env.BASE_URL)
  },
}
</script>
