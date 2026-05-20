/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                    CORE JAVASCRIPT FUNDAMENTALS GUIDE                        ║
║                   Complete Guide with Visual Examples                        ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

// =============================================================================
// 1. VAR vs LET vs CONST
// =============================================================================

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ VAR - The Old Way (Pre-ES6)                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ ✓ Function-scoped (NOT block-scoped)                                        │
│ ✓ Can be re-declared                                                        │
│ ✓ Can be updated                                                            │
│ ✓ Hoisted to the top (initialized as undefined)                             │
│ ⚠ Prone to bugs due to lack of block scope                                  │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Example 1: var is function-scoped
function varExample() {
  var x = 10;
  if (true) {
    var x = 20; // Same variable! Overwrites the outer x
    console.log(x); // 20
  }
  console.log(x); // 20 (not 10!) - var ignores block scope
}

// Example 2: var can be re-declared
var name = "John";
var name = "Jane"; // No error - this is allowed but dangerous!
console.log(name); // Jane

// Example 3: var hoisting
console.log(age); // undefined (not ReferenceError!)
var age = 25;
// What JavaScript actually does:
// var age;  // Hoisted to top, initialized as undefined
// console.log(age);
// age = 25;

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ LET - Modern Variable Declaration (ES6+)                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ ✓ Block-scoped { }                                                          │
│ ✗ Cannot be re-declared in same scope                                       │
│ ✓ Can be updated                                                            │
│ ✓ Hoisted but not initialized (Temporal Dead Zone)                          │
│ ✓ Best for values that change                                               │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Example 1: let is block-scoped
function letExample() {
  let x = 10;
  if (true) {
    let x = 20; // Different variable! Block-scoped
    console.log(x); // 20
  }
  console.log(x); // 10 - outer x is preserved
}

// Example 2: let cannot be re-declared
let score = 100;
// let score = 200; // ❌ SyntaxError: Identifier 'score' has already been declared
score = 200; // ✅ OK - can be updated

// Example 3: let and Temporal Dead Zone (TDZ)
// console.log(count); // ❌ ReferenceError: Cannot access 'count' before initialization
let count = 5;

// Example 4: let in loops
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints: 0, 1, 2
  // Each iteration has its own 'i'
}

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ CONST - Constant Declaration (ES6+)                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ ✓ Block-scoped { }                                                          │
│ ✗ Cannot be re-declared                                                     │
│ ✗ Cannot be reassigned                                                      │
│ ⚠ Object/Array properties CAN be modified                                   │
│ ✓ Must be initialized at declaration                                        │
│ ✓ Best practice: Use by default unless you need to reassign                 │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Example 1: const cannot be reassigned
const PI = 3.14159;
// PI = 3.14; // ❌ TypeError: Assignment to constant variable

// Example 2: const must be initialized
// const userName; // ❌ SyntaxError: Missing initializer in const declaration
const userName = "Alice"; // ✅ OK

// Example 3: const with objects (IMPORTANT!)
const person = { name: "Bob", age: 30 };
person.age = 31; // ✅ OK - modifying property
person.city = "NYC"; // ✅ OK - adding property
console.log(person); // { name: "Bob", age: 31, city: "NYC" }
// person = { name: "Charlie" }; // ❌ TypeError: Assignment to constant variable

// Example 4: const with arrays (IMPORTANT!)
const colors = ["red", "green"];
colors.push("blue"); // ✅ OK - modifying array
colors[0] = "yellow"; // ✅ OK - changing element
console.log(colors); // ["yellow", "green", "blue"]
// colors = ["purple"]; // ❌ TypeError: Assignment to constant variable

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ VISUAL COMPARISON: var vs let vs const                                     │
└─────────────────────────────────────────────────────────────────────────────┘

                    var         let         const
                    ───         ───         ─────
Scope:              Function    Block       Block
Re-declare:         ✅          ❌          ❌
Re-assign:          ✅          ✅          ❌
Hoisting:           ✅ (undef)  ✅ (TDZ)    ✅ (TDZ)
Must Initialize:    ❌          ❌          ✅
Mutate Object:      ✅          ✅          ✅

BEST PRACTICE:
1. Use const by default
2. Use let when you need to reassign
3. Never use var (legacy code only)
*/


// =============================================================================
// 2. BLOCK SCOPE vs FUNCTION SCOPE
// =============================================================================

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ FUNCTION SCOPE (var)                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ Variable is accessible anywhere within the function                         │
│ Ignores blocks like if, for, while, etc.                                   │
└─────────────────────────────────────────────────────────────────────────────┘
*/

function functionScopeExample() {
  var functionScoped = "I'm accessible everywhere in this function";

  if (true) {
    var insideIf = "I'm also function-scoped";
  }

  for (var i = 0; i < 3; i++) {
    var insideLoop = "Me too!";
  }

  console.log(functionScoped); // ✅ Works
  console.log(insideIf);       // ✅ Works - var ignores block
  console.log(insideLoop);     // ✅ Works - var ignores block
  console.log(i);              // ✅ Works - i is 3
}

// console.log(functionScoped); // ❌ ReferenceError - not accessible outside function

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ BLOCK SCOPE (let/const)                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ Variable is accessible only within { } curly braces                        │
│ Respects if, for, while, { } blocks                                        │
│ More predictable and safer                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
*/

function blockScopeExample() {
  let functionLevel = "Accessible in whole function";

  if (true) {
    let blockLevel = "Only accessible in this if block";
    console.log(functionLevel); // ✅ Can access outer scope
    console.log(blockLevel);    // ✅ Can access in same block
  }

  // console.log(blockLevel); // ❌ ReferenceError - blockLevel doesn't exist here

  for (let i = 0; i < 3; i++) {
    let loopVariable = "Only in this loop";
  }

  // console.log(i);            // ❌ ReferenceError
  // console.log(loopVariable); // ❌ ReferenceError
}

