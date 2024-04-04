
# Teachers AI Project

## Creator's Message
My web programming knowledge is average, and this project was entirely created by Artificial Intelligence using version 4.0 of GPT chat, including codes, images, documentation, and resolving doubts throughout its development.
The total time for its elaboration, including solving problems in API integration, was approximately 8 hours and 30 minutes. The major bottlenecks were: solving API integration issues, generating appropriate images, testing positioning, and styling of blocks, images, and buttons.

## Introduction

This project is a web application that integrates artificial intelligence functionalities, using the OpenAI API, to create a virtual assistant aimed at curious children. Users can interact with the assistant through a chat interface to obtain information and assistance related to teaching and education.

## Environment Setup

Before running the project, it is necessary to configure the OpenAI API access key. Follow the steps below to configure:

1. Rename the `.env.example` file to `.env`.
2. Open the `.env` file and replace the `OPENAI_API_KEY` value with your OpenAI API key.

To obtain an OpenAI API key, follow the steps below:

1. Visit [https://openai.com/](https://openai.com/) and create an account or log in.
2. Navigate to the API section and follow the instructions to generate a new API key.
3. Copy the generated key and paste it into the `.env` file, as described in the Environment Setup section.

## Dependency Installation

This project requires PHP to run. Make sure PHP is installed in your environment. Additionally, some PHP dependencies may be required. Execute the following command in the terminal to install dependencies:

```bash
composer install
```

## Main Files

- `proxyOpenAi.php`: A PHP script that acts as a proxy for requests to the OpenAI API. This prevents direct exposure of the API key on the client side.
- `index.js` and `chat.js`: JavaScript files that implement the client-side logic to interact with the user and send requests to the PHP proxy.
- `.env`: A file that stores environment variables, such as the OpenAI API key.

## How to Run the Project

After setting up the environment and installing dependencies, you can start the project by opening the `index.html` file in a browser* or setting up a local PHP server and navigating to the project directory.
*For security reasons, opening the file through the browser has the limitation of not making HTTP requests. In practice, the bot will not give correct responses, only the error message.
