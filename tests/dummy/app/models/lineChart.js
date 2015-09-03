function sinAndCos() {
  var sin = [],
    sin2 = [],
    cos = [],
    rand = [],
    rand2 = [];
  for (var i = 0; i < 100; i++) {
    sin.push({
      x: i,
      y: i % 10 === 5 ? null : Math.sin(i / 10)
    }); //the nulls are to show how defined works
    sin2.push({
      x: i,
      y: Math.sin(i / 5) * 0.4 - 0.25
    });
    cos.push({
      x: i,
      y: 0.5 * Math.cos(i / 10)
    });
    rand.push({
      x: i,
      y: Math.random() / 10
    });
    rand2.push({
      x: i,
      y: Math.cos(i / 10) + Math.random() / 10
    });
  }
  return [{
    area: true,
    values: sin,
    key: "Sine Wave",
    strokeWidth: 4,
    classed: 'dashed'
  }, {
    values: cos,
    key: "Cosine Wave"
  }, {
    values: rand,
    key: "Random Points"
  }, {
    values: rand2,
    key: "Random Cosine",
    strokeWidth: 3.5
  }, {
    area: true,
    values: sin2,
    key: "Fill opacity",
    fillOpacity: 0.1
  }];
}

export default sinAndCos();
