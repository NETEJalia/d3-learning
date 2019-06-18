(function () {
    $(document).ready(function () {
        var data = null;

        async function getData () {
            data = await d3.csv("https://raw.githubusercontent.com/d3/d3-hierarchy/v1.1.8/test/data/flare.csv", ({id, value}) => ({name: id.split(".").pop(), title: id.replace(/\./g, "/"), group: id.split(".")[1], value: +value}));

        };

        function makeitresponsive(svg) {
            const container = d3.select(svg.node().parentNode),
                width = parseInt(svg.style('width'), 10),
                height = parseInt(svg.style('height'), 10),
                aspect = width / height;

            svg.attr('viewBox', `0 0 ${width} ${height}`)
                .attr('preserveAspectRatio', 'xMinYMid')
                .call(resize);

            d3.select(window).on(
                'resize.' + container.attr('id'),
                resize
            );

            function resize() {
                const w = parseInt(container.style('width'));
                svg.attr('width', w);
                svg.attr('height', Math.round(w / aspect));
            }
          }

        getData().then(() => {
            // console.log(data);
            width = 975;
            height = 975;

            color = d3.scaleOrdinal(data.map(d => d.group), d3.schemeCategory10)


            pack = data => d3.pack()
            .size([width - 2, height - 2])
            .padding(15)
            (d3.hierarchy({children: data})
            .sum(d => d.value))

            const root = pack(data);

            const svg = d3.select('#chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .call(makeitresponsive);

            const leaf = svg.selectAll("g")
                .data(root.leaves())
                .join("g")
                .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);


            leaf.append("path")
                .attr("d", function(d) {
                    if (d.data.name === 'SizeEncoder') {
                        return d3.symbol().type(d3.symbolCircle).size(d.r * 50)()
                    } else {
                        return d3.symbol().type(d3.symbolSquare).size(d.r * 50)()
                    }
                })
                // .attr("transform", "rotate(45)")
                .attr("fill-opacity", 0.7)
                .attr("fill", d => color(d.data.group));



        });

    });



}());