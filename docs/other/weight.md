---
title: 体重
date: 2023-09-08 12:34:56
category:
  - 其他
order: 3
---

# 体重

<!-- more -->

::: echarts

```js
const response = await fetch("https://drive.zhuwenhao.me/d/weight.json");
const weightList = await response.json();
const xAxisData = weightList.map((weight) => weight.date).reverse();
const seriesDate = weightList.map((weight) => weight.weight).reverse();

const option = {
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: xAxisData,
  },
  yAxis: {
    type: "value",
    max: (value) => Math.ceil(value.max),
    min: (value) => Math.floor(value.min - 1),
    minInterval: 1,
  },
  dataZoom: [
    {
      type: "inside",
      start: 0,
      end: 100,
      minSpan: 25,
    },
    {
      start: 0,
      end: 100,
      minSpan: 25,
      brushSelect: false,
    },
  ],
  series: [
    {
      data: seriesDate,
      type: "line",
      smooth: true,
      showSymbol: false,
      markLine: {
        silent: true,
        symbol: ["none", "none"],
        data: [
          {
            yAxis: 64,
          },
        ],
      },
    },
  ],
};
```

:::
