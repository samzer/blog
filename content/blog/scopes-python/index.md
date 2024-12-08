---
title: Understanding Variable Scope in Python 
date: "2024-12-08T22:40:32.169Z"
description: Variable scope defines where a variable can be accessed within a program and how its name is resolved. Python employs lexical (static) scoping, where the structure of the code determines a variable's visibility, following the LEGB rule (Local, Enclosing, Global, Built-in)
---

Variable scope determines where in a program a variable can be accessed and how its name is resolved at runtime. Different programming languages implement scoping differently, but many modern languages (including Python) use **lexical (static) scoping**, meaning the structure of the code (blocks, functions, classes) determines the variable’s visibility and lifetime.

### General Concept of Scope

- **Lexical (Static) Scoping:**  
    In lexical scoping, a variable’s scope is determined by the physical layout of the code. Where a variable is defined in the source code (e.g., inside a particular function or block) dictates which parts of the code can see and use that variable. This is decided at compile time by examining the code’s structure.
    
- **Dynamic Scoping (Less Common):**  
    In dynamic scoping, a variable’s scope is determined by the call stack at runtime, not by the code structure. This approach is much rarer in modern mainstream languages.
    

### Variable Scope in Python

Python uses lexical scoping, guided by what’s known as the **LEGB rule**, which dictates the order in which Python resolves variable names:

1. **L – Local:**  
    The innermost scope, typically within the current function or code block. Variables defined inside a function or comprehension are considered local to that block.
    
2. **E – Enclosing (Nonlocal) Scopes:**  
    If the variable is not found locally, Python looks to the next outer function’s scope. This applies when you have nested functions. The inner function can access variables from the enclosing function’s scope.
    
3. **G – Global:**  
    If the variable isn’t found in any local or enclosing scope, Python checks the module-level namespace, often referred to as the global scope for that file.
    
4. **B – Built-in:**  
    Finally, if the name isn’t found in local, enclosing, or global scopes, Python looks at the built-in scope, which contains names like `len`, `range`, and other built-in functions.
    

**Example:**

```python
x = "global_x"

def outer():
    x = "outer_x"
    def inner():
        x = "inner_x"
        print(x)         # Prints "inner_x"
    inner()
    print(x)             # Prints "outer_x"

outer()
print(x)                 # Prints "global_x"

```


In this example:

- Inside `inner()`, the name `x` refers to `inner_x` (local scope).
- Back in `outer()` after `inner()` is called, `x` refers to `outer_x` (enclosing scope).
- Outside of both functions, `x` refers to `global_x` (global scope).

### How Scopes are Implemented

1. **Symbol Tables and Namespaces:**  
    When Python code is compiled into bytecode, the compiler determines which variables are local, which are global, and whether they can be resolved from enclosing scopes. This information is stored in symbol tables. Each scope (function, class, module) maintains its own namespace mapping variable names to objects.
    
2. **Local Variables in Functions:**  
    Local variables are often stored in fast, array-like structures optimized for quick access. When the Python Virtual Machine executes `LOAD_FAST` bytecode instructions, it retrieves variables from these local arrays instead of dictionaries, improving performance.
    
3. **Nonlocal and Global Declarations:**
    
    - If you want to modify a variable defined in an enclosing scope (not local and not global), you can use the `nonlocal` keyword.
    - To explicitly modify global variables (those in the module’s top-level namespace) from within a function, you use the `global` keyword. Without these keywords, attempts to assign to such variables create new local variables instead of updating the outer ones.
4. **Built-ins:** If a variable isn’t found anywhere else, the interpreter checks the built-in namespace, which is loaded when the Python interpreter starts. These names are always available unless shadowed by local/global definitions.
    

### Summary

- Variable scope is determined lexically, based on code structure.
- Python resolves names following the LEGB order: Local, Enclosing, Global, Built-in.
- Scopes are managed using symbol tables and namespaces, determined at compile time and enforced at runtime by the virtual machine.
- Keywords `global` and `nonlocal` let you modify variables in outer scopes rather than creating new locals.

This approach ensures that variable access is predictable, stable, and tied to the structure of your code rather than the path the program took at runtime.-  