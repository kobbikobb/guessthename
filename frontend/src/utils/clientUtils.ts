import clientjs from 'clientjs';

export function getUserFingerprint(): string {
    const client = new clientjs.ClientJS();
    return client.getFingerprint().toString();
}
