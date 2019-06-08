---
title: "Elixir-Basic [01]"
date: 2019-06-08 23:43:00 +0900
categories: Study Programming
toc: true
toc_label: "Table Of Contents"
---

## Introduction
In these days, I have contemplated about what's my most suitable sublanguage for me?
After the few-years experience, I got to know what I enjoy and where am I good at.
That would be kind of back-end or server or network thingies.
My main language is the python, and it won't be changed at all. 
However, sad to say, the python has poor performance and some definite limitation.
So I had to choose another back-end language as my sublanguage.
After careful consideration, I had chosen Golang, but Golang also had given me some disappointment, so I hope Elixir would be my sublanguage going with me.

> This is my personal learning note, but credit all to [elixirschool](https://elixirschool.com/en).

## Getting Started

### Installing Elixir
Elixir supports various environments even like Raspberry Pi or Docker, of course, Mac, *Nix, Windows, etc...
Detailed instructions for installation can be checked out [Installing Elixir guide](https://elixir-lang.org/install.html).
After the installation without trouble, you would see as follows:  
~~~Elixir
% elixir -v
Erlang/OTP 21.1 [erts-10.1] [source] [64-bit] [smp:4:4] [ds:4:4:10] [async-threads:10] [hipe] [kernel-poll:false] [dtrace]

Elixir 1.8
~~~

### Trying Interactive Mode
Elixir has an interactive shell like an REPL. To try it out, type `iex` in the shell.
~~~Elixir
Erlang/OTP 21.1 [erts-10.1] [source] [64-bit] [smp:4:4] [ds:4:4:10] [async-threads:10] [hipe] [kernel-poll:false] [dtrace]

Interactive Elixir (1.8) - press Ctrl+C to exit (type h() ENTER for help)
iex>
~~~

Take a look around in the shell by few expressions.

~~~Elixir
iex> 2+3
5
iex> 2+3 == 5
true
iex> String.length("The quick brown fox jumps over the lazy dog")
43
~~~

## Basic Data Types

### Integers
~~~Elixir
iex> 255
255
iex> 0b0110
6
iex> 0o644
420
iex> 0x1F
31
~~~
Binary, Octal, Hexadecimal prefixes are already built-in.

### Floats
~~~Elixir
iex> 3.14
3.14
iex> .14
** (SyntaxError) iex:2: syntax error before: '.'
iex> 1.0e-10
1.0e-10
~~~
Unlike some other languages like python, floating point numbers in Elixir need a decimal in front of point. they have 64-bit precision and support `e` notation.

### Booleans
~~~Elixir
iex> true
true
iex> false
false
~~~
Elixir has `true` and `false` for booleans; everything is handled as true except for `false` or `nil`

### Atoms
~~~ Elixir
iex> :foo
:foo
iex> :foo == :bar
false
~~~
An atom is a constant whose name is its value itself. 

~~~ Elixir
iex> true |> is_atom
true
iex> :true |> is_boolean
true
iex> :true === true
true
~~~
A boolean is actually just an atom. `true` and `false` are `:true` and `:false` respectively.

~~~ elixir
iex> is_atom(MyApp.MyModule)
true
~~~
Names of modules in elixir are also atoms. `MyApp.MyModule` is a valid atom, even if no such module has been declared yet.
