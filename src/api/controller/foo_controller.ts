
export class FooController {
	constructor() {
		// ...
	}

	createFoo(name: string): Foo {
		const foo = new Foo(name)
		return foo
	}

	getFoo(id: string): Foo {
		// ...
	}
}