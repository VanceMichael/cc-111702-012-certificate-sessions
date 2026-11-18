export function present(state) {
  return { connections: Object.entries(state.connections).map(([connectionId, value]) => ({ connectionId, ...value })), deliveries: Object.entries(state.deliveries).map(([delivery, value]) => ({ delivery, connectionId: value.connectionId, content: value.parts.map(item => item.content).join('') })) };
}
