<template>
	<h2>{{ title }}</h2>

	<p>{{ counter }} <sup>2</sup> = {{ square }}</p>

	<div>
		<button @click="increase">+1</button>
		<button @click="reset">Reset</button>
		<button @click="decrease">-1</button>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "Counter",
		},
		start: {
			type: Number,
			default: 0,
			validator(value) {
				return value >= 0;
			},
		},
	},
	name: "Counter",
	data() {
		return {
			counter: this.start,
		};
	},
	methods: {
		increase() {
			this.counter++;
		},
		reset() {
			this.counter = this.start;
		},
		decrease() {
			this.counter--;
		},
	},
	computed: {
		square() {
			return this.counter * this.counter;
		},
	},
};
</script>

<style>
button {
	background-color: #64BB87;
	border-radius: 5px;
	border: 1px solid white;
	color: white;
	cursor: pointer;
	margin: 0 5px;
	padding: 5px 15px;
	transition: 0.3s ease-in-out;
}

button:hover {
	background-color: #5AA67B;
	transition: 0.3s ease-in-out;
}
</style>
