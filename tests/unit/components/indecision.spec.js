import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision";

describe("Indecision.vue", () => {
	let wrapper;
	let clgSpy;

	global.fetch = jest.fn(() => Promise.resolve({
		json: () => Promise.resolve({
			answer: "yes",
			forced: false,
			image: "https://yesno.wtf/assets/yes/2.gif"
		})
	}));

	beforeEach(() => {
		wrapper = shallowMount(Indecision);
		clgSpy = jest.spyOn(console, "log");

		jest.clearAllMocks();
	});

	test("Debe hacer match con el snapshot", () => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	test("Debe escribir en el input y no debe de disparar nada (console.log)", async () => {
		const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
		const input = wrapper.find("input");

		await input.setValue("Hola inmundo");
		expect(clgSpy).toHaveBeenCalledTimes(1);
		expect(getAnswerSpy).not.toHaveBeenCalled();
	});

	test("Debe escribir '?' y debe de disparar un evento (fetch)", async () => {
		const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
		const input = wrapper.find("input");

		await input.setValue("Hola inmundo?");
		expect(clgSpy).toHaveBeenCalledTimes(1);
		expect(getAnswerSpy).toHaveBeenCalled();
	});

	test("Debe hacer un test al metodo getAnswer", async () => {
		await wrapper.vm.getAnswer();

		const img = wrapper.find("img");
		expect(img.exists()).toBeTruthy();
		expect(wrapper.vm.image).toBe("https://yesno.wtf/assets/yes/2.gif");
		expect(wrapper.vm.answer).toBe("Si");
	});

	test("Debe hacer un test al metodo getAnswer - Fallo en el API", async () => {
		fetch.mockImplementationOnce(() => Promise.reject("API is down"));
		await wrapper.vm.getAnswer();

		const img = wrapper.find("img");

		expect(img.exists()).toBeFalsy();
		expect(wrapper.vm.answer).toBe("Fallo del API");
	});
});
