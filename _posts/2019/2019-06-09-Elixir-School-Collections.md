---
title: "Elixir-Collections [02]"
date: 2019-06-09 01:22:00 +0900
categories: Study Programming
toc: true
toc_label: "Table Of Contents"
---

## Introduction
At the previous chapter, we've looked over basics in Elixir.
In this post, we'll see collections in Elixir &mdash; *Lists*, *tuples*, *keyword lists*, and *maps*.

> This is my personal learning note, but credit all to [elixirschool](https://elixirschool.com/en).

## Lists
~~~ elixir
iex> [3.14, :pie, "Apple"]
[3.14, :pie, "Apple"]
~~~
Lists in Elixir can have various types and non-unique values.

~~~ elixir
iex> list = [3.14, :pie, "Apple"]
[3.14, :pie, "Apple"]
# Prepending (fast)
iex> ["π" | list]
["π", 3.14, :pie, "Apple"]
# Appending (slow)
iex> list ++ ["Cherry"]
[3.14, :pie, "Apple", "Cherry"]
~~~
Lists in Elixir are implemented as linked lists so favor prepending over appending for speed.
And also it implies accessing the list length, it'll run in linear time(`O(n)`)

### List Concatenation
~~~ elixir
iex> [1, 2] ++ [3, 4, 1]
[1, 2, 3, 4, 1]
~~~
List concatenation uses `++/2` operator.
> On a side note, the name `++/2` format used above which is a function name in Elixir and Erlang is made up of two components &mdash; the name(here `++`) and *its arity*.
Arity is how many numbers of arguments given function can take.(here two).
The name and arity is combined with a slash.

### List Subtraction
~~~ elixir
iex> ["foo", :bar, 42] -- [42, "bar"]
["foo", :bar]
~~~
List subtraction uses `--/2` operator. It's okay to subtract a missing value.

~~~ elixir
iex> [1,2,2,3,2,3] -- [1,2,3,2]
[2, 3]
~~~
Beware of duplicate values. For every element on the right, the first occurrence of it gets removed from the left.

~~~ elixir
iex> [2] -- [2.0]
[2]
iex> [2.0] -- [2.0]
[]
~~~
Note that list subtraction in Elixir uses strictly comparison `===`.

### Head / Tail
~~~ elixir
iex> hd [3.14, :pie, "Apple"]
3.14
iex> tl [3.14, :pie, "Apple"]
[:pie, "Apple"]
~~~
Elixir provides two useful functions `hd` and `tl` to split the head and the tail of the list.

Or you can also use `pattern matching` and the cons operator `|` to split a list into head and tail:  
~~~ elixir
iex> [head | tail] = [3.14, :pie, "Apple"]
[3.14, :pie, "Apple"]
iex> head
3.14
iex> tail
[:pie, "Apple"]
~~~

## Tuples
While a list is expensive when access, a tuple is cheap due to its elements are contiguous in memory. But because of that, a tuple is expensive to modification. Tuples are defined by curly braces:  
~~~ elixir
iex> {3.14, :pie, "Apple"}
{3.14, :pie, "Apple"}
~~~

Tuple is especially useful when return multiple values as follows:  
~~~ elixir
iex> File.read("path/to/existing/file")
{:ok, "... contents ..."}
iex> File.read("path/to/unknown/file")
{:error, :enoent}
~~~
and the usefulness of this will be more clear when we see `pattern matching`

## Keyword lists
Keyword lists and maps are `the associative collection`. That means a keyword list is just list of two-element tuples whose first element is atom. Therefore a keyword list shares its performance with a list.
~~~ elixir
iex> [foo: "bar", hello: "world"]
[foo: "bar", hello: "world"]
iex> [{:foo, "bar"}, {:hello, "world"}]
[foo: "bar", hello: "world"]
~~~
Note that its characteristics:
- Keys are atoms
- Keys are ordered
- Keys are do not have to be unique

Thanks to its characteristics, it's commonly used to pass options to functions.

## Maps
Maps are "go-to" key-value store. Unlike keyword lists, they can accept any type or unordered as key; they use `%{}` syntax.
~~~ elixir
iex> map = %{:foo => "bar", "hello" => :world}
%{:foo => "bar", "hello" => :world}
iex> map[:foo]
"bar"
iex> map["hello"]
:world
~~~

As of Elixir 1.2, variables are allowed as map keys:
~~~ elixir
iex> key = "hello"
"hello"
iex> %{key => "world"}
%{"hello" => "world"}
~~~

When the inserted value is duplicated, the original is replaced with it.
~~~ elixir
iex> %{:foo => "bar", :foo => "hello world"}
%{foo: "hello world"}
~~~

As you can see in the above, elixir provides a special syntax for maps containing only atom keys.
~~~ elixir
iex> %{foo: "bar", hello: "world"}
%{foo: "bar", hello: "world"}
iex> %{foo: "bar", hello: "world"} == %{:foo => "bar", :hello => "world"}
true
~~~

Moreover provides a special syntax for accessing atom keys too!
~~~ elixir
iex> map = %{foo: "bar", hello: "world"}
%{foo: "bar", hello: "world"}
iex> map.hello
"world"
~~~

At last, one of their interesting properties, they have their own syntax for updating value.
~~~ elixir
iex> map = %{foo: "bar", hello: "world"}
%{foo: "bar", hello: "world"}
iex> %{map | foo: "baz"}
%{foo: "baz", hello: "world"}
~~~
