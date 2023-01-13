import { Foo } from "../../models/foo_model";
export class FooController {
  static createFoo(name: string): Foo {
    const foo = new Foo(name);
    return foo;
  }

  static getFoo(id: string): Foo {
    return new Foo("foo");
  }

  static updateFoo(id: string, name: string): Foo {
    const foo = new Foo(name);
    return foo;
  }
}
