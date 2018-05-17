# 循环遍历DOM树

循环遍历DOM树可以改变其中的位置，其中，通过Push方法可以实现广度遍历

1. 取出根元素
2. callback(root)
3. 将root.children push 到 array 里面 [child1,child2]
4. 重复循环，取出child1
5. callback(child1)
6. 将child1.children push 到 array 里面 [child2,child1(1),child1(2)]

循环遍历DOM树可以改变其中的位置，其中，通过Unshift方法可以实现深度遍历

1. 取出根元素
2. callback(root)
3. 将root.children unshift 到 array 里面 [child1,child2]
4. 重复循环，取出child1
5. callback(child1)
6. 将 child1.children unshift 到 array 里面 [child1(1),child1(2),child2]

循环遍历DOM树可以改变其中的位置，其中，通过Pop方法可以实现深度遍历(反向)

1. 取出根元素
2. callback(root)
3. 将root.children push 到 array 里面 [child1,child2]
4. 重复循环，取出child2
5. callback(child2)
6. 将 child2.children push 到 array 里面 [child1,child2(1),child2(2)]

循环遍历DOM树可以改变其中的位置，其中，通过Pop方法可以实现广度遍历(反向)

1. 取出根元素
2. callback(root)
3. 将root.children unshift 到 array 里面 [child1,child2]
4. 重复循环，取出child2
5. callback(child2)
6. 将 child2.children shift 到 array 里面 [child2(1),child2(2),child1]

查找DOM

1. 判断情况
    1. 没有val传进去，执行默认遍历
    2. 有val传进去，但是val为空或不存在的val，报错
    3. 有val传进去，执行查找