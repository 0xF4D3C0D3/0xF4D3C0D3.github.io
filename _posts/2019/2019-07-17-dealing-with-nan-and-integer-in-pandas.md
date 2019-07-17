---
title: "Dealing with NaN and integer in pandas"
date: 2019-07-17 21:00:00 +0900
categories: Doc Reference
---

Sometimes you have to deal with NaN and integer, so do I. In my case, I was requested to print large Dataframe that has NaN but also as an
integer type. If you came from before 0.24, it would be quite a challenge already you know. You have a several options. First convert the 
column into string type or object. However, it's just trickery and you can't manipulate it as numeric no more. Or second, rounding it with 
0 precision. But Dataframe always prints trailing ".0" when it's a float type. So if you've searched deeper, you would have tried ".style".
It might have been okay in small Dataframe though... It would have printed *all* rows and your write buffer would been stuck. It wasn't what
you want right?

So here you are! `Nullable Integer Data Type`

TL; DR just read [this](https://pandas.pydata.org/pandas-docs/stable/user_guide/integer_na.html)
