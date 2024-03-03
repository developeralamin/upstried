export const getChartData = (
  done: number,
  skipped: number,
  failed: number,
  incomplete: number
) => {
  const chartData = [
    {
      type: 'done',
      value: done,
    },
    {
      type: 'skipped',
      value: skipped,
    },
    {
      type: 'failed',
      value: failed,
    },
    {
      type: 'incomplete',
      value: incomplete,
    },
  ];

  return chartData;
};

export const getChartConfig = (
  chartData: any,
  tipsCompletedPercent: number,
  completedTips?: boolean
) => {
  const config = {
    appendPadding: 10,
    width: 85,
    height: 85,
    data: chartData,
    angleField: 'value',
    colorField: 'type',
    color: completedTips
      ? ['#BBBAC7']
      : ['#3161F1', '#F1B920', '#FC3262', '#EFEFEF'],
    radius: 1,
    innerRadius: 0.8,
    pieStyle: {
      lineWidth: 0,
    },
    label: undefined,
    legend: false,
    interactions: [
      { type: 'tooltip', enable: false },
      {
        type: 'element-selected',
        enable: false,
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: '14px',
          fontWeight: 600,
          color: '#222222',
          fontFamily: 'Montserrat',
        },
        content: `${tipsCompletedPercent}%`,
      },
    },
  };

  return config;
};
