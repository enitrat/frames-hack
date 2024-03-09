import { Button, Frog, TextInput } from 'frog'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'
import { type NeynarVariables, neynar } from 'frog/middlewares'
import {BigNumberish, hash} from "starknet";


// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog<{
  Variables: NeynarVariables}>({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.use(
  neynar({
    apiKey: 'NEYNAR_FROG_FM',
    features: ['interactor', 'cast'],
  }),
)

app.frame('/', (c) => {
  const { buttonValue, status } = c
  let starknet_address;
  if (status === "response") {
    starknet_address = compute_starknet_address(c.var.interactor.custodyAddress);
  }
  // console.log('cast: ', c.var.cast)
  console.log('interactor: ', c.var.  interactor)

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 30,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `Your address would be ${starknet_address}`
            : 'Welcome! Discover what your Starknet address would be.'}
        </div>
      </div>
    ),
    intents: [
      status !== 'response' && <Button value="start">Start</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

export const GET = handle(app)
export const POST = handle(app)

function compute_starknet_address(deployerAddress: BigNumberish) {
  const classHash =
    0x42827792b0b3ed1f906bc96e0fab366244aed74ea87db51e74d4a1b77ae1e7fn;
  const salt = 0x65766d5f61646472657373n;
  
  const CONSTRUCTOR_CALLDATA = [deployerAddress, salt];

    return hash.calculateContractAddressFromHash(
      salt,
      classHash,
      CONSTRUCTOR_CALLDATA,
      deployerAddress
  )
}
