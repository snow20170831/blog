# [常见类型](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

## 原始类型: string, number 和 boolean

- string 表示字符串值，如 "Hello, world"
- number 表示数字，如 42。JavaScript 没有专门的整数运行时值，因此没有与 int 或 float 相对应的值--所有数字都是 number
- boolean 表示 true 和 false 这两个值。

::: tip
字符串（String）、数字（Number）和布尔（Boolean）（以大写字母开头）是合法的类型名称，但它们指的是一些特殊的内置类型，在代码中很少出现。请始终使用 string、number 或 boolean 类型。
:::

## Array

为了指定数组 [1, 2, 3] 的类型可以使用语法 `number[]` 或 `Array<number>`; 此语法适用于任何类型（例如，`string[]` 或 `Array<string>` 是字符串数组，以此类推）。我们将在介绍泛型时进一步了解 `T<U>` 语法。

::: tip
请注意，[number] 是不同的东西；请查看[元组](./objects#元组)部分。
:::

## any

TypeScript 还有一种特殊的类型--`any`，当你不想让某个特定值导致类型检查错误时，就可以使用它。

当一个值是 any 类型时，您可以访问它的任何属性（这些属性反过来也是 any 类型），像函数一样调用它，将它赋值给（或从）任何类型的值，或几乎任何其他语法上合法的值：

```js
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = 'hello';
const n: number = obj;
```

当你不想为了让 TypeScript 相信某行代码是安全的而写出冗长的类型声明时，`any` 类型非常有用。

### noImplicitAny

当您未指定类型，且 TypeScript 无法从上下文中推断出类型时，编译器通常会默认使用 `any` 类型。

不过，您通常希望避免这种情况，因为 `any` 类型不会进行类型检查。您可以使用编译器标志 `noImplicitAny` 将任何隐式 `any` 类型标记为错误。

## 变量的类型注解

当你使用 const、var 或 let 声明变量时，可以可选地添加类型注释来显式指定变量的类型：

```js
let myName: string = 'Alice';
```

::: tip
TypeScript 不使用类似 `int x = 0` 的“类型在左侧”声明方式；类型注释始终位于被声明的变量之后。
:::

不过，在大多数情况下，这并不必要。在可能的情况下，TypeScript 会尝试自动推断代码中的类型。例如，变量的类型会根据其初始化器的类型进行推断：

```js
// No type annotation needed -- 'myName' inferred as type 'string'
let myName: string = 'Alice';
```

大多数情况下，你不需要刻意去学习推断规则。如果你是刚开始学习，建议先少用一些类型注释——你可能会惊讶地发现，其实只需要很少的类型注释，TypeScript 就能完全理解代码的运行逻辑。

## 函数

函数是 JavaScript 中传递数据的主要方式。TypeScript 允许您指定函数的输入和输出值的类型。

### 参数类型注释

在声明函数时，您可以在每个参数之后添加类型注释，以声明函数接受的参数类型。参数类型注释位于参数名称之后：

```js
// Parameter type annotation
function greet(name: string) {
  console.log('Hello, ' + name.toUpperCase() + '!!');
}
```

当参数带有类型注解时，该函数的参数将进行类型检查：

```js
// Would be a runtime error if executed!
greet(42);
// Argument of type 'number' is not assignable to parameter of type 'string'.
```

::: tip
即使你的函数参数没有类型注释，TypeScript 仍然会检查你是否传入了正确数量的参数。
:::

### 返回类型注解

您还可以添加返回类型注解。返回类型注解出现在参数列表之后：

```js
function getFavoriteNumber(): number {
  return 26;
}
```

与变量类型注解类似，通常无需为函数添加返回类型注解，因为 TypeScript 会根据函数的返回语句推断其返回类型。上述示例中的类型注解不会改变任何内容。某些代码库会明确指定返回类型，以供文档参考、防止意外修改，或仅出于个人偏好。

### 返回 `Promise` 的函数

如果你想为返回 Promise 的函数注释返回类型，应使用 Promise 类型：

```js
async function getFavoriteNumber(): Promise<number> {
  return 26;
}
```

### 匿名函数

匿名函数与函数声明略有不同。当函数出现在 TypeScript 能够确定其调用方式的位置时，该函数的参数会自动被赋予类型。

以下是一个示例：

```js
const names = ['Alice', 'Bob', 'Eve'];

// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});
```

尽管参数 s 没有类型注释，TypeScript 仍会根据 forEach 函数的类型以及数组的推断类型来确定 s 的类型。

这个过程被称为上下文类型推断，因为函数出现的上下文会影响其应有的类型。

与类型推断规则类似，你不需要明确了解这个过程是如何发生的，但理解它确实发生可以帮助你注意到何时不需要类型注释。后来，我们将看到更多关于值出现的上下文如何影响其类型的示例。

## 对象类型

除了基本类型外，你最常遇到的类型是对象类型。这指的是任何具有属性的 JavaScript 值，几乎所有值都是这样！要定义对象类型，我们只需列出其属性和其类型。

例如，以下是一个接受类似点对象的函数：

```js
// The parameter's type annotation is an object type
function printCoord(pt: { x: number, y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

在这里，我们为参数添加了类型注解，该类型包含两个属性——x 和 y，两者均为数字类型。您可以使用逗号 (,) 或分号 (;) 来分隔属性，且无论使用哪种分隔符，最后一个分隔符均可省略。

每个属性的类型部分也是可选的。如果您未指定类型，则默认认为其类型为任何类型。

### 可选属性

对象类型还可以指定其部分或全部属性为可选。要实现这一点，请在属性名称后添加一个 ?：

```js
function printName(obj: { first: string, last?: string }) {
  // ...
}
// Both OK
printName({ first: 'Bob' });
printName({ first: 'Alice', last: 'Alisson' });
```

在 JavaScript 中，如果访问一个不存在的属性，你会得到 undefined 值，而不是运行时错误。因此，当你从一个可选属性中读取值时，必须在使用该值之前先检查是否为 undefined。

```js
function printName(obj: { first: string, last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  console.log(obj.last.toUpperCase());
  // 'obj.last' is possibly 'undefined'.
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}
```

## 联合类型

TypeScript 的类型系统允许您使用多种运算符从现有类型中构建新类型。现在我们已经了解如何编写几种类型，是时候开始以有趣的方式将它们结合起来了。

### 定义联合类型

您可能会首先遇到的一种类型组合方式是联合类型。联合类型是由两个或多个其他类型组合而成的类型，表示可能为这些类型中任意一种的值。我们将这些类型称为联合类型的成员。

让我们编写一个可以对字符串或数字进行操作的函数：

```js
function printId(id: number | string) {
  console.log('Your ID is: ' + id);
}
// OK
printId(101);
// OK
printId('202');
// Error
printId({ myID: 22342 });
// Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
```

:::tip
联合成员的分隔符可以在第一个元素之前使用，因此你也可以这样写：

```js
// | string | number | boolean
function printTextOrNumberOrBool(
  textOrNumberOrBool: string | number | boolean
) {
  console.log(textOrNumberOrBool);
}
```

:::

### 与联合类型协作

提供与联合类型匹配的值非常简单——只需提供与联合类型任何成员匹配的类型即可。如果你有一个联合类型的值，该如何与它协作？

TypeScript 只会允许对联合类型中的每个成员都有效的操作。例如，如果你有联合类型 string | number，你就不能使用仅在字符串上可用的方法：

```js
function printId(id: number | string) {
  console.log(id.toUpperCase());
  // Property 'toUpperCase' does not exist on type 'string | number'.
  //   Property 'toUpperCase' does not exist on type 'number'.
}
```

解决方法是用代码缩小联合，就像在没有类型注解的 JavaScript 中一样。当 TypeScript 可以根据代码的结构为值推断出更具体的类型时，就会出现缩小联合的情况。

例如，TypeScript 知道只有字符串值才会有 typeof 值 "string"：

```js
function printId(id: number | string) {
  if (typeof id === 'string') {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```

另一个例子是使用 Array.isArray 这样的函数：

```js
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log('Hello, ' + x.join(' and '));
  } else {
    // Here: 'x' is 'string'
    console.log('Welcome lone traveler ' + x);
  }
}
```

请注意，在 else 分支中，我们不需要做任何特殊处理--如果 x 不是字符串[]，那么它肯定是一个字符串。

有时，你会遇到一个所有成员都有共同点的联合体。例如，数组和字符串都有 slice 方法。如果联盟中的每个成员都有一个共同属性，那么就可以使用该属性，而无需缩小范围：

```js
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```

::: tip
类型的联合似乎是这些类型属性的交集，这可能会让人感到困惑。这并非偶然--union 这个名称来自类型理论。联合数字、字符串是由每种类型的值联合组成的。请注意，如果给定两个集合，每个集合都有相应的事实，那么只有这些事实的交集才适用于集合本身的联合。例如，如果我们有一个房间住着戴帽子的高个子，另一个房间住着戴帽子的讲西班牙语的人，那么将这些房间合并后，我们对每个人的唯一了解就是他们一定戴着帽子。
:::

## 类型别名

在使用对象类型和联合类型时，我们一直将它们直接写入类型注解中。这样做很方便，但通常我们会不止一次地使用同一类型，并用一个名称来指代它。

类型别名正是如此--任何类型的名称。类型别名的语法是：

```js
type Point = {
  x: number,
  y: number,
};

// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

实际上，您可以使用类型别名为任何类型命名，而不仅仅是对象类型。例如，类型别名可以命名一个联合类型：

```js
type ID = number | string;
```

请注意，别名只是别名，不能使用类型别名来创建同一类型的不同 "版本"。使用别名时，就如同编写了被别名的类型一样。换句话说，这段代码可能看起来不合法，但根据 TypeScript 是没问题的，因为这两种类型都是同一类型的别名：

```js
type UserInputSanitizedString = string;

function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}

// Create a sanitized input
let userInput = sanitizeInput(getInput());

// Can still be re-assigned with a string though
userInput = 'new input';
```

## 接口

接口声明是命名对象类型的另一种方式：

```js
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

正如我们之前使用类型别名的情况一样，这个示例的效果完全等同于使用了匿名对象类型。TypeScript 只关注传递给 printCoord 的值的结构——它只关心该值是否具备预期的属性。正因为只关注类型的结构和能力，我们才称 TypeScript 为结构化类型系统。

### 类型别名 vs 接口

类型别名和接口非常相似，在许多情况下可以自由选择使用其中一种。接口的几乎所有特性在类型中都可用，关键区别在于类型无法重新打开以添加新属性，而接口始终可扩展。

<table>
  <tr>
    <th><code>Interface</code></th>
    <th><code>Type</code></th>
  </tr>
  <tr>
    <td>
      <p>通过继承扩展接口</p>
      <code><pre>
      interface Animal {
        name: string;
      }<br>
      interface Bear extends Animal {
        honey: boolean;
      }<br>
      const bear = getBear();
      bear.name;
      bear.honey;
      </pre></code>
    </td>
    <td>
      <p>通过交集扩展类型</p>
      <code><pre>
      type Animal = {
        name: string;
      }<br>
      type Bear = Animal &amp; { 
        honey: boolean;
      }<br>
      const bear = getBear();
      bear.name;
      bear.honey;
      </pre></code>
    </td>
  </tr>
  <tr>
    <td>
      <p>对一个已经存在的接口添加新的字段</p>
      <code><pre>
      interface Window {
        title: string;
      }<br>
      interface Window {
        ts: TypeScriptAPI;
      }<br>
      const src = 'const a = "Hello World"';
      window.ts.transpileModule(src, {});
      </pre></code>
    </td>
    <td>
      <p>类型创建后不可更改</p>
      <code><pre>
      type Window = {
        title: string;
      }<br>
      type Window = {
        ts: TypeScriptAPI;
      }<br>
      <span style="color: #A31515"> // Error: Duplicate identifier 'Window'.</span><br>
      </pre></code>
    </td>
  </tr>
</table>

你将在后续章节中更深入地了解这些概念，所以不必担心现在无法完全理解它们。

- 在 TypeScript 4.2 版本之前，类型别名名称[可能出现在错误消息中](https://www.typescriptlang.org/play/#code/PTAEGEHsFsAcEsA2BTATqNrLusgzngIYDm+oA7koqIYuYQJ56gCueyoAUCKAC4AWHAHaFcoSADMaQ0PCG80EwgGNkALk6c5C1EtWgAsqOi1QAb06groEbjWg8vVHOKcAvpokshy3vEgyyMr8kEbQJogAFND2YREAlOaW1soBeJAoAHSIkMTRmbbI8e6aPMiZxJmgACqCGKhY6ABGyDnkFFQ0dIzMbBwCwqIccabcYLyQoKjIEmh8kwN8DLAc5PzwwbLMyAAeK77IACYaQSEjUWZWhfYAjABMAMwALA+gbsVjoADqgjKESytQPxCHghAByXigYgBfr8LAsYj8aQMUASbDQcRSExCeCwFiIQh+AKfAYyBiQFgOPyIaikSGLQo0Zj-aazaY+dSaXjLDgAGXgAC9CKhDqAALxJaw2Ib2RzOISuDycLw+ImBYKQflCkWRRD2LXCw6JCxS1JCdJZHJ5RAFIbFJU8ADKC3WzEcnVZaGYE1ABpFnFOmsFhsil2uoHuzwArO9SmAAEIsSFrZB-GgAjjA5gtVN8VCEc1o1C4Q4AGlR2AwO1EsBQoAAbvB-gJ4HhPgB5aDwem-Ph1TCV3AEEirTp4ELtRbTPD4vwKjOfAuioSQHuDXBcnmgACC+eCONFEs73YAPGGZVT5cRyyhiHh7AAON7lsG3vBggB8XGV3l8-nVISOgghxoLq9i7io-AHsayRWGaFrlFauq2rg9qaIGQHwCBqChtKdgRo8TxRjeyB3o+7xAA)，有时会替代等效的匿名类型（这可能并非总是理想情况）。接口名称在错误消息中始终会显示。
- 类型别名不能参与[声明合并，但接口可以。](https://www.typescriptlang.org/play/?#code/PTAEEEDtQS0gXApgJwGYEMDGjSfdAIx2UQFoB7AB0UkQBMAoEUfO0Wgd1ADd0AbAK6IAzizp16ALgYM4SNFhwBZdAFtV-UAG8GoPaADmNAcMmhh8ZHAMMAvjLkoM2UCvWad+0ARL0A-GYWVpA29gyY5JAWLJAwGnxmbvGgALzauvpGkCZmAEQAjABMAMwALLkANBl6zABi6DB8okR4Jjg+iPSgABboovDk3jjo5pbW1d6+dGb5djLwAJ7UoABKiJTwjThpnpnGpqPBoTLMAJrkArj4kOTwYmycPOhW6AR8IrDQ8N04wmo4HHQCwYi2Waw2W1S6S8HX8gTGITsQA)
- 接口仅可用于[声明对象的结构，不可用于重命名原始类型。](https://www.typescriptlang.org/play/#code/PTAEAkFMCdIcgM6gC4HcD2pIA8CGBbABwBtIl0AzUAKBFAFcEBLAOwHMUBPQs0XFgCahWyGBVwBjMrTDJMAshOhMARpD4tQ6FQCtIE5DWoixk9QEEWAeV37kARlABvaqDegAbrmL1IALlAEZGV2agBfampkbgtrWwMAJlAAXmdXdy8ff0Dg1jZwyLoAVWZ2Lh5QVHUJflAlSFxROsY5fFAWAmk6CnRoLGwmILzQQmV8JmQmDzI-SOiKgGV+CaYAL0gBBdyy1KCQ-Pn1AFFplgA5enw1PtSWS+vCsAAVAAtB4QQWOEMKBuYVUiVCYvYQsUTQcRSBDGMGmKSgAAa-VEgiQe2GLgKQA)
- 当接口被显式命名使用时，其名称在错误信息中[始终以原始形式呈现。](https://www.typescriptlang.org/play/?#code/PTAEGEHsFsAcEsA2BTATqNrLusgzngIYDm+oA7koqIYuYQJ56gCueyoAUCKAC4AWHAHaFcoSADMaQ0PCG80EwgGNkALk6c5C1EtWgAsqOi1QAb06groEbjWg8vVHOKcAvpokshy3vEgyyMr8kEbQJogAFND2YREAlOaW1soBeJAoAHSIkMTRmbbI8e6aPMiZxJmgACqCGKhY6ABGyDnkFFQ0dIzMbBwCwqIccabcYLyQoKjIEmh8kwN8DLAc5PzwwbLMyAAeK77IACYaQSEjUWY2Q-YAjABMAMwALA+gbsVjNXW8yxySoAADaAA0CCaZbPh1XYqXgOIY0ZgmcK0AA0nyaLFhhGY8F4AHJmEJILCWsgZId4NNfIgGFdcIcUTVfgBlZTOWC8T7kAJ42G4eT+GS42QyRaYbCgXAEEguTzeXyCjDBSAAQSE8Ai0Xsl0K9kcziExDeiQs1lAqSE6SyOTy0AKQ2KHk4p1V6s1OuuoHuzwArMagA)
- 相较于使用类型别名与交集，使用继承扩展的接口[通常能为编译器带来更优性能。](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections)

大多数情况下，你可以根据个人偏好进行选择，TypeScript 会在需要另一种声明类型时提示你。若需启用启发式规则，建议在需要使用类型声明的特性之前始终使用接口声明。

## 类型断言

有时你会掌握某些值的类型信息，而这些信息是 TypeScript 本身无法获取的。

例如，当使用 `document.getElementById` 时，TypeScript 仅知道该方法会返回某种 HTMLElement 类型，但你可能清楚页面中总会存在一个 ID 为特定值的 HTMLCanvasElement 元素。

这种情况下，你可以通过类型断言指定更具体的类型：

```js
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

与类型注解类似，类型断言会被编译器移除，不会影响代码的运行时行为。

您也可以使用尖括号语法（除非代码位于 .tsx 文件中），其效果等同于：

```js
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

:::tip
提醒：由于类型断言会在编译时被移除，因此类型断言不涉及运行时检查。若类型断言错误，不会引发异常或产生空值。
:::

TypeScript 仅允许将类型转换为更具体或更不具体的类型版本的类型断言。此规则可防止以下“不可能”的强制转换：

```js
const x = "hello" as number;
// Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
```

有时这条规则过于保守，会禁止某些可能有效的复杂强制转换。若出现这种情况，可使用两个断言：首先断言为任意类型（或未知类型，我们稍后会介绍），然后断言为目标类型：

```js
const a = expr as any as T;

// 或者 const a = expr as unknown as T;
```

## 字面量类型

### 字面量推断

## null 与 undefined

## 枚举

## 不常见的原始类型

### bigint

### symbol
