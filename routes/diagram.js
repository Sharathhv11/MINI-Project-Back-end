import { Router } from "express";
import authorization from "./../controllers/authorization.js"
import flowChartGenerator from "../controllers/diagramsGenerator/Flowchart/flowChart.js";

const diagramGenerator = Router();


diagramGenerator.post("/flow-chart",authorization,flowChartGenerator)


export default diagramGenerator;