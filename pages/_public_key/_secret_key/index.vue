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
      <div class="text-lg">
        <p class="font-bold">Read and destroy?</p>
        <p>
          You're about to read and destroy the note with id {{ public_key }}.
        </p>
      </div>
      <div class="flex flex-wrap mt-3">
        <a
          class="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded
            mr-3
            cursor-pointer
          "
          :href="read_url"
        >
          Show me the note
        </a>

        <button
          class="
            bg-gray-500
            hover:bg-gray-700
            text-white
            font-bold
            py-2
            px-4
            rounded
          "
        >
          Not right now
        </button>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      public_key: this.$route.params.public_key,
      secret_key: this.$route.params.secret_key,
      read_url: `${process.env.BASE_URL || 'http://localhost:3000'}/${
        this.$route.params.public_key
      }/${this.$route.params.secret_key}`,
    }
  },
}
</script>