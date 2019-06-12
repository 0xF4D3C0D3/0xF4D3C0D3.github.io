---
title: "Elixir-Enum [03]"
date: 2019-06-12 09:06:00 +0900
categories: Study Programming
toc: true
toc_label: "Table Of Contents"
---

## Introduction
The `Enum` module provides over 70 functions for working with enumerables that are all the collections in the [previous chapter](
https://0xf4d3c0d3.github.io/study/programming/Elixir-School-Collections/), except for the tuple.

> This is my personal learning note, but credit all to [elixirschool](https://elixirschool.com/en).

In this post, we won't list all over 70 functions, though we could do it. Let's start with a simple example:
~~~ elixir
iex> Enum.__info__(:functions) |> Enum.each(fn({function, arity}) ->
...>   IO.puts "#{function}/#{arity}"
...> end)
all?/1
all?/2
any?/1
any?/2
at/2
at/3
...
~~~

This shows `Enum` module really provides many functions. The reason is that enumeration is core of functional programming.
And also this represents you can treat documentation as a first citizen object. When laziness is needed, use the `Stream` module.

### all?
When using most functions of `Enum`, we pass a function to apply to items in the collections.
~~~ elixir
iex> Enum.all?(["foo", "bar", "hello"], fn(s) -> String.length(s) == 3 end)
false
iex> Enum.all?(["foo", "bar", "hello"], fn(s) -> String.length(s) > 1 end)
true
~~~

At the above example, all items evaluated by the second argument, the function, and should each evaluation all be true then result also true, otherwise false.

### any?
Unlike `all/2` it returns true when at least one of them is evaluated as true.
~~~ elixir
iex> Enum.any?(["foo", "bar", "hello"], fn(s) -> String.length(s) == 5 end)
true
~~~

### chunk_every
If you want to break your collection into smaller groups, you can use `chunk_every/2`.
~~~
iex> Enum.chunk_every([1, 2, 3, 4, 5, 6], 2)
[[1, 2], [3, 4], [5, 6]]
~~~
in addition to this, there is [`chunk_every/4`](https://hexdocs.pm/elixir/Enum.html#chunk_every/4) which is *chunk_every(enumerable, count, step, leftover \\ [])*

### chunk_by
If you need to break a collection up into smaller groups by somthing other than size, you can use `chunk_by/2`.
It takes an enumerable and a function, and whenever the return value by the function to the element changes, it creates a new group.
~~~ elixir
iex> Enum.chunk_by(["one", "two", "three", "four", "five"], fn(x) -> String.length(x) end)
[["one", "two"], ["three"], ["four", "five"]]
iex> Enum.chunk_by(["one", "two", "three", "four", "five", "six"], fn(x) -> String.length(x) end)
[["one", "two"], ["three"], ["four", "five"], ["six"]]
~~~

### map_every
When we need not every element but *nth* items, `map_every/3` is what we need. And it always starts from the first one:
~~~ elixir
# Apply function every three items
iex> Enum.map_every([1, 2, 3, 4, 5, 6, 7, 8], 3, fn x -> x + 1000 end)
[1001, 2, 3, 1004, 5, 6, 1007, 8]
~~~

### each
As not always need the return value, we use `each/2`.
~~~ elixir
iex> Enum.each(["one", "two", "three"], fn(s) -> IO.puts(s) end)
one
two
three
:ok
iex> Enum.each(["one", "two", "three"], fn(s) -> String.length(s) end)
:ok
~~~

### map
Like `each/2` but `map/2` does return the new enumerable.
~~~ elixir
iex> Enum.each(["one", "two", "three"], fn(s) -> String.length(s) end)
[3, 3, 5]
~~~

### min
`min/1` finds the minimum in the collection:
~~~ elixir
iex> Enum.min([5, 3, 0, -1])
-1
~~~

`min/2` does the same but it has a fallback for empty collection.
~~~ elixir
iex> Enum.min([], fn -> :foo end)
:foo
~~~

### max
`max/1` finds the maximum in the collection and `max/2` is to `max/1` what `min/2` is to `min/1`.
~~~ elixir
iex> Enum.max([5, 3, 0, -1])
5
iex> Enum.max([], fn -> :bar end)
:bar
~~~


