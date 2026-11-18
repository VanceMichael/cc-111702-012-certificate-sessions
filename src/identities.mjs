export function prepare(state, input) {
  const organization = input.organization ?? 'org-A';
  const credentialId = state.organizations[organization];
  if (!credentialId) throw new Error('机构没有授权身份');
  return { organization, credentialId };
}
