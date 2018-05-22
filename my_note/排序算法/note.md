# 常见排序算法 javascript 实现

源于最近一篇比较火的文章，发现自己已经忘记快速排序是怎么实现的，现在重新复习一下这几种算法，在实现之前我们先利用代码随机生成我们的测试数据

```javascript
// 生成样本数组
const range = []
for (let i = 0; i < 100; i++) {
  range.push(i)
}
// 洗牌抽取20个作为我们这次的数据
const shuffle = len => {
  for (let i = 0; i < len; i++) {
    const ri = Math.floor(Math.random() * 100)
    ;[range[i], range[ri]] = [range[ri], range[i]]
  }
  return range.slice(0, len)
}
let data = shuffle(20)
```

## 冒泡排序

冒泡排序的原理是比较相邻两个元素，如果符合条件，则调换两个元素的位置；遍历完所有元素一轮，则会找到数据中的最大（或最小，取决于定义的条件）；然后进行第二轮比较，以此类推，直至完全排序完成，具体实现为：

```javascript
let len = 20 // 数组长度
// 第一轮比较找到最大值
for (let i = 0; i < len - 2; i++) {
  if (data[i] > data[i + 1]) {
    ;[data[i], data[i + 1]] = [data[i + 1], data[i]]
  }
}
// 因为每一轮我们找出一个值，所以每一轮的遍历元素数目减一(n:每次遍历的元素数目，i:索引)
for (let n = len; n > 1; n--) {
  for (let i = 0; i < n - 2; i++) {
    if (data[i] > data[i + 1]) {
      ;[data[i], data[i + 1]] = [data[i + 1], data[i]]
    }
  }
}
```

## 选择排序

选择排序和冒泡排序类似，先遍历数据，从数组中找到最小（或最大）的值；插入到数组头部；然后遍历剩下的数据

```js
let len = 20
let minIndex = 0
for (let n = 0; n < len; n++) {
  for (let i = len - 1; i >= n; i--) {
    if (data[minIndex] > data[i]) {
      minIndex = i
    }
  }
  ;[data[minIndex], data[n]] = [data[n], data[minIndex]]
}
```

## 快速排序快速排序步骤

1.  首先，从数组中选择中间一项作为主元
2.  创建两个指针，左边一个指向数组第一个项，右边一个指向数组最后一项。移动左指针直到我们找到一个比主元大的元素，接着移动右指针直到找到一个比主元小的元素然后交换它们，重复这个过程，直到左指针超过了右指针。这个过程将比主元小的值都排在主元之前，而比主元大的值都排在主元之后。这一步叫做划分操作
3.  接着，算法对划分后的小数组（较主元小的值组成的子数组，以及较主元大的值组成的子数组）重复之前的两个步骤，直至数组已经完全排序

```javascript
// 0优化,但是思路是对的
let sort = arr => {
  const len = arr.length
  if (len <= 1) {
    return arr
  } else {
    const m = arr[Math.floor(len / 2)]
    const leftDist = arr.filter(item => item < m)
    const rightDist = arr.filter(item => item > m)
    const equalDist = arr.filter(item => item === m)
    return [].concat(sort(leftDist), equalDist, sort(rightDist))
  }
}
```
