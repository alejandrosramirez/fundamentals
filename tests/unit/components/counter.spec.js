import { shallowMount, mount } from "@vue/test-utils";
import Counter from "@/components/Counter";

describe("Counter.vue", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(Counter);
	});

	test("Debe hacer match con el snapshot", () => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	test("h2 debe tener el valor 'Counter' por defecto", () => {
		const h2 = wrapper.find("h2");
		expect(h2.exists()).toBeTruthy();
		expect(h2.text()).toBe("Counter");
	});

	test("p debe de tener el valor '100' por defecto", () => {
		// const pTags = wrapper.findAll("p");
		// expect(pTags[1].text()).toBe("100");

		const pTag = wrapper.find("[data-testid='counter']");
		expect(pTag.text()).toBe("100");
	});

	test("Debe de incrementar y decrementar el contador", async () => {
		const [increaseBtn, , decreaseBtn] = wrapper.findAll("button");

		await increaseBtn.trigger("click");
		await increaseBtn.trigger("click");
		await increaseBtn.trigger("click");
		await decreaseBtn.trigger("click");
		await decreaseBtn.trigger("click");

		const prevValue = wrapper.find("[data-testid='counter']").text();
		expect(prevValue).toBe("101");
	});

	test("Debe de establecer el valor por defecto", () => {
		const { start } = wrapper.props();

		const value = wrapper.find("[data-testid='counter']").text();
		expect(Number(value)).toBe(start);
	});

	test("Debe de mostrar la prop title", () => {
		const title = "Hola inmundo";

		const wrapper = shallowMount(Counter, {
			props: {
				title,
			},
		});
		expect(wrapper.find("h2").text()).toBe(title);
	});
});
