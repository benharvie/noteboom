<template>
  <pre class="text-sm">{{ note_content }}</pre>
</template>

<script>
export default {
  data() {
    return {
      public_key: this.$route.params.public_key,
      secret_key: this.$route.params.secret_key,
      note_content: null,
    }
  },
  async mounted() {
    this.note_content = await this.getNote()
  },
  methods: {
    async getNote() {
      return await fetch(`/api/read/${this.public_key}/${this.secret_key}`)
        .then((result) => result.json())
        .then(({ note }) => {
          if (!note) {
            return 'We could not find this note or it has already self-destructed.'
          }
          return note
        })
        .catch((error) => {
          console.error(error)
          return `An error occured: ${error}`
        })
    },
  },
}
</script>
