var postcss = require('postcss');
var valueParser = require('postcss-value-parser');

module.exports = postcss.plugin('postcss-scale', function () {
  return function (css, result) {
    css.walkDecls(function (decl) {
      if (!decl.value) {
        return;
      }

      if (decl.value.indexOf('scale(') !== -1) {
        var parsedValue = valueParser(decl.value);

        parsedValue.walk(function (node) {
          if (node.type === 'function' && node.value === 'scale') {
            var values = [];

            for (var i = 0; i < 8; i += 2) {
              if (node.nodes[i].type === 'word' && node.nodes[i + 1].type === 'div') {
                values.push(node.nodes[i].value);
              }
            }

            var expression = [];

            for (var i = 8; i < node.nodes.length; i++) {
              expression.push(node.nodes[i].value);
            }

            if (values.length === 4 && expression.length !== 0) {
              var baseMin = values[0];
              var baseMax = values[1];
              var limitMin = values[2];
              var limitMax = values[3];

              var baseScalar = '(' + parseFloat(baseMax, 10) + ' - ' + parseFloat(baseMin, 10) + ')';
              var limitScalar = '(' + parseFloat(limitMax, 10) + ' - ' + parseFloat(limitMin, 10) + ')';

              node.type = 'word';
              node.value = 'calc((' + limitScalar + ' * ((' + expression.join('') + ') - ' + baseMin + ') / ' + baseScalar + ') + ' + limitMin + ')';
            } else {
              throw decl.error('Scale should have four values followed by an expression.');
            }
          }
        });

        decl.value = parsedValue.toString();
      }
    });
  };
});
