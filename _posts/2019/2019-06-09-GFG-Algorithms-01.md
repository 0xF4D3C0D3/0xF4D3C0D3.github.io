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
1\. Start from the leftmost of an array, compare target x with each element in the array.  
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
0\. Assume that the given array is already sorted. (sorting is not responsibility of seaching)  
1\. Start from the middle, compare it with the target x.  
2-1. If it matches, return the index of the middle.  
2-2. If it doesn't and is lower, repeat (1) in the lower half.  
2-3. If it doesn't and is upper, repeat (1) in the upper half.  
3\. Until the length of the half is 1, if it doesn't match with anything then return `sentinel value` like -1 or 0.  

### Code
~~~ python
def search_binary(iterable, x):
    """
    search_binary gets an **sorted** iterable of positive integers as fisrt argument
    and the target x as second argument. 
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
    search_binary gets an **sorted** iterable of positive integers as fisrt argument
    and the target x as second argument. 
    return matched index or -1 when it doesn't match with anything.
    """
    if l is None:
        l = 0
    if r is None:
        r = len(iterable) - 1
    
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
$$y'= \frac{2m^2 - n - m^2}{m^2} \because \Big(\frac{f(x)}{g(x)}\Big)'\to \frac{f'(x)g(x) - f(x)g'(x)}{(g(x))^2}$$  
$$=\frac{m^2-n}{m^2}$$  
$\therefore y' = 0$ when $m = \sqrt{n}$  

### Approach
0\. Assume that the given array is already sorted. (sorting is not responsibility of seaching)  
1\. Choose block size as $\sqrt{n}$. the n is the length of the iterable.  
2\. Traverse the iterables from the letfmost element by *block* size.  
3\. If it passed the target value, then perform a linear search from the previous block.  
4\. If nothing matches, return -1  

### Code
~~~ python
def search_jump(iterable, x):
    """
    search_jump gets an **sorted** iterable of positive integers as fisrt argument
    and the target x as second argument.
    Returns matched index or -1 when it doesn't mactch with anything.
    """

    # find the block size and initialize the index to the step
    len_ = len(iterable)
    step = int(len_ ** 0.5)
    idx = step

    # first compare block by block
    while idx < len_:
        if iterable[idx] > x:
            break
        idx += step

    # then compare one by one
    idx -= step
    while idx < len_:
        if iterable[idx] == x:
            return idx
        idx += 1

    # if nothing matches, return -1
    return -1
~~~

### Note
It only works with a sorted iterable. The time complexity is $O(\sqrt{n})$ which is between $O(n)$ and $O(Logn)$.
So why does the jump search used in spite of binary search($O(Logn)$)? The jump search is faster when the target x is small.
To be extreme, the binary search needs $Logn$ steps. But the jump search can do it in fewer steps.

## Interpolation Search
Linear search is $O(n)$, jump search is $O(\sqrt{n})$, binary search is $O(Logn)$, and interpolation search is $O(Log Log n)$ or in worst case, $O(n)$
How can the interpolation search run in $O(Log Log n)$ time? Well, the interpolation search also only works in the sorted iterable, and in the uniformly distributed iterable. Why is that? Unlike the binary search,
the interpolation search not always start from the middle. Instead, it choose according to the difference between the target value and pivoted value. Let's look over the fomular below.

$$pos = lo + \frac{x-arr[lo]}{arr[hi]-arr[lo]} (hi-lo)$$

arr $\to$ array we want to search  
x $\to$ value we want to find  
lo $\to$ starting index  
hi $\to$ ending index  

### Approach
0\. Assume that the given array is already sorted. (sorting is not responsibility of seaching)  
1\. Find the next pos to prove by using above formula  
2\. Compare it with the target value x  
3-1. If it matches, return its index  
3-2. If it doesn't match, perform (1)~(2) recursively.  
4\. If nothing matches until lo is lower than hi and x is between arr[lo] and arr[hi]  

