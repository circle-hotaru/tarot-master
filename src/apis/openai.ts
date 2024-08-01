const openAiApi = 'https://api.openai.com'
const openAiApiProxy = process.env.OPENAI_API_PROXY
const apiUrl = openAiApiProxy ?? openAiApi

export const requestOpenAI = async (messages: string[]) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: messages,
    }),
  }

  try {
    const response = await fetch(
      `${apiUrl}/v1/chat/completions`,
      requestOptions
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
