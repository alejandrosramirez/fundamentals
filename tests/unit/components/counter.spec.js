import { shallowMount, mount } from "@vue/test-utils";
import Counter from "@/components/Counter";

describe("Counter.vue", () => {
	test("Debe hacer match con el snapshot", () => {
		const wrapper = shallowMount(Counter);

		expect(wrapper.html()).toMatchSnapshot();
	});

	test("h2 debe tener el valor 'Counter' por defecto", () => {
		const wrapper = shallowMount(Counter);

		const h2 = wrapper.find("h2");
		expect(h2.exists()).toBeTruthy();
		expect(h2.text()).toBe("Counter");
	});

	test("p debe de tener el valor '100' por defecto", () => {
		const wrapper = shallowMount(Counter);

		// const pTags = wrapper.findAll("p");
		// expect(pTags[1].text()).toBe("100");

		const pTag = wrapper.find("[data-testid='counter']");
		expect(pTag.text()).toBe("100");
	});

	test("Debe de incrementar y decrementar el contador", async () => {
		const wrapper = shallowMount(Counter);

		const increaseBtn = wrapper.find("button");
		await increaseBtn.trigger("click");
		let prevValue = wrapper.find("[data-testid='counter']").text();
		expect(prevValue).toBe("101");

		const decreaseBtn = wrapper.findAll("button")[2];
		await decreaseBtn.trigger("click");
		await decreaseBtn.trigger("click");
		prevValue = wrapper.find("[data-testid='counter']").text();
		expect(prevValue).toBe("99");
	});
});