### Code
~~~ python
def search_interpolate(iterable, x):
    """
    search_interpolate gets an **sorted** and *uniformly distributed* iterable
    of positive integers as fisrt argument and the target x as second argument. 
    return matched index or -1 when it doesn't match with anything.
    """
    lo = 0
    hi = len(iterable)-1
    
    while lo <= hi and iterable[lo] <= x <= iterable[hi]:
        pos = int(lo + (hi-lo) * ((x - iterable[lo])/(iterable[hi] - iterable[lo])))
        
        if lo == hi:
            if iterable[pos] == x:
                return pos
            else:
                return -1
        
        if iterable[pos] == x:
            return pos
        elif iterable[pos] < x:
            lo = pos + 1
        else:
            hi = pos - 1
        
    return -1
~~~

### Benchmark
To check that is it really faster than the binary search in uniformly distributed and sorted iterable, I have benchmarked them. Below code is for benchmarking:

~~~ python
import random
import pandas as pd

uni = lambda i, j: sorted([int(random.uniform(1, 10**i)) for _ in range(10**j)])
uni.__name__ = '_uni'
exp = lambda i, j: sorted([int(((10**j) ** (1/(10**j))) ** k) for k in range(10**j)])
exp.__name__ = '_exp'

tab = {}
for search in [search_binary, search_interpolate]:
    for distribution in [uni, exp]:
        name = search.__name__ + distribution.__name__
        tab[name] = {}
        for i in range(2, 6):
            tab[name][10**i] = {}
            for j in range(2, 6):
                arr = distribution(i, j)
                target = random.sample(arr, 1)[0]
                tab[name][10**i][10**j] = search(arr, target)

for t in tab:
    print(t)
    df = pd.DataFrame(tab[t])
    df.index.name = 'count'
    df.columns.name = 'range'
    print(df)
    print()
~~~

And the benchmark. the values in the cell represent the number of comparisons.
```
search_binary_uni
range   100     1000    10000   100000
count                                 
100          5       3       4       6
1000         3       4       8       8
10000        5       8      10      12
100000       5       7      12      14

search_interpolate_uni
range   100     1000    10000   100000
count                                 
100          1       1       1       4
1000         2       5       3       1
10000        1       2       3       4
100000       1       2       2       5

search_binary_exp
range   100     1000    10000   100000
count                                 
100          5       3       2       1
1000         5       3       3       7
10000        4       8       5      13
100000      14       7      15      15

search_interpolate_exp
range   100     1000    10000   100000
count                                 
100          1      12       7       7
1000         1      14      98       1
10000       18       1     427      97
100000     388    6015    1838     323
```

Did you see? In the uniformly distributed, the interpolation search is somewhat faster!

### Note
As you can see, in the worst case, its time complexity will be $O(n)$ (in exponential distributed).

## Exponential Search
Despite its name, this search runs in $O(Logn)$ time. The name comes from how it searches.

### Approach
0\. Assume that the given array is already sorted.  
1\. Let the `end_index` is 1.  
2\. Check the target value x in iterable[:`end_index`].  
3-1. If it's in the range, do the binary search in the iterable[`end_index`//2:`end_index`]  
3-2. If it's not in the range, double `end_index` and start to repeat from (2)  

