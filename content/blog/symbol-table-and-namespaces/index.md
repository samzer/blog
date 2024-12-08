---
title: Symbol Tables and Namespaces in Python
date: "2024-12-08T22:40:32.169Z"
description: Python manages variables and their scopes through namespaces and symbol tables. Namespaces organize names and objects across different levels like local, global, and built-in, while symbol tables, created during compilation, determine how and where these names are resolved. Together, they form the backbone of Python’s scoping and variable handling.
---

When Python runs code, it needs to keep track of variable names and their associated values. Two key concepts facilitate this process: **symbol tables** and **namespaces**.

### Namespaces

A **namespace** is a collection (mapping) of names to objects. You can think of it like a dictionary where the keys are variable names (identifiers) and the values are the actual objects (like numbers, strings, functions, classes, etc.).

Common namespaces in Python:

1. **Local Namespace:**  
    Each function call creates its own local namespace where its variables live. When the function finishes, that namespace is destroyed.
    
2. **Enclosing (Nonlocal) Namespace:**  
    If a function is nested inside another function, the inner function has access to its own namespace and also the namespace of the function in which it is defined (the enclosing namespace).
    
3. **Global Namespace:**  
    Each module (each `.py` file) has a global namespace that holds the module’s top-level variables, functions, and classes. These remain as long as the module is loaded.
    
4. **Built-in Namespace:**  
    Python provides a built-in namespace that stores built-in functions and exceptions (like `len`, `print`, `Exception`). It is loaded when Python starts and remains available throughout the execution.
    

**Example of Namespaces:**


```python
x = 10    # This x lives in the global namespace

def outer():
    y = 20  # This y is in outer()'s local namespace
    def inner():
        z = 30  # z is local to inner()
        # inner() can see z (local), y (enclosing), x (global), and built-ins
        print(x, y, z, len)  # len is a built-in function
    inner()

outer()

```
When `inner()` is called, Python checks variable names in this order (LEGB rule):

- **L (Local):** Variables in `inner()`’s namespace (like `z`)
- **E (Enclosing):** Variables in `outer()`’s namespace (like `y`)
- **G (Global):** Variables in the global namespace (like `x`)
- **B (Built-in):** Names in Python’s built-in namespace (like `len`)

Each of these levels is a separate namespace:

- `inner()`’s local namespace: `{'z': 30}`
- `outer()`’s local namespace: `{'y': 20}`
- global namespace: `{'x': 10, 'outer': <function outer>, ...}`
- built-in namespace: `{'len': <built-in function len>, 'print': <built-in function print>, ...}`

### Symbol Tables

A **symbol table** is an internal data structure that the Python interpreter creates and uses to track variable names (symbols) and their attributes. When the Python compiler (not to be confused with a C/C++ compiler—this is Python’s internal compilation to bytecode) processes a module, it determines which names are local, which are global, and how scopes nest. The symbol table is created at compile time and guides the interpreter on how to access variables at runtime.

- **Compile Time vs. Run Time:**  
    The symbol table is built when Python compiles your `.py` source into bytecode. By the time your code runs, Python already knows which variables should be treated as locals, which should be globals, and whether it needs to look up variables in enclosing scopes. This reduces overhead during execution because the interpreter knows exactly where to find variables.
    
- **Types of Symbol Tables:**  
    Python maintains different symbol tables for different scopes:
    
    - **Module-level (Global) symbol table:** Identifies global variables in a module.
    - **Function-level (Local) symbol table:** Identifies local variables, parameters, and possibly nonlocal variables that should reference outer scopes.
    
    The symbol tables do not map names directly to values. Instead, they describe how names should be treated. For example, a symbol table entry might say "the variable `x` is a local variable in this function," or "the variable `outer` is a global name referencing a function."
    

**Example of Symbol Table Use:**

Consider this code:
```python
x = 5

def foo(a):
    b = a + x
    return b

```
When Python compiles this:

