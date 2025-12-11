<script setup lang="ts">
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

const props = defineProps({
	name: { type: String, required: true }
})
</script>

<template>
	<div v-if="name === 'Alert'" class="preview__column">
		<!-- alert -->
		<BasicAlert message="New software update is available." type="info" />
		<BasicAlert message="Your purchase has been confirmed!" type="success" />
		<BasicAlert message="Warning: invalid email address!" type="warning" />
		<BasicAlert message="Error! Task failed." type="error" />
	</div>

	<div v-else-if="name === 'Badge'" class="preview__inline">
		<!-- badge -->
		<BasicBadge label="Twitter" type="twitter" :count="5" />
		<BasicBadge label="Facebook" type="facebook" :count="10" />
		<BasicBadge label="Instagram" type="instagram" :count="15" />
		<BasicBadge label="Snapchat" type="snapchat" :count="20" />
	</div>

	<div v-else-if="name === 'Button'" class="preview__inline">
		<!-- button -->
		<BasicButton label="Submit" variant="submit" />
		<BasicButton label="Reset" variant="reset" />
	</div>

	<div v-else-if="name === 'Input'" class="preview_column">
		<!-- input -->
		<BasicInput label="Date Input" variant="date" />
		<BasicInput label="Time Input" variant="time" />
		<BasicInput label="Range Slider" variant="range" />
	</div>

	<div v-else-if="name === 'Card'" class="preview__inline">
		<!-- card -->
		<BasicCard name="John Doe" job="Front-end Developer" img="src/assets/images/img_avatar_john.png" />
		<BasicCard name="Jane Doe" job="Back-end Developer" img="src/assets/images/img_avatar_jane.png" />
	</div>

	<div v-else-if="name === 'Modal'" class="preview__inline">
		<!-- Modal -->
		<MediumModal trigger-text="Open Modal">
			<h2>Modal</h2>
			<p>Dit is een klein modal-venster. Klik buiten het venster of op de knop hieronder om het venster te sluiten.</p>
		</MediumModal>
	</div>

	<div v-else-if="name === 'Dropdown'" class="preview__inline">
		<!-- Dropdown -->
		<MediumDropdown :options="['Menu item 1', 'Menu item 2', 'Menu item 3']" label="Dropdown" />
	</div>

	<div v-else-if="name === 'Tabs'" class="preview__inline">
		<!-- Tabs -->
		<MediumTabs>
			<template #Info> Info component hier </template>
			<template #Profile> Profile inhoud </template>
			<template #Settings> Settings inhoud </template>
		</MediumTabs>
	</div>

	<div v-else-if="name === 'Accordion'" class="preview__inline">
		<!-- Accordion -->
		<MediumAccordion 
			:items="[
				{
					title: 'Eerste item',
					content: 'Dit is de inhoud van het eerste accordion-item.',
					open: false
				},
				{
					title: 'Tweede item',
					content: 'Dit is de inhoud van het tweede accordion-item.',
					open: false
				},
				{
					title: 'Derde item',
					content: 'Dit is de inhoud van het derde accordion-item.',
					open: false
				}
			]"
		/>
	</div>

	<div v-else-if="name === 'Tooltip'" class="preview__inline">
		<!-- Tooltip -->
		<MediumTooltip label="Hover mij" tooltip="Dit is een tooltip pop-up" />
	</div>

	<div v-else-if="name === 'Toast'" class="preview__column">
		<!-- Toast -->
		<MediumToast message="Opgeslagen!" type="success" :timeout="5000"/>
		<MediumToast message="Er ging iets mis!" type="error" :timeout="4000"/>
		<MediumToast message="Let op..." type="warning" :timeout="3000"/>
		<MediumToast message="Info bericht." :timeout="2000"/>
	</div>

	<div v-else-if="name === 'Stepper'" class="preview__inline">
		<!-- Stepper -->
		<MediumStepper :steps="4" :current="2" :labels="['Account', 'Adres', 'Betaling', 'Bevestig']" />
	</div>

	<div v-else-if="name === 'Graph'" class="preview__column">
		<!-- Graph -->
		<ComplexGraph :values="[10, 40, 25, 60, 30, 80]" :labels="['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun']" :width="450" :height="150" />
	</div>

	<div v-else-if="name === 'Table'" class="preview__column">
		<!-- Table -->
		<ComplexTable
			:headers="['Naam', 'Leeftijd', 'M/V']"
			:rows="[
				['Joel', 34, 'M'],
				['Laura', 30, 'V'],
				['Henk', 37, 'M']
			]"
			striped
			compact
		/>
	</div>

	<div v-else-if="name === 'Form'" class="preview__column">
		<!-- Form -->
		<ComplexForm 
			:fields="[
				{ label: 'Voornaam', placeholder: 'John', width: '142px' },
				{ label: 'Achternaam', placeholder: 'Doe', width: '142px' },
				{ label: 'Adres + Huisnummer', placeholder: 'Teststraat 123', width: '300px' },
				{ label: 'Leeftijd', placeholder: '18+', width: '100px', type: 'number' },
				{ label: 'E-mail', placeholder: 'name@email.nl', width: '180px' }
			]"
			submitLabel="Versturen"
			@submit="() => console.log('Submitted!')"
		/>
	</div>

	<div class="fallback" v-else>
		<!-- fallback -->
		<p>Preview ontbreekt voor {{ name }}</p>
	</div>


</template>

<style lang="scss">
.fallback {
	font-size: 1.1rem;
	text-align: center;
	font-family: var(--font-main);
	color: white;
}

.preview__inline {
	width: 100%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
}

.preview__column {
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
}
</style>