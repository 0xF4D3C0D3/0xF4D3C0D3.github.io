---
title: "Dealing with NaN and integer in pandas"
date: 2019-07-17 21:00:00 +0900
categories: Doc Reference
---

Sometimes you have to deal with either NaN and integer, so do I. In my case, I was requested to print large Dataframe that has NaN but also as an
integer type. If you came from before 0.24, it would be quite a challenge already you know. You have a several options. First convert the 
column into string type or object. However, it's just trickery and you can't manipulate it as numeric no more. Or second, rounding it with 
0 precision. But Dataframe always prints trailing ".0" when it's a float type. So if you've searched deeper, you would have tried ".style".
It might have been okay in small Dataframe though... It would have printed *all* rows and your write buffer would been stuck. It wasn't what you want right?

So here `Nullable integer data type` comes into play! 
this make use of new feature `pandas.arrays.IntegerArray` in the 0.24 version pandas.

I bring some of examples from [official page](https://pandas.pydata.org/pandas-docs/stable/user_guide/integer_na.html)

```
In [1]: arr = pd.array([1, 2, np.nan], dtype=pd.Int64Dtype())

In [2]: arr
Out[2]: 
<IntegerArray>
[1, 2, NaN]
Length: 3, dtype: Int64
```

or

```
In [3]: pd.array([1, 2, np.nan], dtype="Int64")
Out[3]: 
<IntegerArray>
[1, 2, NaN]
Length: 3, dtype: Int64
```
** Note that capital I **

```
In [5]: s = pd.Series([1, 2, np.nan], dtype="Int64")

In [6]: s
Out[6]: 
0      1
1      2
2    NaN
dtype: Int64
```

so now you can represents both integer and NaN in a column of a DataFrame.

```
In [13]: df = pd.DataFrame({'A': s, 'B': [1, 1, 3], 'C': list('aab')})

In [14]: df
Out[14]: 
     A  B  C
0    1  1  a
1    2  1  a
2  NaN  3  b

In [15]: df.dtypes
Out[15]: 
A     Int64
B     int64
C    object
dtype: object
```