- For the module symbol table, Python notes that `x` is a global name, and `foo` is a global function name.
- For the `foo` function’s symbol table, Python notes that `a` and `b` are local variables. It also detects that `x` is not defined inside `foo` and is not an enclosing variable, so it must be found in the global scope.

At runtime, when `foo(10)` runs:

- The interpreter looks up `a` and `b` in `foo`’s local namespace.
- For `x`, the interpreter knows (thanks to the symbol table compiled earlier) that `x` is global, so it checks the global namespace rather than creating a local `x`.

If we had a nested function, the symbol tables help Python decide which names are `nonlocal`—names defined in an enclosing function, but not local or global. If we used the `nonlocal` keyword, Python would mark that variable in the symbol table accordingly, ensuring that assignments inside the inner function affect the variable in the outer function’s namespace.

**Another Example:**

```python
def outer():
    count = 1
    def inner():
        nonlocal count
        count = count + 1
        return count
    return inner

f = outer()
print(f())  # Outputs 2
print(f())  # Outputs 3
```
In this snippet, the symbol table for `inner()` records that `count` is not a local variable defined inside `inner()`, nor is it a global. Because of the `nonlocal` statement, the compiler marks `count` as coming from an enclosing scope (outer’s local namespace). The symbol table ensures that `count = count + 1` modifies `outer()`’s `count` variable rather than making a new local one in `inner()`.


### Difference between namespace and symbol table

A **namespace** is a runtime mapping of names to objects (like a dictionary), while a **symbol table** is a compile-time structure the interpreter creates to decide how names should be resolved (where they live and what scope they belong to) before the code runs.

**Detailed Explanation:**

- **Namespace:**
    
    - **What It Is:** A namespace is a collection (or mapping) of names to objects. You can think of it like a dictionary where each key is a variable name (identifier) and the corresponding value is the object (int, string, function, module, etc.) that the name refers to.
    - **When It Exists:** Namespaces exist at runtime. As your code executes, Python creates and maintains these namespaces for modules, classes, and functions. Each function call, for example, gets its own local namespace.
    - **Examples:**
        - A module’s global namespace: holds top-level variables and functions defined in that module.
        - A function’s local namespace: holds local variables and parameters.
        - The built-in namespace: holds built-in functions like `len()` and `range()`.
- **Symbol Table:**
    
    - **What It Is:** A symbol table is an internal data structure that the Python interpreter’s compiler uses at compile time. It does not directly store objects, but rather information about how names are treated: which names are local variables, which are global, and which should be loaded from an enclosing scope.
    - **When It Exists:** Symbol tables are created and used during the compilation stage. They guide how Python’s bytecode is generated and tell the interpreter where and how to look up variables at runtime.
    - **Examples:**
        - When Python sees `x = 10` at the top level of a module, the symbol table marks `x` as a global name in that module.
        - If `x` is assigned inside a function without a global or nonlocal declaration, the symbol table marks `x` as local to that function.

**In Essence:**

- **Symbol Table:** Decides how code will handle variable lookups before the code runs. It’s a blueprint created during the compilation of your source code, ensuring the runtime knows which namespace to look in for a given variable.
- **Namespace:** The actual data structure at runtime where variables (names) and their corresponding values (objects) live. It’s what the running program interacts with to store and retrieve object references.

### Summary

- **Namespace:** A runtime mapping from names to objects. Each scope (local, global, built-in, and enclosing) has its own namespace, like a dictionary of names and values.
- **Symbol Table:** A compile-time structure that tells Python how to handle variable names, determining which namespace to use for each variable and whether variables are local, nonlocal, global, or built-in.
- **Usage:**
    - The Python compiler builds symbol tables from source code.
    - At runtime, the interpreter consults these symbol tables to efficiently look up or store variable values in the appropriate namespace.

By combining symbol tables (for rules and scope decisions) and namespaces (for actual storage of variables and their values), Python can efficiently manage variables, support nested functions, and implement lexical scoping.