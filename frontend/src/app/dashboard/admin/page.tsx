import LineChart from "../../../../archive/(admin)/(others-pages)/(chart)/line-chart/page";
import BarChartOne from "@/components/charts/bar/BarChartOne";
import { BarChart } from "lucide-react";

export default function AdminDashboard(){
    return(
        <div className="">
            <LineChart/>
            <BarChartOne/>
        </div>
    )
}