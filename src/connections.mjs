export function accept(state, request, data) {
  if (data.principal !== request.organization || data.credentialId !== request.credentialId) throw new Error('握手身份与机构不符');
  const pieces = new Map();
  for (const item of data.parts ?? []) { if (!Number.isInteger(item.part) || item.part < 1 || item.part > item.total) throw new Error('分块范围无效'); pieces.set(item.part, item); }
  const total = [...pieces.values()][0]?.total ?? 0;
  if (!total || pieces.size !== total || [...pieces.values()].some(item => item.total !== total)) throw new Error('资料分块未齐');
  state.connections[data.connectionId] = { organization: request.organization, credentialId: data.credentialId, validUntil: data.validUntil };
  state.deliveries[data.delivery] = { connectionId: data.connectionId, parts: [...pieces.values()].sort((left, right) => left.part - right.part) };
  return data.delivery;
}
