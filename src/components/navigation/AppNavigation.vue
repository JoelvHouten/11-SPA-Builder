<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>

<template>
  <nav class="app-nav">
    <div class="app-nav__left">
      <RouterLink to="/" class="app-nav__logo">
        Brain<span>Blocks</span>
      </RouterLink>
    </div>

    <div class="app-nav__links">
      <RouterLink to="/" class="app-nav__link" active-class="active">
        Home
      </RouterLink>

      <RouterLink to="/components" class="app-nav__link" active-class="active">
        Componenten
      </RouterLink>
      <RouterLink to="/lessons" class="app-nav__link" active-class="active">
        Lessen
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: linear-gradient(160deg, #353535 0%, #4d4d4d 100%);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.app-nav__logo {
  font-size: 1.4rem;
  font-weight: 700;
  color: #ee4d4e;
  text-decoration: none;

  span {
    color: #ffc502;
  }
}

.app-nav__links {
  display: flex;
  gap: 20px;
}

.app-nav__link {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.05rem;
  position: relative;
  padding-bottom: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: #ffc502;
  }
}

.active {
  color: #ffc502;
  font-weight: 600;
}

.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #ffc502;
  border-radius: 2px;
}
</style>