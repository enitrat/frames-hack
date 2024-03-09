import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/vercel'

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
})

const templates = [
  "https://tinypng.com/backend/opt/download/t2fvs2fw3pcy4aem9c6sbrknh6segt3w/Sad-Pablo-Escobar.jpg",
  "https://tinypng.com/backend/opt/download/4w7xj7kwa1g8qpj2gtey4bgvpravp4bf/Distracted-Boyfriend.jpg",
  "https://tinypng.com/backend/opt/download/wk0n34xkehxgcnr8yxc18sq392a02rvd/Always-Has-Been%20(1).png",
  "https://tinypng.com/backend/opt/download/bp0s8x32vt03sravj9jvp78vrpv7ebw4/imagebase.jpg"
]

var activeTemplate = templates[0]

app.frame('/', (c) => {
  const { inputText, status, buttonValue } = c

  // If the button value is "change", change the active template
  if (buttonValue === "change") {
    activeTemplate = templates[Math.floor(Math.random() * templates.length)]
  }

  // Get a random image URL from the templates array
  const randomImageUrl = activeTemplate || templates[Math.floor(Math.random() * templates.length)]

  return c.res({
    image: (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        <img src={randomImageUrl} width="30%" height="30%"/>
        {(inputText && status === "response") ? (
          <div
            style={{
              color: 'white',
              fontSize: 40,
              fontWeight: 'bold',
              lineHeight: 1.4,
              padding: '20px',
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
    ),
    intents: [
      <TextInput placeholder="Enter meme text..." />,
      <Button>Submit</Button>,
      <Button value="change">Change Background</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

export const GET = handle(app)
export const POST = handle(app)