/*
VISUAL REPRESENTATION:

function example() {           ← Function Scope Boundary
  var a = 1;                   │ 'a' accessible everywhere below
  let b = 2;                   │ 'b' accessible everywhere below

  if (true) {                  ← Block Scope Boundary
    var c = 3;                 │ 'c' is function-scoped (accessible outside)
    let d = 4;                 │ 'd' is block-scoped (NOT accessible outside)
  }                            ← Block Scope Ends

  console.log(a); // ✅ 1
  console.log(b); // ✅ 2
  console.log(c); // ✅ 3 (var ignores block)
  console.log(d); // ❌ ReferenceError
}                              ← Function Scope Ends
*/


// =============================================================================
// 3. HOISTING
// =============================================================================

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ HOISTING - Moving Declarations to the Top                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ JavaScript moves variable and function declarations to the top             │
│ Only DECLARATIONS are hoisted, not INITIALIZATIONS                         │
│ Different behavior for var, let/const, and functions                       │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// --- VAR HOISTING ---
console.log(hoistedVar); // undefined (not ReferenceError!)
var hoistedVar = "I'm hoisted";
console.log(hoistedVar); // "I'm hoisted"

/* What JavaScript actually does:
var hoistedVar;              // Declaration hoisted, initialized as undefined
console.log(hoistedVar);     // undefined
hoistedVar = "I'm hoisted";  // Assignment stays in place
console.log(hoistedVar);     // "I'm hoisted"
*/

// --- LET/CONST HOISTING (Temporal Dead Zone) ---
// console.log(hoistedLet); // ❌ ReferenceError: Cannot access before initialization
let hoistedLet = "I'm in TDZ before this line";

/* What JavaScript does:
// hoistedLet exists but in "Temporal Dead Zone"
// ↓ TDZ starts
// console.log(hoistedLet); // ❌ Error
let hoistedLet = "...";     // ← TDZ ends here
*/

// --- FUNCTION HOISTING ---
// Function declarations are fully hoisted (including the body)
greet(); // ✅ Works! Prints "Hello"

function greet() {
  console.log("Hello");
}

// Function expressions are NOT fully hoisted
// sayHi(); // ❌ TypeError: sayHi is not a function
var sayHi = function() {
  console.log("Hi");
};

/*
VISUAL REPRESENTATION OF HOISTING:

// What you write:
console.log(a);
var a = 5;
hello();
function hello() { }

// What JavaScript executes:
var a;                    // ← var hoisted, initialized as undefined
function hello() { }      // ← function fully hoisted
console.log(a);          // undefined
a = 5;                   // assignment stays in place
hello();                 // works because function is hoisted

┌─────────────────────────────────────────────────────────────────┐
│ HOISTING COMPARISON                                             │
├─────────────────────────────────────────────────────────────────┤
│ var:           Hoisted + initialized as undefined               │
│ let/const:     Hoisted + NOT initialized (TDZ)                  │
│ function:      Fully hoisted (declaration + body)               │
│ class:         Hoisted + NOT initialized (TDZ)                  │
└─────────────────────────────────────────────────────────────────┘
*/


// =============================================================================
// 4. PRIMITIVE vs REFERENCE TYPES
// =============================================================================

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ PRIMITIVE TYPES (Stored by Value)                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. String      "hello", 'world', `template`                                │
│ 2. Number      42, 3.14, Infinity, NaN                                     │
│ 3. Boolean     true, false                                                 │
│ 4. Undefined   undefined                                                   │
│ 5. Null        null                                                        │
│ 6. Symbol      Symbol('id')                                                │
│ 7. BigInt      9007199254740991n                                           │
│                                                                             │
│ Characteristics:                                                            │
│ • Immutable (cannot be changed)                                            │
│ • Stored directly in the variable                                          │
│ • Copied by value                                                          │
│ • Compared by value                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Primitives are copied BY VALUE
let num1 = 10;
let num2 = num1; // Copies the VALUE 10
num2 = 20;

console.log(num1); // 10 (unchanged)
console.log(num2); // 20

/* VISUAL:
   num1: [10]     num2: [10]  ← Copy the value
   num1: [10]     num2: [20]  ← Changing num2 doesn't affect num1
*/

// String example (strings are immutable)
let str1 = "Hello";
let str2 = str1;
str2 = "World";

console.log(str1); // "Hello" (unchanged)
console.log(str2); // "World"

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ REFERENCE TYPES (Stored by Reference)                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. Objects     { key: value }                                              │
│ 2. Arrays      [1, 2, 3]                                                   │
│ 3. Functions   function() {}, () => {}                                     │
│ 4. Dates       new Date()                                                  │
│ 5. RegExp      /pattern/                                                   │
│ 6. Map, Set    new Map(), new Set()                                        │
│                                                                             │
│ Characteristics:                                                            │
│ • Mutable (can be changed)                                                 │
│ • Stored as reference (memory address)                                     │
│ • Copied by reference                                                      │
│ • Compared by reference (not content)                                      │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Objects are copied BY REFERENCE
let obj1 = { name: "Alice" };
let obj2 = obj1; // Copies the REFERENCE, not the value
obj2.name = "Bob";

console.log(obj1.name); // "Bob" (changed! Both point to same object)
console.log(obj2.name); // "Bob"

/* VISUAL:
   obj1: [ref→0x001] ──→ { name: "Alice" } ←── obj2: [ref→0x001]
                          (both point to same memory location)

   When obj2.name = "Bob":
   obj1: [ref→0x001] ──→ { name: "Bob" } ←── obj2: [ref→0x001]
*/

