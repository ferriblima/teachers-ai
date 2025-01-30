
# Teachers AI Project

## About The Project

Teachers AI Project is a web application designed to integrate artificial intelligence functionalities, using the OpenAI API, to create a virtual assistant aimed at curious children. Users can interact with the assistant through a chat interface to get educational content and assistance.

### Preview

Below are some screenshots demonstrating the interface of the project:

#### Home Page
![Home Page Screenshot](images/home_page.png)

#### Chat Interface and Example of a Conversation
![Chat Interface Screenshot](images/chat_interface.png)

### Creator's Message
The project was entirely created using **GPT 4.0**, from code to images and documentation. Total development time was approximately **8 hours and 30 minutes**, with the following major challenges:
- API integration issues.
- Generating suitable images.
- Testing and styling the UI (positioning blocks, images, and buttons).

## Built With

- ![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Getting Started

### Prerequisites

- PHP installed on your system.
- Composer to manage PHP dependencies.
- Chat GPT account to provide the API key.

### Installation

1. Rename the `.env.example` file to `.env`.
2. Add your OpenAI API key to the `.env` file:
   ```env
   OPENAI_API_KEY=your_api_key
   ```
   OpenAI Documentation: [https://platform.openai.com/docs/quickstart](https://platform.openai.com/docs/quickstart)
3. Install the PHP dependencies:
   ```bash
   composer install
   ```
4. Open the `app/index.html` file in your browser, or start a local PHP server and navigate to the project directory.

## Usage

This project uses a chat interface to interact with a virtual assistant for educational purposes. The assistant:
- Answers questions.
- Engages children in a fun and interactive way.

### Main Files
- **proxyOpenAi.php**: A PHP script that acts as a proxy to interact with the OpenAI API, securing the API key.
- **index.js** and **chat.js**: Handle user interaction and requests to the backend.

## Roadmap

- [x] Basic integration with OpenAI API.
- [ ] Add voice interaction support.
- [ ] Create a mobile-friendly interface.

See the [open issues](https://github.com/ferriblima/teachers-ai/issues) for more features and known issues.

## Contributing

Contributions are welcome and greatly appreciated! Here’s how you can contribute:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

Distributed under the **Unlicense License**. See `LICENSE.txt` for more information.

## Contact

**Fernando Lima**  
[LinkedIn](https://www.linkedin.com/in/fernandoribeirolima/) - ferriblima@gmail.com  

Project Link: [https://github.com/ferriblima/teachers-ai](https://github.com/ferriblima/teachers-ai)

## Acknowledgments and References

- [OpenAI](https://openai.com)
- [Markdown Guide](https://www.markdownguide.org)
- [Best README Template](https://github.com/othneildrew/Best-README-Template)
- [Python Application Layouts: A Reference](https://realpython.com/python-application-layouts/)