### Code
~~~ python
def search_exponential(iterable, x):
    """
    search_exponential gets an **sorted** iterable of positive integers as fisrt argument
    and the target x as second argument. 
    return matched index or -1 when it doesn't match with anything.
    """
    if iterable[0] == x:
        return 0

    len_ = len(iterable)
    end_idx = 1
    while end_idx < len_ and iterable[end_idx] <= x:
        end_idx *= 2

    return search_binary(iterable, x, end_idx // 2, min(end_idx, len_-1))
    
"""
search_exponential([2, 3, 4, 10, 40], 40) -> 4
search_exponential([1, 3, 6, 6, 133], 6) -> 3
search_exponential([1, 2, 4, 4, 5, 6, 43, 1000], 100) -> -1
search_exponential([5, 10, 15, 20, 25, 30], 25) -> 4
>>> search_exponential([2, 2, 2, 4, 4, 5, 6, 6, 6, 7, 7, 8, 12, 16, 19, 19, 19, 20, 20, 21, 24, 26, 27, 27, 28, 29, 31, 32, 32, 34, 36, 36, 37, 37, 38, 39, 41, 43, 44, 44, 46, 47, 47, 48, 49, 50, 50, 50, 51, 52, 53, 54, 55, 56, 56, 60, 61, 63, 63, 66, 66, 68, 69, 70, 71, 71, 73, 77, 78, 78, 79, 79, 80, 80, 82, 82, 83, 83, 83, 84, 85, 85, 86, 86, 88, 88, 90, 91, 93, 93, 93, 93, 94, 94, 94, 95, 99, 100, 100, 100], 4)
4
>>> search_exponential([2, 2, 2, 4, 4, 5, 6, 6, 6, 7, 7, 8, 12, 16, 19, 19, 19, 20, 20, 21, 24, 26, 27, 27, 28, 29, 31, 32, 32, 34, 36, 36, 37, 37, 38, 39, 41, 43, 44, 44, 46, 47, 47, 48, 49, 50, 50, 50, 51, 52, 53, 54, 55, 56, 56, 60, 61, 63, 63, 66, 66, 68, 69, 70, 71, 71, 73, 77, 78, 78, 79, 79, 80, 80, 82, 82, 83, 83, 83, 84, 85, 85, 86, 86, 88, 88, 90, 91, 93, 93, 93, 93, 94, 94, 94, 95, 99, 100, 100, 100], 50)
45
>>> search_exponential([2, 2, 2, 4, 4, 5, 6, 6, 6, 7, 7, 8, 12, 16, 19, 19, 19, 20, 20, 21, 24, 26, 27, 27, 28, 29, 31, 32, 32, 34, 36, 36, 37, 37, 38, 39, 41, 43, 44, 44, 46, 47, 47, 48, 49, 50, 50, 50, 51, 52, 53, 54, 55, 56, 56, 60, 61, 63, 63, 66, 66, 68, 69, 70, 71, 71, 73, 77, 78, 78, 79, 79, 80, 80, 82, 82, 83, 83, 83, 84, 85, 85, 86, 86, 88, 88, 90, 91, 93, 93, 93, 93, 94, 94, 94, 95, 99, 100, 100, 100], 100)
97
"""
~~~

### Note
The time complexity is $O(Log n)$. It's particularly useful when the dataset is unbounded.
And it's also better than the binary search even in the bounded dataset, or when the target value is closer to the first element.

## Ternary Search
Unlike the binary search has $O(Log_2n)$ time complexity, The ternary search has $O(Log_3n)$.

Next is the worst case of the binary search: $T(n) = T(n/2) + 2, T(1) = 1$  
And this is the worst case of the ternary search: $T(n) = T(n/3) + 4, T(1) = 1$  

### Approach
This approach is the same as the binary search, except for dividing three parts, not two.

### Code
~~~ python
def search_ternary(iterable, x, l=None, r=None):
    """
    search_ternary gets an **sorted** iterable of positive integers as fisrt argument
    and the target x as second argument. 
    return matched index or -1 when it doesn't match with anything.
    """
    if l is None:
        l = 0
    if r is None:
        r = len(iterable) - 1
    
    if l <= r:
        mid1 = l + (r-l)//3
        mid2 = mid1 + (r-l)//3

        
        if iterable[mid1] == x:
            return mid1
        elif iterable[mid2] == x:
            return mid2
        elif iterable[mid1] > x:
            return search_ternary(iterable, x, l, mid1-1)
        elif iterable[mid2] < x:
            return search_ternary(iterable, x, mid2+1, r)
        else:
            return search_ternary(iterable, x, mid1+1, mid2-1)
    return -1
    
"""
search_ternary([2, 3, 4, 10, 40], 40) -> 4
search_ternary([1, 3, 6, 6, 133], 6) -> 2
search_ternary([1, 2, 4, 4, 5, 6, 43, 1000], 100) -> -1
search_ternary([5, 10, 15, 20, 25, 30], 25) -> 4
"""
~~~
