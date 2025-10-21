
// line chart at first

import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export default function LineCharts({data}:{data:[]}){

    return(
        <>
        <LineChart 
        style={{width:'100%' , maxWidth:"800px" , maxHeight:"33vh" ,aspectRatio: 1.618}}
        responsive
        data={data}
        >
            
             <XAxis  dataKey={"name"}/>
             <YAxis width={"auto"}/>
             <Tooltip />
             <Legend />
             <Line type={"monotone"} dataKey={"pv"} stroke="#1C1C1C" activeDot={{r:8}} />
             <Line type={"monotone"} dataKey={"uv"} stroke="#A8C5DA" />
        </LineChart>
        </>
    )
}
