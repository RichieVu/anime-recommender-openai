import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      }
    });
    return;
  }

  const genre = req.body.genre || '';
  if (genre.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid genre",
      }
    });
    return;
  }

  const promptType = req.body.prompt || "default";
  const prompt = generatePrompt(promptType, genre);

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(promptType, input) {
  const capitalizedInput =
    input[0].toUpperCase() + input.slice(1).toLowerCase();
  if (promptType == "switched") {
    return `Suggest three anime that are similar to the input but are not the same.

Input: ${capitalizedInput}
Names:`;
  }
  return `Suggest three anime that have all the input genres.

Input: Action
Names: Sword Art Online, Naruto, Attack on Titan
Input: Romance
Names: Clannad, Fruits Basket, Your Life in April
Input: ${capitalizedInput}
Names:`;
}
