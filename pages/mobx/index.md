---
title: Mobx 介绍
keyword: Mobx Mobx源码
---

# 介绍

Mobx 是一个运用函数式响应编程、简单可拓展的状态管理工具。

![MobX 单向流](http://melon.melon95.cn/images/2022/11/12/zh.flow-4477044f6de6af9bb5de7f8b40f10d93.png)

Mobx 区分了应用程序中的一下三个概念：

1. State(状态)：驱动应用程序的数据
2. Action(动作)：任意可以改变 _State_ 的代码
3. Derivation(派生)：任何来源是 _State_ 并且不需要进一步交互的东西
   1. Computed：总是可以通过纯函数从当前的 _State_ 中派生，比如：`todoList` 中未完成的数量
   2. Reaction：当 _State_ 改变时需要自动运行的副作用，就像 React 中的 _effect_

**基本原则**

Mobx 使用单向数据流，利用 _Action_ 改变 _State_ ，进而更新所有受影响的视图

![Action, State, View](http://melon.melon95.cn/images/2022/11/12/action-state-view-40fb3cb7f87c710a40b8ed23435e1a68.png)

1. 所有的 _Derivation_ 将在 _State_ 改变时**自动且原子化地更新**。因此不可能观察中间值
2. 所有的 _Derivation_ 默认将会**同步**更新，这意味着 _Action_ 可以在 _State_ 改变 之后安全的直接获得 _Computed_ 值
3. _Computed_ 的更新是**惰性**的，任何 _Computed_ 在需要他们的副作用发生之前都是不激活的
4. 所有的 _Computed_ 都应是**纯函数**,他们不应该修改 _State_
