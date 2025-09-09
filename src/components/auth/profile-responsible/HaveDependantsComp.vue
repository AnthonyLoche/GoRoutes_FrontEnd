<script setup>
import AccountCircle from "vue-material-design-icons/AccountCircle.vue"

const props = defineProps({
  dependents: {
    type: Array,
    required: true
  }
})



</script>

<template>
  <section>
  <RouterLink v-for="dependent in props.dependents" :key="dependent.id" :to="`/blank/responsible/dependent/${dependent.id}`">
    <div class="card">
      <div class="wrapper" :style="`background-image: url(${dependent.picture_file || 'https://th.bing.com/th/id/R.090b69301cb8a4f034f9bf94488069ea?rik=0J%2ba5Ubmt0AOvg&pid=ImgRaw&r=0'})`">
        <div class="content">
          <div class="info">
            <h3>
              <AccountCircle />{{ dependent.name }}
            </h3>
            <p>
              Clique para saber mais.
            </p>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: .5rem;
  margin-top: 20px;
}
span,
h3,
p,
time {
  color: white;
}
h3 {
  display: flex;
  width: 100%;
  align-items: end;
  justify-content: start;
  gap: 0.5rem;
  margin-bottom: 10px;
  font-size: 1.5rem;
}
p {
  height: 70px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin: 0;
}

a {
  width: 32%;
  min-width: 300px;
}
.wrapper {
  height: 20rem;
  position: relative;
  overflow: hidden;
  background-position: center;
  background-size: cover;
}

.wrapper:hover .content .info {
  transform: translateY(0);
}
.content {
  width: 100%;
  height: 60vh;
  background-color: rgba(0, 0, 0, 0.3);
}
.info {
  position: absolute;
  bottom: 0;
  width: 100%;
  transform: translateY(calc(70px + 1em));
  transition: transform 0.3s;
  padding: 1em;
  z-index: 1;
}


.card {
  margin: 0 auto;
}

@media only screen and (max-width: 1300px) {
  .wrapper {
    width: 300px;
  }
  a {
    width: auto;
    margin-bottom: 15px;
  }
  p {
    display: none;
  }
  .info {
    transform: translateY(0);
  }
}
</style>