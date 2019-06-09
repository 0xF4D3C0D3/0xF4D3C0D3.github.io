---
title: "GFG Searching and Sorting [01]"
date: 2019-06-09 12:21:00 +0900
categories: Study Algorithm
toc: true
toc_label: "Table Of Contents"
---

## Introduction
I wanna be a good developer, not just code monkey. So I decided that I'm going to learn more basic.
This is about the first chapter of "Searching and Sorting". All pseudo code will be written in Python and it should work.

> This is my personal learning note, but credit all to [geeksforgeeks](https://www.geeksforgeeks.org/). 

## Linear Search

### Approach
1. Start from the leftmost of an array, compare target x with each element in the array.
2-1. If x matches with an element, return the index.
2-2. If x matched with none of elements, return `sentinel value` like -1 or 0.

### Code
~~~ python
def search_linear(iterable, x):
    """
    search_linear gets an iterable of positive integers as fisrt argument and
    the target x as second argument.
    Returns matched index or -1 when it doesn't mactch with anything.
    """
    
    for idx, elem in enumerate(iterable):
        if elem == x:
            return idx
    return -1
~~~

*Driver code*
~~~ python
cases = [
    ([2, 3, 4, 10, 40], 40),
    ([6, 1, 3, 6, 133], 6),
    ([1000, 43, 5, 6, 4, 1, 2, 4], 100), 
    ([10, 20, 30, 25, 15, 5], 25),
    ]

for iterable, x in cases:
    print(f'search_linear({iterable}, {x}) ->', search_linear(iterable, x))

"""
search_linear([2, 3, 4, 10, 40], 40) -> 4
search_linear([6, 1, 3, 6, 133], 6) -> 0
search_linear([1000, 43, 5, 6, 4, 1, 2, 4], 100) -> -1
search_linear([10, 20, 30, 25, 15, 5], 25) -> 3
"""
~~~

### Note
Time complexity $\to$ `O(n)`. This is significantly inefficient than other algorithms.

## Binary Search
Binary search divides an given sorted array into two halves.
Starting from the middle, if it matches the target x then return its index,
else if it is lower than the target x then repeat this process in the lower half,
otherwise in the upper half.
If there are no matched element till the length of the half is 1, return `sentinel value` like -1 or 0.

### Approach
0. Assume that the given array is already sorted. (sorting is not responsibility of seaching)
1. Start from the middle, compare it with the target x.
2-1. If it matches, return the index of the middle.
2-2. If it doesn't and is lower, repeat (1) in the lower half.
2-3. If it doesn't and is upper, repeat (1) in the upper half.
3. Until the length of the half is 1, if it doesn't match with anything then return `sentinel value` like -1 or 0.

### Code
~~~ python
def search_binary(iterable, x):
    """
    search_binary gets an iterable of positive integers as fisrt argument and
    the target x as second argument. 
    return matched index or -1 when it doesn't match with anything.
    """
    len_ = len(iterable)
    
    # if it won't be divided anymore, compare it with the target x
    # when it matches, return 0. Otherwise, return -1
    if len_ == 1:
        if iterable[0] == x:
            return 0
        else:
            return -1

    middle = iterable[len_ // 2]
    if middle == x:  # if it matches with the middle, return the index of the middle
        return len_ // 2
    elif x < middle:  # or if it is lower than the target x, call this function with the lower half recursively.
        return search_binary(iterable[:len_ // 2], x)
    else:  # else call this function with the upper half recursively and 
           # if its result is lower than 0, return -1. Otherwise return 1 + index of middle + its result
        upper_idx = search_binary(iterable[(len_ // 2) + 1:], x)
        if upper_idx < 0:
            return -1
        else:
            return 1 + (len_ // 2) + upper_idx
            
"""
search_binary([2, 3, 4, 10, 40], 40) -> 4
search_binary([1, 3, 6, 6, 133], 6) -> 2
search_binary([1, 2, 4, 4, 5, 6, 43, 1000], 100) -> -1
search_binary([5, 10, 15, 20, 25, 30], 25) -> 4
"""
~~~
Simple interface, but complex implementation.

~~~python
def search_binary(iterable, x, l=None, r=None):
    """
    search_binary gets an iterable of positive integers as fisrt argument and
    the target x as second argument. 
    return matched index or -1 when it doesn't match with anything.
    """
    l = l or 0  
    r = r or len(iterable) - 1
    
    if l <= r:
        mid = (l+r)//2
        if iterable[mid] == x:
            return mid
        elif iterable[mid] > x:
            return search_binary(iterable, x, l, mid-1)
        else:
            return search_binary(iterable, x, mid+1, r)
    else:
        return -1
~~~
Somewhat complex interface, but simple implementation.

### Note
Time complexity $\to$ `T(n) = T(n/2) + c` $\to$ $\Theta(Log(n))$.
Those codes only work in ascending sorted array.

## Jump Search
The key idea of the jump search is a block. It starts from the leftmost of **sorted** array but unlike linear search,
not one by one. Instead, block by block. If the first element of the current block is upper than the target x then
perform a linear search in the previous block.

> Note: What is the optimal block size?
In the worst case, we have to access n/m blocks. So maximum count will be n/m + m.
Then let x = n/m + m and n is fixed as the length of the list. To find the minimum, we find the m that makes slope zero.
$$y = \frac{n}{m} + m$$
$$=\frac{n + m^2}{m}$$
$$y'= \frac{2m^2 - n - m^2}{m^2}\\ \because \Big(\frac{f(x)}{g(x)}\Big)'\to \frac{f'(x)g(x) - f(x)g'(x)}{(g(x))^2}$$
$$=\frac{m^2-n}{m^2}$$
$\therefore y' = 0$ when $m = \sqrt{n}$
