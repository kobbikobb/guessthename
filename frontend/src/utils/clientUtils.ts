import clientjs from 'clientjs';

export function getUserFingerprint(): string {
  // @ts-ignore
  const client = new clientjs.ClientJS();
  return client.getFingerprint();
}
