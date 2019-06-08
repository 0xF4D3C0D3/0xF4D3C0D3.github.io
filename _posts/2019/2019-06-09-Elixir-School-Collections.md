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

WIP TODO
