export function present(state) {
  return { connections: Object.entries(state.connections).map(([connectionId, value]) => ({ connectionId, ...value })), deliveries: Object.entries(state.deliveries).map(([delivery, value]) => ({ delivery, connectionId: value.connectionId, content: value.parts.map(item => item.content).join('') })) };
}

export function assess(state, request, data) {
  if (!Number.isFinite(data.validUntil) || data.validUntil <= (request.now ?? 0)) throw new Error('固定身份凭据已失效');
  if (!data.delivery || !Array.isArray(data.parts) || !data.parts.length) throw new Error('交付内容未齐');
  for (const part of data.parts) if (typeof part.content !== 'string' || part.total !== data.parts.length) throw new Error('交付分块范围不完整');
  const previous = state.deliveries[data.delivery];
  if (previous && previous.connectionId !== data.connectionId) throw new Error('交付已经绑定其他连接');
  return { connectionId: data.connectionId, delivery: data.delivery, complete: true };
}