// Array example
let arr1 = [1, 2, 3];
let arr2 = arr1; // Copies reference
arr2.push(4);

console.log(arr1); // [1, 2, 3, 4] (changed!)
console.log(arr2); // [1, 2, 3, 4]

// How to create independent copies:

// Method 1: Spread operator (shallow copy)
let original = { name: "Alice", age: 25 };
let copy1 = { ...original };
copy1.name = "Bob";
console.log(original.name); // "Alice" (unchanged)
console.log(copy1.name);    // "Bob"

// Method 2: Object.assign (shallow copy)
let copy2 = Object.assign({}, original);

// Method 3: JSON (deep copy, but has limitations)
let deepOriginal = { name: "Alice", nested: { value: 10 } };
let deepCopy = JSON.parse(JSON.stringify(deepOriginal));
deepCopy.nested.value = 20;
console.log(deepOriginal.nested.value); // 10 (unchanged)

// Method 4: Array spread
let originalArray = [1, 2, 3];
let copyArray = [...originalArray];
copyArray.push(4);
console.log(originalArray); // [1, 2, 3] (unchanged)

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ KEY DIFFERENCES                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                 PRIMITIVE              REFERENCE                            │
│                 ─────────              ─────────                            │
│ Storage:        Value                  Reference (pointer)                 │
│ Copy:           Creates new value      Shares same reference               │
│ Mutability:     Immutable              Mutable                             │
│ Comparison:     By value               By reference                        │
│ Memory:         Stack                  Heap                                │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Comparison examples
// Primitives: compared by value
console.log(5 === 5);           // true
console.log("hello" === "hello"); // true

// References: compared by reference
console.log({} === {});           // false (different objects in memory)
console.log([1,2] === [1,2]);     // false (different arrays in memory)

let objA = { x: 1 };
let objB = objA;
console.log(objA === objB);       // true (same reference)


// =============================================================================
// 5. TYPE COERCION
// =============================================================================

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ TYPE COERCION - Automatic Type Conversion                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ JavaScript automatically converts types in certain operations              │
│ Can lead to unexpected results if not understood                           │
│ Two types: Implicit (automatic) and Explicit (manual)                     │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// --- IMPLICIT COERCION (Automatic) ---

// String coercion (+ operator with strings)
console.log("5" + 3);        // "53" (number → string)
console.log("Hello" + true); // "Hellotrue" (boolean → string)
console.log("5" + null);     // "5null" (null → string)
console.log("5" + undefined);// "5undefined"

// Number coercion (math operators: -, *, /, %)
console.log("5" - 3);        // 2 (string → number)
console.log("10" * "2");     // 20 (both strings → numbers)
console.log("10" / "2");     // 5
console.log("10" - "abc");   // NaN (can't convert "abc" to number)

// Boolean coercion (if, while, ternary, logical operators)
if ("hello") {               // "hello" → true (non-empty string)
  console.log("Truthy!");
}

if (0) {                     // 0 → false
  console.log("Won't run");
}

// Comparison coercion (== operator)
console.log(5 == "5");       // true (string "5" → number 5)
console.log(true == 1);      // true (boolean → number)
console.log(false == 0);     // true
console.log(null == undefined); // true (special case)

// --- EXPLICIT COERCION (Manual) ---

// To String
String(123);           // "123"
(123).toString();      // "123"
123 + "";              // "123" (implicit but intentional)

// To Number
Number("123");         // 123
Number("12.5");        // 12.5
Number("abc");         // NaN
Number(true);          // 1
Number(false);         // 0
Number(null);          // 0
Number(undefined);     // NaN
parseInt("123");       // 123
parseInt("123.45");    // 123 (removes decimal)
parseFloat("123.45");  // 123.45
+"123";                // 123 (unary plus)

// To Boolean
Boolean(1);            // true
Boolean(0);            // false
Boolean("hello");      // true
Boolean("");           // false
Boolean(null);         // false
Boolean(undefined);    // false
Boolean({});           // true (objects are always truthy)
Boolean([]);           // true (arrays are always truthy)
!!value;               // Double negation trick

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ COERCION RULES SUMMARY                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ + with string:      Everything converts to string                          │
│ Math operators:     Everything converts to number                          │
│ Logical context:    Everything converts to boolean                         │
│ == comparison:      Complex coercion rules (avoid, use ===)               │
└─────────────────────────────────────────────────────────────────────────────┘
*/


// =============================================================================
// 6. typeof OPERATOR
// =============================================================================

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ typeof - Returns the type of a value as a string                           │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Primitives
console.log(typeof 42);              // "number"
console.log(typeof 3.14);            // "number"
console.log(typeof NaN);             // "number" (weird but true!)
console.log(typeof Infinity);        // "number"
console.log(typeof "hello");         // "string"
console.log(typeof true);            // "boolean"
console.log(typeof undefined);       // "undefined"
console.log(typeof Symbol("id"));    // "symbol"
console.log(typeof 9007199254740991n); // "bigint"

// Special case: null (JavaScript bug from 1995!)
console.log(typeof null);            // "object" ⚠️ WRONG! (historical bug)

// Reference types
console.log(typeof {});              // "object"
console.log(typeof []);              // "object" (arrays are objects)
console.log(typeof new Date());      // "object"
console.log(typeof /regex/);         // "object"
console.log(typeof function() {});   // "function" (special case)

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ TYPEOF RESULTS                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ Value                      typeof Returns                                   │
│ ─────────────────────────  ──────────────────                               │
│ Numbers (42, 3.14, NaN)    "number"                                        │
│ Strings ("hello")          "string"                                        │
│ Booleans (true, false)     "boolean"                                       │
│ undefined                  "undefined"                                     │
│ Symbol                     "symbol"                                        │
│ BigInt                     "bigint"                                        │
│ null                       "object" ⚠️ (bug!)                              │
│ Objects, Arrays, Dates     "object"                                        │
│ Functions                  "function"                                      │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Better ways to check types:

