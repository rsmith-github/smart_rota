import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import { timelines } from "https://cdn.jsdelivr.net/npm/d3-timelines@1.3.1/+esm";


export function showTimeline() {
    var start = new Date();
    start.setHours(6, 0, 0, 0); // Set start time to 6am

    var end = new Date();
    end.setHours(24, 0, 0, 0); // Set end time to 12am

    var data = [
        {
            label: "Rota",
            times: [
                {
                    starting_time: start.getTime(),
                    ending_time: end.getTime()
                },
                {
                    name: "Hello",
                    starting_time: start.getTime() + 4 * 60 * 60 * 1000,
                    ending_time: start.getTime() + 5 * 60 * 60 * 1000,
                    color: "lightgreen"
                },
                {
                    starting_time: start.getTime() + 11 * 60 * 60 * 1000,
                    ending_time: start.getTime() + 12 * 60 * 60 * 1000,
                    color: "coral"
                }
            ]
        }
    ];

    var chart = timelines()
        .labelFormat(() => undefined)
        // .hover(console.log);

    var svg = d3
        .selectAll(".date-div")
        .append("svg")
        .attr("width", "100%")
        .datum(data)
        .call(chart);

}