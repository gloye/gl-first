在此之前先理解下ES2015中的几种新对象

### Map

Map对象就是简单的键/值映射。其中键和值可以是任意值（对象或者原始值）。

语法 

<pre>
      new Map([interabel])
      // Iterable 可以是一个数组或者其他 iterable 对象，其元素或为键值对，或其为两个元素的数组。 每个键值对都会添加到新的 Map。null 会被当做 undefined。
</pre>

描述

<pre> 
Map 对象会按元素插入的顺序遍历— for...of 循环每次遍历都会返回一个 [key, value] 数组。
</pre>

### Set
集合（Set）对象允许你存储任意类型的唯一值（不能重复），无论它是原始值或者是对象引用。

```javascript

```