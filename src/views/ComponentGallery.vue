<script setup lang="ts">
import ComponentPreview from "@/components/ComponentPreview.vue";
import { ref, computed } from "vue"

// 5 basic
import BasicAlert from "../components/Basic/BasicAlert.vue";
import BasicBadge from "../components/Basic/BasicBadge.vue";
import BasicButton from "../components/Basic/BasicButton.vue";
import BasicInput from "../components/Basic/BasicInput.vue";
import BasicCard from "../components/Basic/BasicCard.vue";

// 7 medium
import MediumModal from "../components/Medium/MediumModal.vue";
import MediumDropdown from "../components/Medium/MediumDropdown.vue";
import MediumTabs from "../components/Medium/MediumTabs.vue";
import MediumAccordion from "../components/Medium/MediumAccordion.vue";
import MediumTooltip from "../components/Medium/MediumTooltip.vue";
import MediumToast from "../components/Medium/MediumToast.vue";
import MediumStepper from "../components/Medium/MediumStepper.vue";

// 3 complex
import ComplexTable from "../components/Complex/ComplexTable.vue";
import ComplexForm from "../components/Complex/ComplexForm.vue";
import ComplexGraph from "../components/Complex/ComplexGraph.vue";

const components = [
	// 5 basic
	{ comp: BasicAlert, name: "Alert", category: "Basic" },
	{ comp: BasicBadge, name: "Badge", category: "Basic" },
	{ comp: BasicButton, name: "Button", category: "Basic" },
	{ comp: BasicInput, name: "Input", category: "Basic" },
	{ comp: BasicCard, name: "Card", category: "Basic" },

	// 7 medium
	{ comp: MediumModal, name: "Modal", category: "Medium" },
	{ comp: MediumDropdown, name: "Dropdown", category: "Medium" },
	{ comp: MediumTabs, name: "Tabs", category: "Medium" },
	{ comp: MediumAccordion, name: "Accordion", category: "Medium" },
	{ comp: MediumTooltip, name: "Tooltip", category: "Medium" },
	{ comp: MediumToast, name: "Toast", category: "Medium" },
	{ comp: MediumStepper, name: "Stepper", category: "Medium" },

	// 3 complex
	{ comp: ComplexTable, name: "Table", category: "Complex" },
	{ comp: ComplexForm, name: "Form", category: "Complex" },
	{ comp: ComplexGraph, name: "Graph", category: "Complex" }
];

// Een index aanmaken die bijhoudt welk component geladen is
const activeIndex = ref(0);

// Het component wat we willen laten zien en doorgeven dat deze nooit leeg is
const active = computed(() => components[activeIndex.value]!);

// De functies voor navigatie
function next() {
	activeIndex.value = (activeIndex.value + 1) % components.length;
}
function prev() {
	activeIndex.value =
		(activeIndex.value - 1 + components.length) % components.length;
}
</script>

<template>
	<main class="page">
		<header class="page__header">
			<div class="page__title">
				<img class="page__title--logo" src="../assets/images/vue-logo.png" />
				<h1 class="page__title--text">Component Library</h1>
			</div>
		</header>
		<div class="gallery fade-in" :key="active.name">
			<article class="gallery__component" :key="active.name">
				<ComponentPreview :name="active.name" />
			</article>
		</div>
		<div class="gallery__subtitle fade-in">
			<div class="gallery__subtitle--titlecomponent fade-in-aftertime">{{ active.category }} Component</div>
			<div class="gallery__subtitle--textcomponent fade-in-aftertime">{{ active.name }}</div>
		</div>
		<div class="nav">
			<button class="nav__btn nav__btn--left slide-in-left" @click="prev">⬅</button>
			<button class="nav__btn nav__btn--right slide-in-right" @click="next">➡</button>
		</div>
	</main>
</template>

<style lang="scss">
.page {
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	&__header {
		flex-shrink: 0;
		width: 100%;
		background: #252C36;
		background: linear-gradient(160deg, rgb(53, 53, 53) 0%, rgb(77, 77, 77) 100%);
		border-bottom: 1px solid rgb(45, 45, 45);
		box-shadow: rgba(0, 0, 0, 0) 0px 5px 15px,
			rgb(44, 44, 44) 0px 2px 30px,
			rgba(0, 0, 0, 0.9) 0px 5px 20px -3px,
			rgba(0, 0, 0, 0.35) 0px -3px 0px inset;
	}

	&__title {
		padding: 10px 0px 10px 15px;
		display: flex;

		&--logo {
			width: 65px;
			height: 65px;
		}

		&--text {
			margin: 0;
			padding: 15px 0px 10px 5px;
		}
	}
}

.gallery {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 25px 0px 20px 0px;

	&__component {
		padding: 15px 20px 15px 20px;
		margin: 10px;
		min-width: 300px;
		min-height: 60px;
		border-radius: var(--radius);
		background: linear-gradient(160deg, rgb(51 51 51) 0%, rgb(60 60 60) 30%, rgb(68 68 68) 66%, rgb(85 85 85) 100%);
		border: 1px solid rgba(61, 65, 71, 0.44);
		box-shadow:
			rgba(0, 0, 0, 0) 0px 5px 15px,
			rgb(44, 44, 44) 0px 2px 4px,
			rgba(0, 0, 0, 0.5) 0px 7px 13px -3px,
			rgba(0, 0, 0, 0.25) 0px -3px 0px inset;
	}

	&__subtitle {
		font-size: 1.3rem;
		text-align: center;
		margin-bottom: 20px;
		font-family: var(--font-main);
		color: white;

		&--titlecomponent {
			font-size: var(--h2);
			color: #45c88e;
			font-weight: 500;
			margin-bottom: 5px;
			text-shadow: 0px 3px 8px rgba(0, 0, 0, 0.75);
		}

		&--textcomponent {
			font-size: var(--body);
			text-shadow: 0px 3px 8px rgba(0, 0, 0, 0.75);
		}
	}
}

.nav {
	flex-shrink: 0;
	display: flex;
	justify-content: center;
	gap: 5vw;
	margin-bottom: 25px;

	&__btn {
		cursor: pointer;
		background: #242424;
		color: var(--color-primary);
		font-size: 2.3rem;
		padding: 12px 20px;
		border: none;
		border-radius: 12px;
		box-shadow:
			rgba(0, 0, 0, 0.4) 0px 2px 4px,
			rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
			rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
		transition: 0.6s, color 1.2s;
	}

	&__btn:hover {
		transform: scale(1.08);
		background: #303030;
		color: var(--color-secondary);
	}

	&__btn:active {
		transform: translateY(3px);
		background: #242424;
		box-shadow:
			rgba(0, 0, 0, 0.5) 0px 1px 2px inset,
			rgba(0, 0, 0, 0.3) 0px -2px 4px inset;
	}
}
</style>