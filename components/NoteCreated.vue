<template>
  <div>
    <div v-if="note.status" class="flex flex-wrap w-full">
      <p class="font-bold w-full">Note link ready</p>
      <input
        ref="url"
        :value="pre_read_url"
        readonly
        class="
          w-full
          bg-gray-100
          border-2 border-gray-300
          rounded-md
          text-md
          p-1
          px-2
        "
        @focus="$event.target.select()"
      />
      <p class="text-sm text-gray-500">
        The note will self-destruct after reading it.
      </p>
      <div class="flex flex-wrap mt-7 w-full mx-auto">
        <button
          class="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded
            mr-3
            w-28
          "
          @click="copy()"
        >
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
        <button
          class="
            bg-red-500
            hover:bg-red-700
            text-white
            font-bold
            py-2
            px-4
            rounded
            w-28
          "
          @click="destroy()"
        >
          Destroy
        </button>
      </div>
    </div>
    <div v-else><p>Failed to create note :(</p></div>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pre_read_url: `${process.env.BASE_URL || 'http://localhost:3000'}/${
        this.note.public_key
      }/${this.note.secret_key}`,
      copied: null,
    }
  },
  methods: {
    copy() {
      this.$refs.url.focus()
      document.execCommand('copy')
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 2500)
    },
    destroy() {
      const { public_key } = this.note
      fetch(`/api/delete/${public_key}`, {
        method: 'DELETE',
      })
        .then((result) => result.json())
        .then((result) => {
          result.status
            ? alert(`Successfully destroyed note ${public_key}`)
            : alert(`Failed to destroy note ${public_key}`)
        })
        .catch((error) => {
          alert(`Failed to destroy note ${public_key}:`, error)
        })
    },
  },
}
</script>