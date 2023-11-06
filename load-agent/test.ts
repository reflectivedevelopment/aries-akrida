import { Agent, MediatorPickupStrategy, MediationRecipientModule, ConsoleLogger, LogLevel, WsOutboundTransport, HttpOutboundTransport } from '@aries-framework/core'
import { IndySdkModule } from '@aries-framework/indy-sdk'

// Import from @aries-framework/react-native in React Native
import { agentDependencies } from '@aries-framework/node'

// Import from indy-sdk-react-native in React Native
import indySdk from 'indy-sdk'

const doBob = async () => {
  const agent = new Agent({
    config: {
      label: "bob",
      logger: new ConsoleLogger(LogLevel.trace),
      walletConfig: {
        id: "bob",
        key: "bob",
      },
    },
    dependencies: agentDependencies,
    modules: {
      // Register the IndySdkModule and provide the indySdk dependency
      indySdk: new IndySdkModule({
        indySdk,
      }),
      mediationRecipient: new MediationRecipientModule({
        // mediatorInvitationUrl: "https://us-east.public.mediator.indiciotech.io/message?oob=eyJAaWQiOiJlOTFkZmYxOC1mYzIwLTRkMjItYjljMi1jMzZhZDI0ZTYwODEiLCJAdHlwZSI6Imh0dHBzOi8vZGlkY29tbS5vcmcvb3V0LW9mLWJhbmQvMS4xL2ludml0YXRpb24iLCJoYW5kc2hha2VfcHJvdG9jb2xzIjpbImh0dHBzOi8vZGlkY29tbS5vcmcvZGlkZXhjaGFuZ2UvMS4wIl0sInNlcnZpY2VzIjpbeyJpZCI6IiNpbmxpbmUiLCJ0eXBlIjoiZGlkLWNvbW11bmljYXRpb24iLCJyZWNpcGllbnRLZXlzIjpbImRpZDprZXk6ejZNa2dTWUJNNjNpSE5laVQyVlNRdTdiYnRYaEdZQ1FyUEo4dUVHdXJiZkdiYmdFIl0sInNlcnZpY2VFbmRwb2ludCI6Imh0dHBzOi8vdXMtZWFzdC5wdWJsaWMubWVkaWF0b3IuaW5kaWNpb3RlY2guaW8vbWVzc2FnZSJ9LHsiaWQiOiIjaW5saW5lIiwidHlwZSI6ImRpZC1jb21tdW5pY2F0aW9uIiwicmVjaXBpZW50S2V5cyI6WyJkaWQ6a2V5Ono2TWtnU1lCTTYzaUhOZWlUMlZTUXU3YmJ0WGhHWUNRclBKOHVFR3VyYmZHYmJnRSJdLCJzZXJ2aWNlRW5kcG9pbnQiOiJ3c3M6Ly93cy51cy1lYXN0LnB1YmxpYy5tZWRpYXRvci5pbmRpY2lvdGVjaC5pby93cyJ9XSwiYWNjZXB0IjpbImRpZGNvbW0vYWlwMSIsImRpZGNvbW0vYWlwMjtlbnY9cmZjMTkiXSwibGFiZWwiOiJDbG91ZCBNZWRpYXRvciJ9",
        // mediatorPickupStrategy: MediatorPickupStrategy.PickUpV2,
        mediatorInvitationUrl: "WORKING MEDIATOR URL",
        mediatorPickupStrategy: MediatorPickupStrategy.Implicit,
      }),
    },
  })

  // Register a simple `WebSocket` outbound transport
  agent.registerOutboundTransport(new WsOutboundTransport())

  // Register a simple `Http` outbound transport
  agent.registerOutboundTransport(new HttpOutboundTransport())
  
  await agent.initialize()
}

doBob()