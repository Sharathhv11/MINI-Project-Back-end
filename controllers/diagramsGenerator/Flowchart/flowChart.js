import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handleAsync from "./../../../utils/asyncFunctionHandler.js";
import CustomError from "./../../../utils/customError.js";
import gemini from "../../../configure/gemini.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const promptPath = path.join(__dirname, "../../../prompts/flowchart.txt");
const systemPrompt = fs.readFileSync(promptPath, "utf-8");

const flowChartGenerator = handleAsync(async (req, res, next) => {
  const { body } = req;
  if (!body.code || !body.code.length) {
    return next(
      new CustomError(
        400,
        "Please provide the code for generating the flowchart.",
      ),
    );
  }

  if (body.code.length > 200) {
    return next(
      new CustomError(400, "Code is too big to generate the flowchart"),
    );
  }

  const response = await gemini.models.generateContent({
    model: "gemma-3-27b-it",
    contents: [
      {
        role: "user",
        parts: [{ text: `${systemPrompt}\n\nHere is the code:\n${body.code}` }],
      },
    ],
  });

  const rawText = response.text.replace(/```json\n?|```\n?/g, "").trim();
  const flowchartData = JSON.parse(rawText);

  res.status(200).json({
    status: "success",
    data: flowchartData,
  });
});

export default flowChartGenerator;
