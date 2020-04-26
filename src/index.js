import * as topola from 'topola';
import * as d3 from 'd3';
import './style.css';
import entries from './entries.json';

function render(chart, indiInfo) {
  const hashParts = document.location.hash.split('#')
  console.log({
    startIndi: indiInfo ? indiInfo.id : hashParts[1],
    baseGeneration: indiInfo ? indiInfo.generation : parseInt(hashParts[2], 10)
  });
  const info = chart.render({
    startIndi: indiInfo ? indiInfo.id : hashParts[1],
    baseGeneration: indiInfo ? indiInfo.generation : parseInt(hashParts[2], 10)
  });
  const svg = d3.select('svg');
  const parent = svg.node().parentElement;

  const scrollTopTween = (scrollTop) => {
    return () => {
      const i = d3.interpolateNumber(parent.scrollTop, scrollTop);
      return (t) => {
        parent.scrollTop = i(t);
      };
    };
  };
  const scrollLeftTween = (scrollLeft) => {
    return () => {
      const i = d3.interpolateNumber(parent.scrollLeft, scrollLeft);
      return (t) => {
        parent.scrollLeft = i(t);
      };
    };
  };

  const initialRender = !indiInfo;
  const dx = parent.clientWidth / 2 - info.origin[0];
  const dy = parent.clientHeight / 2 - info.origin[1];
  const svgTransition = svg.transition().delay(200).duration(500);
  const transition = initialRender ? svg : svgTransition;
  transition
    .attr(
      'transform', `translate(${d3.max([dx, 0])}, ${d3.max([dy, 0])})`)
    .attr('width', info.size[0])
    .attr('height', info.size[1]);
  if (initialRender) {
    parent.scrollLeft = -dx;
    parent.scrollTop = -dy;
  } else {
    svgTransition
      .tween('scrollLeft', scrollLeftTween(-dx))
      .tween('scrollTop', scrollTopTween(-dy));
    document.location.hash = indiInfo.id + '#' + indiInfo.generation;
  }
}

const json = topola.gedcomEntriesToJson(entries);
const chart = topola.createChart({
  json,
  chartType: topola.HourglassChart,
  renderer: topola.DetailedRenderer,
  // Rerender with animation when an individual is clicked.
  indiCallback: (info) => render(chart, info),
  animate: true,
  // SVG size is animated manually in the render() function.
  updateSvgSize: false,
});
render(chart);
