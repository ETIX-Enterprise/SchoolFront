
// line chart at first

import { Legend, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";

function LineCharts({data}:{data:[] | any}){

    return(
        <>
        <LineChart 
        style={{width:'100%' , maxWidth:"800px" , maxHeight:"33vh" ,aspectRatio: 1.618}}
        responsive
        data={data}
        >
        <XAxis tickLine={false} axisLine={false} dataKey={"name"}/>
        <YAxis tickLine={false} axisLine={false} width={"auto"}/>
        <Tooltip />
        <Legend />
        <Line type={"monotone"} dataKey={"pv"} stroke="#1C1C1C" activeDot={{r:8}} />
        <Line type={"monotone"} dataKey={"uv"} stroke="#A8C5DA" strokeDasharray="3 3" />
        </LineChart>
        </>
    )
}




export { LineCharts}