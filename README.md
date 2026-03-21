## Assert

This module provides a simple assertion function that throws an `AssertionError` if the condition is not met. It also includes helper functions for asserting that values are defined and/or not null.


## Condition assertion

```typescript
import { assert } from './assert';

const condition: boolean = false;
assert(condition); // throws an AssertionError
```

## Value assertion

To assert that a value is set, i.e. not `null` or `undefined`, you can use the `assert.value` function which will narrow the type of the value. If you only want to check for `undefined` or `null`, you can use the `assert.defined` or `assert.notNull` functions respectively.

```typescript
import { assert } from './assert';

const value: boolean | null | undefined = false;
const assertedValue = assert.value(value); // type: boolean

const value: string | null | undefined = 'some value';
const assertedValue = assert.defined(value); // type: string | null

const value: number | null | undefined = 42;
const assertedValue = assert.notNull(value); // type: number | undefined

```

### Customized error message and context

Every assertion function accepts an optional message and context parameter that can be used to provide additional information about the assertion failure. The message will be included in the error thrown, and the context will be included as a property on the error object.

The default message for each assertion function is as follows:
- `assert(condition)`: "Assertion failed"
- `assert.value(value)`: "Value is null or undefined"
- `assert.defined(value)`: "Value is undefined"
- `assert.notNull(value)`: "Value is null"

```typescript
import { assert } from './assert';

const condition: boolean = false;
assert(condition, 'Condition failed', { context: { some: 'value' } }); // throws an AssertionError with the provided message and context
```

