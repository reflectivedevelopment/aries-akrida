const ref_napi_1 = require("ref-napi");

const FFI_POINTER = 'pointer'
const allocatePointer = () => (0, ref_napi_1.alloc)(FFI_POINTER);

console.log("Hello via Bun!");
console.log("Hello via Bun!");

// import type { InitConfig } from '@aries-framework/core'
// import { Agent } from '@aries-framework/core'
// import { agentDependencies } from '@aries-framework/node'

// import { AskarModule } from '@aries-framework/askar'
// import { ariesAskar } from '@hyperledger/aries-askar-nodejs'

// const config: InitConfig = {
//   label: 'docs-agent-nodejs',
//   walletConfig: {
//     id: 'wallet-id',
//     key: 'testkey0000000000000000000000000',
//   },
// }

// const agent = new Agent({
//         config,
//         dependencies: agentDependencies,
//         modules: {
//                 // Register the Askar module on the agent
//                 askar: new AskarModule({
//                 ariesAskar,
//                 }),
//         },
// })

// console.log(config)