// Check for null specifically
const value = null;
console.log(value === null); // true (correct way)

// Check for array
console.log(Array.isArray([]));        // true
console.log(Array.isArray({}));        // false

// Check for object (excluding null)
console.log(typeof {} === "object" && {} !== null); // true

// Check for NaN
console.log(Number.isNaN(NaN));        // true
console.log(Number.isNaN("hello"));    // false (not NaN, just not a number)

// instanceof for object types
console.log([] instanceof Array);      // true
console.log(new Date() instanceof Date); // true
console.log({} instanceof Object);     // true


// =============================================================================
// 7. NULL vs UNDEFINED
// =============================================================================

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ UNDEFINED                                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Default value for uninitialized variables                                │
│ • Returned when accessing non-existent object properties                   │
│ • Returned by functions with no return statement                           │
│ • Means "value has not been assigned yet"                                  │
│ • Type: "undefined"                                                         │
└─────────────────────────────────────────────────────────────────────────────┘
*/

let undefinedVar;
console.log(undefinedVar);           // undefined (declared but not assigned)

const obj = { name: "Alice" };
console.log(obj.age);                // undefined (property doesn't exist)

function noReturn() {
  // no return statement
}
console.log(noReturn());             // undefined

function explicitReturn() {
  return;                            // explicit return with no value
}
console.log(explicitReturn());       // undefined

// Function parameter
function example(param) {
  console.log(param);                // undefined if not passed
}
example(); // undefined

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ NULL                                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Intentional absence of value                                             │
│ • Must be assigned explicitly                                              │
│ • Represents "no object" or "empty"                                        │
│ • Often used to clear object references                                    │
│ • Type: "object" (historical bug)                                          │
└─────────────────────────────────────────────────────────────────────────────┘
*/

let nullVar = null;                  // Intentionally empty
console.log(nullVar);                // null

// Use case: clearing an object reference
let user = { name: "Bob" };
user = null;                         // Explicitly clearing the reference

// API response example
const apiResponse = {
  data: null,                        // Intentionally no data
  error: null                        // Intentionally no error
};

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ KEY DIFFERENCES                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                     undefined                null                           │
│                     ─────────                ────                           │
│ Meaning:            Not assigned yet         Intentionally empty           │
│ Assignment:         Automatic                Manual                        │
│ typeof:             "undefined"              "object" (bug)                │
│ Common use:         Default values           Explicit empty state          │
│ In JSON:            Not valid                Valid (null)                  │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Comparison
console.log(undefined == null);      // true (loose equality)
console.log(undefined === null);     // false (strict equality - different types)

console.log(typeof undefined);       // "undefined"
console.log(typeof null);            // "object" (bug)

// Falsy values
console.log(Boolean(undefined));     // false
console.log(Boolean(null));          // false

// In conditionals (both are falsy)
if (!undefined) console.log("undefined is falsy"); // prints
if (!null) console.log("null is falsy");           // prints

// Best practices
let uninitializedValue;              // ✅ Let JavaScript use undefined
let intentionallyEmpty = null;       // ✅ Use null for intentional emptiness

// Checking for null or undefined
const checkValue = (val) => {
  if (val == null) {                 // ✅ Catches both null and undefined
    console.log("No value");
  }

  // Or be explicit:
  if (val === null || val === undefined) {
    console.log("No value");
  }
};

// Nullish coalescing operator (??)
const value1 = null ?? "default";         // "default"
const value2 = undefined ?? "default";    // "default"
const value3 = 0 ?? "default";            // 0 (0 is not null/undefined)
const value4 = "" ?? "default";           // "" (empty string is not null/undefined)


// =============================================================================
// 8. TEMPLATE LITERALS
// =============================================================================

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ TEMPLATE LITERALS (Template Strings)                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Use backticks ` ` instead of quotes                                      │
│ • Allow embedded expressions ${expression}                                 │
│ • Support multi-line strings                                               │
│ • More readable and powerful than concatenation                            │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// --- OLD WAY: String Concatenation ---
const name2 = "Alice";
const age2 = 25;
const oldWay = "My name is " + name2 + " and I am " + age2 + " years old.";
console.log(oldWay);

// --- NEW WAY: Template Literals ---
const newWay = `My name is ${name2} and I am ${age2} years old.`;
console.log(newWay);

// String Interpolation - Embedding expressions
const price = 19.99;
const quantity = 3;
const total = `Total: $${price * quantity}`; // Can do math inside ${}
console.log(total); // "Total: $59.97"

// Embedding function calls
function getGreeting() {
  return "Hello";
}
const message = `${getGreeting()}, ${name2}!`;
console.log(message); // "Hello, Alice!"

// Embedding objects (will call toString())
const person2 = { name: "Bob", toString() { return this.name; } };
console.log(`User: ${person2}`); // "User: Bob"

// Complex expressions
const a = 5;
const b = 10;
console.log(`Fifteen is ${a + b} and not ${2 * a + b}.`);
// "Fifteen is 15 and not 20."

// Nested template literals
const classes = `btn ${true ? `btn-primary` : `btn-secondary`}`;
console.log(classes); // "btn btn-primary"

// --- MULTI-LINE STRINGS ---

// Old way (ugly!)
const oldMultiLine = "Line 1\n" +
                     "Line 2\n" +
                     "Line 3";

// New way (clean!)
const newMultiLine = `Line 1
Line 2
Line 3`;

