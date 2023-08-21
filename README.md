
# Anime Recommender

Anime Recommender is a tool that uses OpenAI API to recommend anime based on inputted genres or recommend an anime that is similar an inputted anime.





## How to Use
0) Set up the project locally (check below for more information).

1) Switch the input type using the "Switch to Similar Anime" and "Switch to Genres" buttons accordingly.

2) Input anime genres or names into the input field.

3) Click the "Generate Anime!" button.

## How it Works
The app employs the GPT-3 language model from OpenAI to understand user preferences and generate accurate anime recommendations. The process involves the following steps:

1) User Input: Users provide input about their anime preferences, such as genres or anime names.
2) Interaction with GPT-3: The system interacts with the GPT-3 model (text-davinci-003) by sending the API a prompt based on the user input.
3) Recommendation Generation: Based on the user input, the model generates a list of 3 anime recommendations that match the user's preferences which is then presented.
## Local Setup
1) Fork and clone the repository.
2) Insert your own API key from OpenAI into the ```.env``` file
3) Run ```npm install```
4) Run ```npm run dev```
5) Go to http://localhost:3000
## Acknowledgements

 - [OpenAI API](https://openai.com/)
 - [OpenAI Quickstart](https://github.com/openai/openai-quickstart-node)
