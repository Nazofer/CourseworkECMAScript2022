# CourseworkECMAScript2022
## Link to the report: https://youtu.be/xdmpk6CYPkM
## Introduction
 This work discusses the innovations in JavaScript that occurred during 2022-2021. Why is this important? 
JS is a living language that is constantly changing and improving. New proposals improve the basic syntax, increase the levels of abstractions in the use of 
language tools, and rewrite the legacy that stretches with us from the time of creation. Knowing about new features and keeping up with the changes is valid, 
which allows you to write more relevant code.
 
 The purpose of this work is to convey information about innovation, analytics, and benchmarking by comparing new solutions with those that have been 
implemented before. Given our knowledge of this programming language, we tried to analyze cases and new syntax elements as widely as possible.

# EcmaScript 2022 features:
## ``Array.prototype.at()``

This innovation adds a new way to access some element of the array. Unlike the usual [] syntax, this method accepts negative indexes, which allows you to refer to the elements from the end.
The main way to access the last element of the array is in the form of ``arr[arr.length - 1]`` - a very common, albeit long design. Alternatively, compare the new method with ``arr.slice(-1)[0]``, which can also refer to the last element.

## ``Object.hasOwn()``

This proposal adds a ``Object.hasOwn(object, property)`` method with the same behavior as calling ``Object.prototype.hasOwnProperty.call(object, property)`` but seems more short.

## Top-level ``await`` operator

Top-level ``await`` enables modules to act as big async functions. With top-level `await`, ECMAScript modules can await code resources, causing other modules that `import` them to wait before starting to evaluate the body. Now we can get rid of IIAFE(immediately invoked async function expression) which would be prettier.

## Reg-Exp match indices

This feature modifies  `matchAll` and `exec` methods. As usual, these methods return object, that contains information about substring - the index of the beginning, adtitional properties that point to the input string and special `groups` object.
New /d flag modifies this behavior - it adds aditional field with the information not only about the starting index, but with the ending index too.

## Private fields

Earlier, in JavaScript there were no mechanism to achieve incapsulation of data in classes - you could point some field with _ at the start of the name as private or add this functionality using `Symbol` or closures. Now, with the new # syntax you can implement private fields in your project. This works with usual data fields and methods as well.

# EcmaScript 2021 features:

## `String.prototype.replaceAll()`
There was no way to replace all instances of a substring in a string without using a global `RegExp`. `String.prototype.replace()` affects only the first corresponding substring. Therefore, to replace all suitable substrings, we need to use a /g flag.
The `replaceAll()` method returns a new string with all matches of a pattern replaced by a replacement. The pattern can be a string or a `RegExp`, and the replacement can be a string or a function to be called for each match.

## `Promise.any()`

`Promise.any` has similar functionality and contract as `Promise.race`, but it returns not either fullfiled or rejected promise, but only a first resolved one. Also it contains all the rejected promise results in an array.
