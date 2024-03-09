import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/vercel'

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
})

const templates = [
  "https://imgflip.com/s/meme/Distracted-Boyfriend.jpg",
  "https://i.imgflip.com/8imkrc.jpg",
  "https://imgflip.com/s/meme/Sad-Pablo-Escobar.jpg",
  "https://imgflip.com/s/meme/Change-My-Mind.jpg"
]

app.frame('/', (c) => {
  const { inputText, status, buttonValue } = c

  // Get a random image URL from the templates array
  const randomImageUrl = buttonValue || templates[Math.floor(Math.random() * templates.length)]

  return c.res({
    image: (
      <div
        style={{
          display: 'flex',
          background: 'black',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        <div
          style={{
            backgroundImage: `url('${randomImageUrl}')`,
            backgroundSize: 'cover',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'flex-end',
            textAlign: 'center',
            width: '100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {(inputText && status === "response") ? (
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                fontSize: 40,
                fontWeight: 'bold',
                lineHeight: 1.4,
                padding: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                whiteSpace: 'pre-wrap',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {inputText}
            </div>
          ) : <></>}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter meme text..." />,
      <Button value={randomImageUrl}>Submit</Button>,
      <Button value={templates[Math.floor(Math.random() * templates.length)]}>Change Background</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

export const GET = handle(app)
export const POST = handle(app)