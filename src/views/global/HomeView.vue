<template>
  <div class="container">
    <HeaderHomeComp />
    <HeroHomeComp />
    <FeaturesHomeComp />
    <HowItWorksSectionComp />
    <UserTypesSectionComp />
    <TeamSectionComp />
    <CTASectionComp />
    <FooterMain />
  </div>
</template>

<script setup>
import FooterMain from '@/components/global/Footer/FooterMain.vue'
import { 
  HeaderHomeComp, 
  HeroHomeComp, 
  FeaturesHomeComp,
  HowItWorksSectionComp,
  UserTypesSectionComp,
  TeamSectionComp,
  CTASectionComp
} from '@/components'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.container {
  --primary: #022840;
  --primary-dark: #011a2b;
  --secondary: #0d4f6b;
  --accent: #1a73e8;
  --white: #ffffff;
  --bg-light: #f8fafc;
  --text: #334155;
  --text-light: #64748b;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --radius: 8px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  color: var(--text);
  line-height: 1.6;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>