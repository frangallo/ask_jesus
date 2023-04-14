const questionInput = document.getElementById('question');
const submitButton = document.getElementById('submit');
const answerContainer = document.getElementById('answer-container');
const loading = document.getElementById('loading');

questionInput.addEventListener('click', () => {
  questionInput.removeAttribute('placeholder'); // Remove the placeholder when the input is clicked
});

submitButton.addEventListener('click', async () => {
  const question = questionInput.value.trim();
  if (!question) return;

  loading.style.display = 'block';

  const answer = await askJesus(question);

  answerContainer.innerHTML = `
    <p>${answer}</p>
  `;

  questionInput.value = ''; // Clear the input value
  questionInput.setAttribute('placeholder', question); // Set the placeholder
  answerContainer.style.display = 'flex';
  loading.style.display = 'none';
});

async function askJesus(question) {
  const apiUrl = 'https://obscure-eyrie-44113.herokuapp.com/api/v1/chatgpt';
  const prompt = `You are to embody the persona of Jesus, responding to questions as He would. Adapt your tone based on the tone of the question being asked. Keep the responses within the context of Christian beliefs, appropriate for a PG-13 audience, and limit them to 85 words or less. Only provide the answer to the question, nothing else. The specific question you need to answer will be provided below. Quesion: ${question}`;

  try {
    const params = {
      prompt: prompt
    };

    const response = await fetch(apiUrl + '?' + new URLSearchParams(params));
    if (!response.ok) {
      throw new Error('Failed to fetch answer from backend');
    }

    const data = await response.json();
    return data.content; // Adjust this according to the response format of your Rails backend
  } catch (error) {
    console.error('Error:', error);
    return 'Sorry, something went wrong. Please try again later.';
  }
}
