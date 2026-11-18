export function prepare(state, input) {
  const organization = input.organization ?? 'org-A';
  const credentialId = state.organizations[organization];
  if (!credentialId) throw new Error('机构没有授权身份');
  return { organization, credentialId };
}

export function resolve(state, request, data) {
  if (data.principal !== request.organization || data.credentialId !== request.credentialId || !data.connectionId) throw new Error('握手连接身份不符');
  const existing = state.connections[data.connectionId];
  if (existing && (existing.organization !== data.principal || existing.credentialId !== data.credentialId)) throw new Error('连接身份不能改变');
  return data;
}
