# 常见排序算法 javascript 实现

源于最近一篇比较火的文章，发现自己已经忘记快速排序是怎么实现的，现在重新复习一下这几种经典的算法，在实现之前我们先利用代码随机生成我们的测试数据

```javascript
// 生成样本数组
const range = []
for (let i = 0; i < 1000; i++) {
  range.push(i)
}
// 洗牌抽取100个作为我们这次的数据
const shuffle = len => {
  for (let i = 0; i < len; i++) {
    const ri = Math.floor(Math.random() * 1000)
    ;[range[i], range[ri]] = [range[ri], range[i]]
  }
  return range.slice(0, len)
}
shuffle(100)
```

## 归并排序

归并排序是一种分治算法，其思想是将**原始数组**切分成**较小的数组**，直到每个小数组只有一个位置，接着将小数组归并成较大的数组。由于是分治法，归并排序也是递归的：

```javascript
this.mergeSort = function() {
  array = mergeSortRec(array)
}
```

我们事先声明 mergeSort 方法供随后调用，而 mergeSort 方法将会调用 mergeSortRec，该函数是一个递归函数。

```javascript
var mergeSortRec = function(array) {
  var length = array.length
  if (length == 1) {
    return array
  }
  var mid = Math.floor(length / 2),
    left = array.slice(0, mid),
    right = array.slice(mid, length)
  return merge(mergeSortRec(left), mergeSortRec(right))
}

var merge = function(left, right) {
  var result = [],
    il = 0,
    ir = 0
  while (il < left.length && ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left[il++])
    } else {
      result.push(right[ir++])
    }
  }
  while (il < left.length) {
    result.push(left[il++])
  }
  while (ir < right.length) {
    result.push(right[ir++])
  }
  return result
}
```

## 快速排序快速排序步骤

1.  首先，从数组中选择中间一项作为主元
2.  创建两个指针，左边一个指向数组第一个项，右边一个指向数组最后一项。移动左指针直到我们找到一个比主元打得元素，接着移动右指针直到找到一个比主元小的元素然后交换它们，重复这个过程，直到左指针超过了右指针。这个过程将比主元小的值都排在主元之前，而比主元大的值都排在主元之后。这一步叫做划分操作
3.  接着，算法对划分后的小数组（较主元小的值组成的子数组，以及较主元大的值组成的子数组）重复之前的两个步骤，直至数组已经完全排序

```javascript
this.quickSort = function() {
  quick(array, 0, array.length - 1)
}
var quick = function(array, left, right) {
  var index
  if (array.length > 1) {
    index = partition(array, left, right)
    if (left < index - 1) {
      quick(array, left, index - 1)
    }
    if (index < right) {
      quick(array, index, right)
    }
  }
}
//划分过程
var partition = function(array, left, right) {
  var pivot = array[Math.floor((right + left) / 2)],
    i = left,
    j = right
  while (i <= j) {
    while (array[i] < pivot) {
      i++
    }
    while (array[j] > pivot) {
      j--
    }
    if (i <= j) {
      swapQuickStort(array, i, j)
      i++
      j--
    }
  }
  return i
}
//swap函数
var swapQuickStort = function(array, index1, index2) {
  var aux = array[index1]
  array[index1] = array[index2]
  array[index2] = aux
}
```
