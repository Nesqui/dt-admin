<template>
  <div class="home">
    <b-tabs content-class="mt-3" fill>
      <b-tab title="Лиды" active>
        <Lids />
      </b-tab>
      <b-tab title="Рубрики">
        <Rubrics />
      </b-tab>
      <b-tab title="Посты">
        <Posts />
      </b-tab>
      <b-tab title="Disabled" disabled>
        <p>I'm a disabled tab!</p>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import Lids from "@/components/Lids.vue";
import Rubrics from "@/views/Rubrics.vue";
import Posts from "@/views/Posts.vue";

export default {
  name: "home",
  components: {
    Lids,
    Rubrics,
    Posts
  }
};
</script>
