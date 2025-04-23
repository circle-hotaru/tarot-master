const defaultAPI = 'https://api.openai.com'
const proxyAPI = process.env.NEXT_PUBLIC_CHAT_API_PROXY
const apiUrl = proxyAPI ?? defaultAPI

export const requestChatAI = async (messages: string[]) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHAT_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      messages: messages,
    }),
  }

  const response = await fetch(`${apiUrl}/v1/chat/completions`, requestOptions)
  if (!response.ok) {
    throw new Error('Failed to get AI response')
  }
  const data = await response.json()
  return data.choices[0].message.content
}