console.log(newMultiLine);

// Practical example: HTML templates
const userCard = (name, email) => `
  <div class="user-card">
    <h2>${name}</h2>
    <p>Email: ${email}</p>
  </div>
`;

console.log(userCard("John Doe", "john@example.com"));

// SQL query example
const userId = 123;
const query = `
  SELECT *
  FROM users
  WHERE id = ${userId}
  AND status = 'active'
`;

// Dynamic CSS
const theme = "dark";
const css = `
  .container {
    background: ${theme === "dark" ? "#333" : "#fff"};
    color: ${theme === "dark" ? "#fff" : "#333"};
  }
`;

// --- TAGGED TEMPLATE LITERALS (Advanced) ---

// Custom template processor
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str}<strong>${values[i] || ''}</strong>`;
  }, '');
}

const item = "book";
const cost = 12.99;
const highlighted = highlight`I bought a ${item} for $${cost}`;
console.log(highlighted);
// "I bought a <strong>book</strong> for $<strong>12.99</strong>"

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ TEMPLATE LITERALS vs REGULAR STRINGS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ Feature              Regular Strings       Template Literals               │
│ ────────────────     ────────────────      ─────────────────               │
│ Quotes:              ' ' or " "            ` `                             │
│ Interpolation:       "x" + y + "z"         `x ${y} z`                      │
│ Multi-line:          "line1\nline2"        `line1                          │
│                                             line2`                          │
│ Expressions:         No                    Yes ${expr}                     │
│ Readability:         Lower                 Higher                          │
│ Tagged templates:    No                    Yes                             │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Practical tips:
// ✅ Use template literals for any string with variables
// ✅ Use for multi-line strings (HTML, SQL, etc.)
// ✅ Use for complex string building
// ❌ Not needed for simple static strings: `hello` vs "hello" (no benefit)


// =============================================================================
// 9. SHORT-CIRCUIT EVALUATION (&& and ||)
// =============================================================================

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ && (AND) OPERATOR - Returns first falsy value OR last value               │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Evaluates left to right                                                  │
│ • Stops (short-circuits) at first falsy value                             │
│ • Returns that falsy value                                                 │
│ • If all truthy, returns the last value                                    │
│ • Use for: conditional execution, guards                                   │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Basic && behavior
console.log(true && true);        // true (last value)
console.log(true && false);       // false (first falsy)
console.log(false && true);       // false (stops at first)
console.log("hello" && "world");  // "world" (all truthy → last)
console.log("hello" && 0);        // 0 (first falsy)
console.log(0 && "hello");        // 0 (stops immediately)

// Practical use case 1: Conditional execution
const user2 = { name: "Alice" };
user2 && console.log(user2.name); // Only logs if user exists
// Equivalent to: if (user) console.log(user.name);

// Practical use case 2: Safe property access
const config = null;
const theme2 = config && config.theme; // undefined (doesn't crash)
// Without &&: config.theme would throw error!

// Practical use case 3: Multiple conditions
const isLoggedIn = true;
const hasPermission = true;
isLoggedIn && hasPermission && console.log("Access granted");

// Practical use case 4: Component rendering (React)
const showModal = true;
const modal = showModal && <Modal />; // Only render if true

// Chain multiple values
console.log("a" && "b" && "c");       // "c" (all truthy → last)
console.log("a" && "" && "c");        // "" (stops at empty string)
console.log("a" && null && "c");      // null (stops at null)

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ || (OR) OPERATOR - Returns first truthy value OR last value                │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Evaluates left to right                                                  │
│ • Stops (short-circuits) at first truthy value                            │
│ • Returns that truthy value                                                │
│ • If all falsy, returns the last value                                     │
│ • Use for: default values, fallbacks                                       │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Basic || behavior
console.log(false || true);       // true (first truthy)
console.log(true || false);       // true (stops at first)
console.log(false || false);      // false (last value)
console.log("hello" || "world");  // "hello" (stops at first truthy)
console.log("" || "default");     // "default" (first is falsy)
console.log(0 || 100);            // 100 (0 is falsy)

// Practical use case 1: Default values
function greet2(name) {
  name = name || "Guest";         // If no name, use "Guest"
  return `Hello, ${name}!`;
}
console.log(greet2());            // "Hello, Guest!"
console.log(greet2("Alice"));     // "Hello, Alice!"

// Practical use case 2: Configuration fallbacks
const userSettings = null;
const defaultSettings = { theme: "light", fontSize: 16 };
const settings = userSettings || defaultSettings; // Use default if null

// Practical use case 3: Caching
let cache;
function getData() {
  cache = cache || fetchExpensiveData(); // Only fetch if not cached
  return cache;
}

// Practical use case 4: Multiple fallbacks
const input = "";
const value5 = input || localStorage.getItem("backup") || "hardcoded default";

// Chain multiple values
console.log(false || null || "found"); // "found" (first truthy)
console.log(0 || "" || null);         // null (all falsy → last)

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ SHORT-CIRCUIT EVALUATION VISUAL                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ && (AND): Returns first FALSY or last value                                │
│ ───────────────────────────────────────────                                │
│ true && true && true    →  true (last)                                     │
│ true && false && true   →  false (stops here)                              │
│          ↑ stops                                                            │
│                                                                             │
│ || (OR): Returns first TRUTHY or last value                                │
│ ───────────────────────────────────────────                                │
│ false || false || false  →  false (last)                                   │
│ false || true || false   →  true (stops here)                              │
│          ↑ stops                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// ⚠️ GOTCHA: || with falsy but valid values
function setPort(port) {
  return port || 3000; // BUG: port 0 would be ignored!
}
console.log(setPort(0));     // 3000 (WRONG! 0 is falsy)
console.log(setPort(8080));  // 8080 (correct)

// ✅ SOLUTION: Nullish coalescing operator (??)
function setPortFixed(port) {
  return port ?? 3000; // Only null/undefined trigger default
}
console.log(setPortFixed(0));     // 0 (correct!)
console.log(setPortFixed(null));  // 3000 (correct)

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ && vs || COMPARISON                                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ Operator  Returns                When to use                               │
│ ────────  ─────────────────      ──────────────────────                    │
│ &&        First falsy / Last     Conditional execution, guards            │
│ ||        First truthy / Last    Default values, fallbacks                │
│ ??        First non-null / Last  Safe defaults (0, "" are valid)          │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Combining && and ||
const userAge = null;
const canVote = userAge >= 18 && "Yes" || "No"; // "No"

// Practical patterns:

// Pattern 1: Conditional execution
const isLoading = false;
isLoading && showSpinner(); // Only runs if isLoading is true

// Pattern 2: Default values
const username = getUserInput() || "anonymous";

// Pattern 3: Guard clauses
function processUser(user) {
  user.isActive && user.permissions.length > 0 && performAction();
}

// Pattern 4: Function chaining
const result = getValue() || getBackup() || getDefault() || "fallback";


// =============================================================================
// 10. TERNARY OPERATOR
// =============================================================================

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ TERNARY OPERATOR - Inline if-else expression                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ Syntax: condition ? valueIfTrue : valueIfFalse                             │
│                                                                             │
│ • Only operator with 3 operands                                            │
│ • Returns a value (expression, not statement)                              │
│ • Can be nested (but keep it readable!)                                    │
│ • Perfect for JSX and inline conditionals                                  │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Basic syntax
const age3 = 20;
const status = age3 >= 18 ? "adult" : "minor";
console.log(status); // "adult"

// Old way (if-else statement)
let status2;
if (age3 >= 18) {
  status2 = "adult";
} else {
  status2 = "minor";
}

// Ternary way (expression - returns value)
const status3 = age3 >= 18 ? "adult" : "minor";

// Use case 1: Variable assignment
const temperature = 75;
const weather = temperature > 80 ? "hot" : "nice";

// Use case 2: Function returns
function getDiscount(isMember) {
  return isMember ? 0.1 : 0;
}

// Use case 3: Function arguments
console.log(`You get ${isMember ? "10%" : "0%"} discount`);

// Use case 4: Array/Object values
const users = [
  { name: "Alice", role: isAdmin ? "admin" : "user" },
];

// Use case 5: JSX (React) - Most common use!
const Button = ({ isLoading }) => (
  <button>
    {isLoading ? "Loading..." : "Click me"}
  </button>
);

// Nested ternary (be careful - can get hard to read!)
const score2 = 85;
const grade = score2 >= 90 ? "A" :
              score2 >= 80 ? "B" :
              score2 >= 70 ? "C" :
              score2 >= 60 ? "D" : "F";
console.log(grade); // "B"

// Better: Use if-else for complex logic
function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

// With expressions
const x = 10;
const result2 = x > 5 ? x * 2 : x / 2; // 20

// With function calls
const result3 = isValid() ? processData() : showError();

// Multiple statements (use comma or IIFE, but if-else is cleaner)
const result4 = condition
  ? (console.log("true"), doSomething(), "value1")
  : (console.log("false"), "value2");

// Common patterns in React/JSX:

// Pattern 1: Show/hide elements
const ShowMessage = ({ hasError }) => (
  <div>
    {hasError ? <ErrorMessage /> : <SuccessMessage />}
  </div>
);

// Pattern 2: Conditional CSS classes
const className2 = `btn ${isActive ? "btn-active" : "btn-inactive"}`;

// Pattern 3: Conditional props
<Button disabled={isLoading ? true : false} />
// Better: <Button disabled={isLoading} />

// Pattern 4: Conditional rendering (with null)
const Modal2 = ({ showModal }) => (
  showModal ? <div>Modal content</div> : null
);

// Pattern 5: Default values
const displayName = user.name ? user.name : "Anonymous";
// Or better: user.name || "Anonymous"
// Or even better: user.name ?? "Anonymous"

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ TERNARY vs IF-ELSE                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                     Ternary                    If-Else                      │
│                     ───────                    ────────                     │
│ Type:               Expression                 Statement                    │
│ Returns:            Value                      Nothing                      │
│ Use in JSX:         ✅ Yes                     ❌ No                         │
│ Assign to var:      ✅ Yes                     ⚠️ Need extra code           │
│ Readability:        ✅ Simple cases            ✅ Complex logic              │
│ Multiple lines:     ⚠️ Gets messy              ✅ Clear                      │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// When to use ternary:
// ✅ Simple true/false logic
// ✅ Assigning values
// ✅ JSX rendering
// ✅ Inline conditionals
// ✅ When you need to return a value

// When to use if-else:
// ✅ Complex conditions
// ✅ Multiple statements per branch
// ✅ Nested logic (more than 1 level)
// ✅ Better debugging needed

// Anti-patterns (DON'T DO THIS):

// ❌ Too nested
const result5 = a ? b ? c ? d : e : f : g; // WHAT?!

// ❌ Long expressions
const result6 = someReallyLongCondition() && anotherCondition()
  ? doSomethingComplicated() + " " + andSomethingElse()
  : doSomethingDifferent() || getDefaultValue();

// ✅ Better alternatives:

// Alternative 1: Extract condition
const isEligible = age >= 18 && hasLicense;
const message2 = isEligible ? "Can drive" : "Cannot drive";

// Alternative 2: Use if-else for clarity
if (isEligible) {
  message = "Can drive";
} else {
  message = "Cannot drive";
}

// Alternative 3: Guard clauses with early return
function getMessage(age, hasLicense) {
  if (age < 18 || !hasLicense) return "Cannot drive";
  return "Can drive";
}


// =============================================================================
// 11. EQUALITY (== vs ===)
// =============================================================================

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ == (LOOSE EQUALITY) - Compares with type coercion                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Converts operands to same type before comparing                          │
│ • Can lead to unexpected results                                           │
│ • Generally avoid in modern JavaScript                                     │
│ • Has complex coercion rules                                               │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// == performs type coercion
console.log(5 == "5");           // true (string → number)
console.log(true == 1);          // true (boolean → number)
console.log(false == 0);         // true
console.log(null == undefined);  // true (special case)
console.log("" == 0);            // true (empty string → 0)
console.log(" " == 0);           // true (whitespace → 0)
console.log([1] == 1);           // true (array → string → number)

// Weird and confusing results with ==
console.log("" == "0");          // false
console.log(0 == "");            // true
console.log(0 == "0");           // true
// ^ How can "" == "0" be false, but both equal 0?!

console.log(false == "false");   // false
console.log(false == "0");       // true
// ^ Why is false == "0" true but false == "false" false?!

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ === (STRICT EQUALITY) - Compares without type coercion                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Checks both value AND type                                               │
│ • No type conversion                                                        │
│ • Predictable and safe                                                     │
│ • ALWAYS USE THIS (best practice)                                          │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// === does NOT perform type coercion
console.log(5 === "5");          // false (different types)
console.log(true === 1);         // false (different types)
console.log(false === 0);        // false
console.log(null === undefined); // false (different types)
console.log("" === 0);           // false
console.log(5 === 5);            // true (same type and value)
console.log("hello" === "hello");// true

// Special cases with ===
console.log(NaN === NaN);        // false (NaN is not equal to anything!)
console.log(Number.isNaN(NaN));  // true (correct way to check NaN)

console.log(+0 === -0);          // true (weird but true)
console.log(Object.is(+0, -0));  // false (Object.is for perfect equality)

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ != vs !==                                                                   │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// != (loose inequality) - avoid
console.log(5 != "5");           // false (with coercion)

// !== (strict inequality) - use this
console.log(5 !== "5");          // true (no coercion)

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ COMPARISON TABLE                                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ Expression                  ==        ===                                   │
│ ──────────────────────      ──        ───                                   │
│ 5 == "5"                    true      false                                │
│ true == 1                   true      false                                │
│ false == 0                  true      false                                │
│ null == undefined           true      false                                │
│ "" == 0                     true      false                                │
│ [] == false                 true      false                                │
│ [1] == 1                    true      false                                │
│ NaN == NaN                  false     false                                │
│ +0 == -0                    true      true                                 │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// When you MIGHT use == (rare cases):
// 1. Checking for null OR undefined
const value6 = null;
if (value6 == null) { // Catches both null and undefined
  console.log("No value");
}
// Equivalent to: value === null || value === undefined

// Better modern alternative:
if (value6 ?? false) { // Nullish coalescing
  console.log("Has value");
}

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ BEST PRACTICES                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ ✅ Always use === and !==                                                   │
│ ✅ Configure ESLint to enforce === (eqeqeq rule)                           │
│ ⚠️ Only use == when checking for null/undefined together                  │
│ ❌ Never rely on coercion rules - they're complex and error-prone          │
└─────────────────────────────────────────────────────────────────────────────┘
*/


// =============================================================================
// 12. TRUTHY and FALSY VALUES
// =============================================================================

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ FALSY VALUES (only 8 in JavaScript)                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. false         - The boolean false                                       │
│ 2. 0             - Zero                                                    │
│ 3. -0            - Negative zero                                           │
│ 4. 0n            - BigInt zero                                             │
│ 5. ""            - Empty string (also '' and ``)                           │
│ 6. null          - Null                                                    │
│ 7. undefined     - Undefined                                               │
│ 8. NaN           - Not a Number                                            │
│                                                                             │
│ EVERYTHING ELSE IS TRUTHY!                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Falsy values in conditionals
if (false) console.log("Won't run");
if (0) console.log("Won't run");
if (-0) console.log("Won't run");
if (0n) console.log("Won't run");
if ("") console.log("Won't run");
if (null) console.log("Won't run");
if (undefined) console.log("Won't run");
if (NaN) console.log("Won't run");

// All falsy values convert to false
console.log(Boolean(false));     // false
console.log(Boolean(0));         // false
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ TRUTHY VALUES (everything else!)                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ Includes (surprisingly):                                                    │
│ • "0" (string)           • "false" (string)       • " " (whitespace)       │
│ • [] (empty array)       • {} (empty object)      • function(){}           │
│ • Infinity               • -Infinity              • new Date()             │
│ • Any non-zero number    • Any non-empty string                            │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Truthy values in conditionals
if (true) console.log("Runs");           // ✅
if (1) console.log("Runs");              // ✅
if (-1) console.log("Runs");             // ✅
if ("hello") console.log("Runs");        // ✅
if ("0") console.log("Runs");            // ✅ String "0" is truthy!
if ("false") console.log("Runs");        // ✅ String "false" is truthy!
if ([]) console.log("Runs");             // ✅ Empty array is truthy!
if ({}) console.log("Runs");             // ✅ Empty object is truthy!
if (function(){}) console.log("Runs");   // ✅ Functions are truthy!

// Common gotchas:
console.log(Boolean("0"));        // true (string, not number 0)
console.log(Boolean("false"));    // true (string, not boolean false)
console.log(Boolean([]));         // true (objects are truthy)
console.log(Boolean({}));         // true (objects are truthy)
console.log(Boolean(Infinity));   // true
console.log(Boolean(-Infinity));  // true

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ VISUAL TRUTH TABLE                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ Value                  Boolean()      if (value)     !!value                │
│ ─────────────────      ─────────      ──────────     ────────               │
│ false                  false          ❌ No          false                  │
│ 0                      false          ❌ No          false                  │
│ ""                     false          ❌ No          false                  │
│ null                   false          ❌ No          false                  │
│ undefined              false          ❌ No          false                  │
│ NaN                    false          ❌ No          false                  │
│ ─────────────────────────────────────────────────────────────               │
│ true                   true           ✅ Yes         true                   │
│ 1                      true           ✅ Yes         true                   │
│ "hello"                true           ✅ Yes         true                   │
│ "0"                    true           ✅ Yes         true                   │
│ []                     true           ✅ Yes         true                   │
│ {}                     true           ✅ Yes         true                   │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Practical examples:

// Example 1: Checking for values
const username2 = "";
if (username2) {
  console.log(`Hello, ${username2}`); // Won't run (empty string is falsy)
}

// Example 2: Default values
function greet3(name) {
  if (!name) {              // If name is falsy
    name = "Guest";
  }
  return `Hello, ${name}`;
}
console.log(greet3(""));    // "Hello, Guest"
console.log(greet3());      // "Hello, Guest"

// Example 3: Array check (GOTCHA!)
const items = [];
if (items) {
  console.log("Has items"); // ❌ WRONG! Empty array is truthy
}
// Correct way:
if (items.length) {
  console.log("Has items"); // ✅ Checks length
}
// Or explicit:
if (items.length > 0) {
  console.log("Has items"); // ✅ Most clear
}

// Example 4: Object check (GOTCHA!)
const settings2 = {};
if (settings2) {
  console.log("Has settings"); // ❌ WRONG! Empty object is truthy
}
// Correct way:
if (Object.keys(settings2).length > 0) {
  console.log("Has settings"); // ✅ Checks if object has keys
}

// Example 5: Number check (GOTCHA!)
const count2 = 0;
if (count2) {
  console.log("Count exists"); // ❌ Won't run! 0 is falsy
}
// Correct way:
if (count2 !== undefined) {
  console.log("Count exists"); // ✅ Explicit check
}
// Or:
if (typeof count2 === "number") {
  console.log("Count exists"); // ✅ Type check
}

// Converting to boolean:

// Method 1: Boolean() function
Boolean("hello");              // true
Boolean(0);                    // false

// Method 2: Double negation !! (most common)
!!"hello";                     // true
!!0;                           // false
!!null;                        // false
!![1, 2, 3];                   // true

// Method 3: Ternary (explicit)
const value7 = "hello";
const isTruthy = value7 ? true : false;

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ BEST PRACTICES                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ ✅ Be explicit when checking arrays/objects                                │
│    if (array.length > 0) not if (array)                                   │
│                                                                             │
│ ✅ Be careful with 0 - it might be valid!                                  │
│    Use (value !== undefined) if 0 is valid                                │
│                                                                             │
│ ✅ Remember: "0", "false", [], {} are ALL truthy                           │
│                                                                             │
│ ✅ Use !! to convert to actual boolean if needed                           │
│                                                                             │
│ ✅ Use ?? (nullish coalescing) for null/undefined checks                   │
│    value ?? default // Only triggers for null/undefined                   │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// Common patterns:

// Pattern 1: Guard clause
function processData(data) {
  if (!data) return; // Exit if falsy
  // Process data...
}

// Pattern 2: Default parameters (modern)
function greet4(name = "Guest") { // ✅ Only triggers on undefined
  return `Hello, ${name}`;
}

// Pattern 3: Nullish coalescing
const port2 = process.env.PORT ?? 3000; // 0 would be kept!

// Pattern 4: Optional chaining + nullish coalescing
const userCity = user?.address?.city ?? "Unknown";

// Pattern 5: Explicit checks for clarity
if (array !== undefined && array !== null && array.length > 0) {
  // Very explicit, but clear
}

// Anti-patterns (AVOID):

// ❌ Implicit array check
if (myArray) { /* empty array passes! */ }

// ❌ Implicit object check
if (myObject) { /* empty object passes! */ }

// ❌ Using || with 0 or ""
const value8 = 0;
const result7 = value8 || 10; // 10 (0 was valid!)
// ✅ Better:
const result8 = value8 ?? 10; // 0 (correct!)


// =============================================================================
// END OF GUIDE
// =============================================================================

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                            QUICK REFERENCE                                   ║
╚══════════════════════════════════════════════════════════════════════════════╝

1. Variables:       Use const by default, let when reassigning, never var
2. Scope:           let/const are block-scoped, var is function-scoped
3. Hoisting:        var hoisted as undefined, let/const in TDZ
4. Primitives:      Copied by value, immutable
5. References:      Copied by reference, mutable
6. typeof:          Returns type as string (null bug: returns "object")
7. null:            Intentional absence (manual)
8. undefined:       Default absence (automatic)
9. Templates:       Use `${expr}` for interpolation
10. &&:             Returns first falsy or last value
11. ||:             Returns first truthy or last value
12. Ternary:        condition ? true : false
13. Equality:       Always use === (strict), avoid == (coercion)
14. Falsy:          false, 0, "", null, undefined, NaN (8 values)
15. Truthy:         Everything else (including "0", [], {})

REMEMBER:
• Use === not ==
• Use const by default
• Be explicit with arrays/objects in conditions
• Use ?? for null/undefined defaults (not || if 0 is valid)
• Template literals for any string with variables
• Empty array [] and empty object {} are truthy!
*/

// Happy coding! 🚀
